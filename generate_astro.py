import re

with open('numerology.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Title
content = re.sub(
    r'<title>.*?</title>',
    r'<title>Best Astrologer in Delhi | Vedic Astrology Consultation | Saroj Jawa</title>',
    content
)

# Replace Meta Description
content = re.sub(
    r'<meta name="description" content=".*?">',
    r'<meta name="description" content="Book Vedic astrology consultation with Saroj Jawa in Delhi. Get kundli reading, marriage matching, career guidance, graha dosh remedies and more.">',
    content
)

# Replace Main Content
main_content = """  <main style="padding-top: 100px;">
    <section class="page-header">
      <div class="container fade-in">
        <h1>Best Astrologer in Delhi — Vedic Astrology Consultation with Saroj Jawa</h1>
      </div>
    </section>

    <article class="container content-wrapper fade-in" style="padding: var(--spacing-lg) var(--spacing-md);">
      <p style="font-size: 1.1rem; color: var(--color-dark); margin-bottom: 30px;">Marriage delayed with no clear reason? Career stuck despite doing everything right? A Vedic astrology consultation with Saroj Jawa reads your birth chart to identify what's actually at play — and what remedy, if any, addresses it. Consultations are fully online, by phone or video call.</p>

      <h2 class="text-primary">How a Consultation Works</h2>
      <p>Everything starts from your <strong>kundli</strong> (birth chart) — built from your date, time, and place of birth. The chart maps where each planet sat at the moment you were born, and Vedic astrology reads the relationships between those planetary positions to explain patterns in health, career, marriage, and finances.</p>
      <p>Two traditions inform the practice:</p>
      <ul>
        <li><strong>Vedic astrology</strong> — the classical Indian system, based on the sidereal zodiac (adjusted for the Earth's slow wobble), which is why Vedic predictions often differ from Western sun-sign astrology for the same birth date.</li>
        <li><strong>Lal Kitab</strong> — a separate remedial tradition, known for simple, often household-based remedies (rather than elaborate rituals) for planetary afflictions.</li>
      </ul>

      <h2 class="text-primary" style="margin-top: 40px;">What Gets Diagnosed, and What It's Used For</h2>
      
      <div class="services-grid" style="margin-top: 20px;">
        <div class="card fade-in">
          <h3 style="font-size: 1.3rem;">Kundli Matching for Marriage</h3>
          <p>Before marriage, both partners' birth charts are compared — known as <strong>kundli milan</strong> — to check compatibility across health, temperament, and prosperity. This includes checking for <strong>Manglik dosh</strong> (Mars affliction), one of the most commonly flagged factors in Indian matchmaking, and whether it needs to be offset by a matching dosh on the other side or a specific remedy.</p>
        </div>
        <div class="card fade-in">
          <h3 style="font-size: 1.3rem;">Career and Business Guidance</h3>
          <p>Your chart is read for which planetary periods (dashas) are currently active, and whether the placement supports or works against the career direction you're pursuing — useful when a decision (job change, new venture, expansion) needs timing.</p>
        </div>
        <div class="card fade-in">
          <h3 style="font-size: 1.3rem;">Graha Dosh and Planetary Remedies</h3>
          <p>When a planet is poorly placed or afflicted in the chart, it's read as a graha dosh — often linked to recurring problems in one area of life. Remedies vary by tradition and by which planet is involved: gemstones, specific rituals, or Lal Kitab-style household remedies.</p>
        </div>
        <div class="card fade-in">
          <h3 style="font-size: 1.3rem;">Horoscope and Birth Chart Reading</h3>
          <p>A full read of your chart — planetary placements, current and upcoming dasha periods, and what they typically indicate — for anyone who wants the bigger picture rather than a single problem-focused reading.</p>
        </div>
      </div>

      <h2 class="text-primary" style="margin-top: 40px;">Vedic Astrology vs Western Astrology</h2>
      <p>The two systems don't just differ in style — they use different zodiacs. Western astrology uses the tropical zodiac, fixed to the seasons. Vedic astrology uses the sidereal zodiac, adjusted for the actual position of constellations today, which have shifted from where they were when the tropical system was set. This is why your Vedic sun sign can come out differently from your Western one, and why the two traditions can give different-sounding readings for the same birth details.</p>

      <h2 class="text-primary" style="margin-top: 40px;">About Saroj Jawa</h2>
      <p>Saroj Jawa works across astrology, numerology, Vastu Shastra, and spiritual healing, and shares astrology and remedy content on <a href="https://www.instagram.com/sarojjawa/">Instagram</a> and Facebook — including how birth details and planetary timing shape career and life outcomes. Personal consultations go deeper than the content: chart-specific readings for the problem you're actually facing.</p>
    </article>

    <section class="section section-bg-beige" id="faq">
      <div class="container content-wrapper">
        <div class="text-center fade-in" style="margin-bottom: var(--spacing-lg);">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div class="faq-accordion fade-in">
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>How accurate is kundli matching?</span>
              <i class="fas fa-chevron-down faq-icon"></i>
            </button>
            <div class="faq-answer">
              <p>Kundli matching is a traditional compatibility framework, not a verified predictive tool — treat it as one input among several when evaluating a match, not a pass/fail test on its own.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>What is Manglik dosh and its remedy?</span>
              <i class="fas fa-chevron-down faq-icon"></i>
            </button>
            <div class="faq-answer">
              <p>Manglik dosh refers to a specific placement of Mars in the birth chart, traditionally linked to friction or delay in marriage. Remedies range from matching with another Manglik chart to specific rituals, depending on the severity and the astrologer's assessment.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>Is astrology scientifically proven?</span>
              <i class="fas fa-chevron-down faq-icon"></i>
            </button>
            <div class="faq-answer">
              <p>No. Astrology is a traditional belief system without empirical scientific support. People use it for guidance and reflection, similar to how others use numerology.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              <span>Vedic astrology vs numerologist — which should I use for marriage matching?</span>
              <i class="fas fa-chevron-down faq-icon"></i>
            </button>
            <div class="faq-answer">
              <p>They're different systems reading different inputs — astrology reads planetary charts, numerology reads birth date and name numbers. Some consultants, including Saroj Jawa, offer both, and use them as complementary readings rather than substitutes for each other.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-bg-dark">
      <div class="container text-center fade-in">
        <h2 style="color: var(--color-secondary);">Ready to Read Your Birth Chart?</h2>
        <p>Book a personalized Vedic astrology consultation with Saroj Jawa to gain clarity on your path ahead.</p>
        <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
          <a href="contact.html" class="btn btn-primary" style="background-color: var(--color-secondary); color: var(--color-dark);">Book Your Consultation</a>
        </div>
      </div>
    </section>
  </main>"""

content = re.sub(
    r'<main.*?</main>',
    main_content,
    content,
    flags=re.DOTALL
)

with open('astrology.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Generated astrology.html")
