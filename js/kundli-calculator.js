/*
  Project: Saroj Jawa - Professional Numerologist
  Description: Client-side Kundli Engine migrating away from the Python backend
*/

const RASHIS = [
    { id: 1, name: "Mesh (Aries)", lord: "Mars" },
    { id: 2, name: "Vrishabh (Taurus)", lord: "Venus" },
    { id: 3, name: "Mithun (Gemini)", lord: "Mercury" },
    { id: 4, name: "Kark (Cancer)", lord: "Moon" },
    { id: 5, name: "Simha (Leo)", lord: "Sun" },
    { id: 6, name: "Kanya (Virgo)", lord: "Mercury" },
    { id: 7, name: "Tula (Libra)", lord: "Venus" },
    { id: 8, name: "Vrishchik (Scorpio)", lord: "Mars" },
    { id: 9, name: "Dhanu (Sagittarius)", lord: "Jupiter" },
    { id: 10, name: "Makar (Capricorn)", lord: "Saturn" },
    { id: 11, name: "Kumbh (Aquarius)", lord: "Saturn" },
    { id: 12, name: "Meen (Pisces)", lord: "Jupiter" }
];

const PLANET_TRAITS = {
    1: { planet: "Sun (Surya)", nature: "Leadership, Pioneer, Confidence", color: "Gold/Orange" },
    2: { planet: "Moon (Chandra)", nature: "Intuition, Harmony, Creativity", color: "White/Silver" },
    3: { planet: "Jupiter (Guru)", nature: "Wisdom, Communication, Ambition", color: "Yellow" },
    4: { planet: "Rahu", nature: "Strategy, Discipline, Unconventional", color: "Grey/Blue" },
    5: { planet: "Mercury (Budh)", nature: "Business, Adaptability, Networking", color: "Green" },
    6: { planet: "Venus (Shukra)", nature: "Luxury, Love, Artistic, Glamour", color: "Light Blue/Pink" },
    7: { planet: "Ketu", nature: "Spirituality, Analysis, Research", color: "White/Smoky" },
    8: { planet: "Saturn (Shani)", nature: "Hard work, Authority, Wealth Management", color: "Dark Blue/Black" },
    9: { planet: "Mars (Mangal)", nature: "Energy, Courage, Humanitarian", color: "Red/Coral" }
};

function getLahiriAyanamsha(year) {
    return 23.85 + (year - 2000) * 0.01397;
}

// Converts a place name to coordinates using Nominatim API
async function geocodePlace(placeName) {
    try {
        const query = encodeURIComponent(placeName);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&email=contact@sarojjawa.in`;
        
        const response = await fetch(url, {
            headers: {
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon)
                };
            }
        }
    } catch (e) {
        console.error("Geocoding error:", e);
    }
    
    throw new Error(`Location geocoding failed. We could not find coordinates for "${placeName}". Please enter a valid city or place name.`);
}

async function generateKundliData(name, dob_str, time_str, place) {
    // 1. Geocode
    const coords = await geocodePlace(place);
    const lat = coords.lat;
    const lon = coords.lon;

    // 2. Parse Date and assume IST (Asia/Kolkata is +05:30)
    const isoString = `${dob_str}T${time_str}:00+05:30`;
    const dt = new Date(isoString);
    if (isNaN(dt.getTime())) {
        throw new Error("Invalid Date or Time provided.");
    }

    const t = new Astronomy.AstroTime(dt);
    
    const birthYear = Number(dob_str.substring(0, 4));
    const ayanamsha = getLahiriAyanamsha(birthYear);

    // 3. Ascendant Calculation
    const gst = Astronomy.SiderealTime(dt); // GMST in hours
    const lst = (gst + lon / 15.0) % 24.0;
    const ramc = lst * 15.0;

    const eps = 23.44 * Math.PI / 180.0;
    const rad_lat = lat * Math.PI / 180.0;
    const rad_ramc = ramc * Math.PI / 180.0;

    const asc_rad = Math.atan2(
        Math.cos(rad_ramc),
        -Math.sin(rad_ramc) * Math.cos(eps) - Math.tan(rad_lat) * Math.sin(eps)
    );

    let asc_tropical = (asc_rad * 180.0 / Math.PI) % 360.0;
    if (asc_tropical < 0) asc_tropical += 360.0;

    let asc_sidereal = (asc_tropical - ayanamsha) % 360.0;
    if (asc_sidereal < 0) asc_sidereal += 360.0;

    const asc_sign_index = Math.floor(asc_sidereal / 30);
    const asc_sign = RASHIS[asc_sign_index];

    // 4. Planets Calculation
    const planets_data = [];
    const houses_grid = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] };
    
    // Mapping our planet names to Astronomy Engine bodies
    const planetMap = {
        'Sun': Astronomy.Body.Sun,
        'Moon': Astronomy.Body.Moon,
        'Mars': Astronomy.Body.Mars,
        'Mercury': Astronomy.Body.Mercury,
        'Jupiter': Astronomy.Body.Jupiter,
        'Venus': Astronomy.Body.Venus,
        'Saturn': Astronomy.Body.Saturn
    };

    // Observer for topocentric calculation
    const observer = new Astronomy.Observer(lat, lon, 0);

    for (const [p_name, p_body] of Object.entries(planetMap)) {
        // Get apparent topocentric equatorial coordinates of date
        const equator = Astronomy.Equator(p_body, t, observer, true, true);
        
        // Convert RA (hours) and DEC (degrees) to radians
        const ra = equator.ra * 15 * Math.PI / 180.0;
        const dec = equator.dec * Math.PI / 180.0;
        
        // Use true obliquity of date (we approximate using J2000 for simplicity/parity with typical backend scripts)
        const eps_planet = 23.4392911 * Math.PI / 180.0;
        
        const sin_lon = Math.sin(ra) * Math.cos(eps_planet) + Math.tan(dec) * Math.sin(eps_planet);
        const cos_lon = Math.cos(ra);
        
        let trop_lon = Math.atan2(sin_lon, cos_lon) * 180.0 / Math.PI;
        if (trop_lon < 0) trop_lon += 360.0;
        
        let sid_lon = (trop_lon - ayanamsha) % 360.0;
        if (sid_lon < 0) sid_lon += 360.0;
        
        const sign_idx = Math.floor(sid_lon / 30);
        const sign_info = RASHIS[sign_idx];

        const house_no = ((sign_info.id - asc_sign.id) % 12 + 12) % 12 + 1;

        planets_data.push({
            name: p_name,
            sign: sign_info.name,
            degree: parseFloat((sid_lon % 30).toFixed(2)),
            house: house_no
        });
        houses_grid[house_no].push(p_name.substring(0, 2));
    }

    // 5. Return matched JSON structure
    return {
        status: "success",
        data: {
            name: name,
            birth_details: { dob: dob_str, time: time_str, place: place },
            lagna: {
                rashi: asc_sign.name,
                rashi_no: asc_sign.id,
                lord: asc_sign.lord
            },
            planets: planets_data,
            houses_grid: houses_grid
        }
    };
}

if (typeof window !== 'undefined') {
    window.KundliCalculator = {
        generateKundliData
    };
} else {
    module.exports = {
        generateKundliData
    };
}
