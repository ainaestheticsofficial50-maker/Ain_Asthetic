// All clinic content lives here so it can be edited without touching templates.
// Wording for treatments, offers and reviews is taken from the clinic's own posters.
// Image paths are relative to /public/img/.
module.exports = {
  name: 'Ain Aesthetics & Medical Center',
  shortName: 'Ain Aesthetics',
  tagline: 'Skin · Hair · Wellness',
  url: process.env.SITE_URL || 'http://localhost:3000',

  phones: ['0310-6563444', '0322-6294982'],
  whatsapp: '923106563444',
  instagram: 'ainaestheticofficial',
  address: {
    // NOTE: newer posters say "DHA Phase 6 Lahore". Confirm with the client.
    lines: [
      '20th Plaza, DHA Phase 8, Sector Y Entrance',
      'Opposite Ring Road, near 5th Generation Sports Complex',
      'Jamu Stop, Lahore',
    ],
    short: 'DHA Lahore',
    mapQuery: '20th Plaza DHA Phase 8 Sector Y Jamu Stop Lahore',
  },

  // ---------------------------------------------------------------- Doctors
  // The doctor whose `position` starts with "Founder" is named in the home hero.
  // `position`, `experience`, `photo`, `credentials` and `focus` are optional;
  // doctors without a photo show initials.
  doctors: [
    {
      slug: 'dr-ghulam-sughra',
      name: 'Dr. Ghulam Sughra',
      position: 'Founder & Chairperson',
      role: 'Dermatologist & Aesthetic Physician',
      photo: 'doctors/ghulam-sughra.jpg',
      credentials: [
        'MBBS, RMP',
        'MRCP (UK – London), MRCP (UK – Edinburgh)',
        'FCPS (Pakistan), MS (Dermatology)',
        'CHPE (Karachi, Pakistan)',
        'Certified in Aesthetic Medicine & Cosmetology',
        'Certified CFRC & ICC Provider',
      ],
      focus: ['Dermatology', 'Aesthetic medicine', 'Cosmetology'],
      bio: 'Dr. Ghulam Sughra founded Ain Aesthetics. A dermatologist with qualifications from Pakistan and the UK, she is certified in aesthetic medicine and cosmetology and oversees the standard of care across the clinic.',
    },
    {
      slug: 'dr-asim-farooq-virk',
      name: 'Dr. Asim Farooq Virk',
      position: 'Co-Chairman',
      role: 'Aesthetic Physician',
      experience: 7,
      photo: 'doctors/asim.jpg',
      credentials: [
        'MBBS (Kyrgyzstan), Physical Medicine (Pakistan), MPH (Pakistan)',
        'Diploma in Aesthetics (UK)',
        'Ventusa Therapist (London)',
        'Senior Aesthetics Practical Demonstrator, LIST University',
        'CPD Trainer for Aesthetics Protocol',
      ],
      focus: ['Skin rejuvenation', 'Acne scars', 'Hair restoration', 'Microneedling'],
      bio: 'Dr. Asim leads treatment planning at Ain Aesthetics, from first consultation to follow-up. His approach: understand your concern properly, recommend only what you need, and deliver natural-looking results.',
    },
    {
      slug: 'dr-sadaf-khan',
      name: 'Dr. Sadaf Khan',
      role: 'Dermatologist',
      experience: 13,
      photo: 'doctors/sadaf-khan.jpg',
      credentials: ['MBBS, MCPS'],
      focus: ['Skin health', 'Anti-ageing care', 'Hair solutions', 'Aesthetic treatments'],
      bio: 'A dermatologist with 13 years of experience in skin and hair, Dr. Sadaf Khan brings deep clinical expertise to every concern.',
    },
    {
      slug: 'dr-aneela-iqbal',
      name: 'Dr. Aneela Iqbal',
      role: 'Clinical Dermatologist',
      experience: 5,
      credentials: [
        'MBBS, FCPS',
        'Former Registrar, Shalimar Medical & Dental College',
        'CPD Trainer',
      ],
      bio: 'A clinical dermatologist with 5 years of experience, Dr. Aneela Iqbal previously served as a Registrar at Shalimar Medical & Dental College and is a CPD trainer.',
    },
    {
      slug: 'dr-hamid-elahi-dar',
      name: 'Dr. Hamid Elahi Dar',
      role: 'Aesthetic Physician',
      credentials: ['MBBS, RMP', 'BLS, ALS', 'Diploma in Aesthetics (AAA)'],
      bio: 'An aesthetic physician with a Diploma in Aesthetics (AAA), Dr. Hamid Elahi Dar is certified in Basic and Advanced Life Support.',
    },
  ],

  // ------------------------------------------------------------- Treatments
  // `icon` keys map to inline SVGs in views/partials/icon.ejs
  categories: [
    { slug: 'skin', title: 'Skin & Facials', icon: 'sparkle', blurb: 'Glow, clarity and texture: facials, peels and targeted skin treatments.' },
    { slug: 'anti-ageing', title: 'Anti-Ageing', icon: 'face', blurb: 'Soften lines, lift and tighten with doctor-performed treatments.' },
    { slug: 'hair', title: 'Hair Restoration', icon: 'hair', blurb: 'Reduce hair fall and support thicker, healthier-looking hair.' },
    { slug: 'laser', title: 'Laser Hair Removal', icon: 'sun', blurb: 'Smooth skin with long-lasting results, for face and body.' },
  ],

  // `offer` links to an id in `offers`; `results` lists ids in `results`;
  // `compare` links to a treatment shown in a "which is right for you" box.
  treatments: [
    {
      slug: 'hydrafacial',
      category: 'skin',
      title: 'HydraFacial',
      summary: 'Does your skin look dull and tired? A HydraFacial deeply cleanses and hydrates for an instant refresh.',
      benefits: ['Deep hydration', 'Fresh, glowing skin', 'Clean & refined pores', 'Instant refresh'],
      bestFor: ['Dull, tired-looking skin', 'Dehydrated skin', 'Overall radiance and refresh'],
      poster: 'treatments/hydrafacial.jpg',
      compare: 'carbon-laser-facial',
    },
    {
      slug: 'carbon-laser-facial',
      category: 'skin',
      title: 'Carbon Laser Facial',
      summary: 'Keep your skin looking healthy and vibrant. The carbon laser facial deep-cleans pores and refines texture.',
      benefits: ['Detoxify', 'Rejuvenate', 'Protect'],
      bestFor: ['Oily skin', 'Enlarged pores', 'Improving skin texture'],
      poster: 'treatments/carbon-laser.jpg',
      compare: 'hydrafacial',
    },
    {
      slug: 'biorepeel',
      category: 'skin',
      title: 'BioRePeel',
      summary: 'Advanced skin rejuvenation with BioRePeel, a 35% TCA biostimulating, revitalising peel.',
      benefits: ['Glow', 'Smoother texture', 'Reduced pigmentation', 'Faded acne marks'],
      bestFor: ['Dull or uneven skin', 'Pigmentation', 'Acne marks'],
      poster: 'treatments/biorepeel.jpg',
    },
    {
      slug: 'acne-scar-treatment',
      category: 'skin',
      title: 'Acne & Acne Scars',
      summary: 'Treat breakouts and smooth pitted scarring with a staged, doctor-led plan.',
      benefits: ['Reduces acne scars', 'Improves skin texture', 'Clearer, smoother skin', 'Healthy, natural results'],
      bestFor: ['Acne scars', 'Uneven texture', 'Dull skin'],
      poster: 'posters/acne-3stage.jpg',
      results: ['acne2', 'acne', 'skin'],
    },
    {
      slug: 'melasma-pigmentation',
      category: 'skin',
      title: 'Melasma & Pigmentation',
      summary: 'Fade melasma, dark spots and uneven tone for clearer, brighter, healthier skin.',
      benefits: ['Clearer skin', 'Brighter tone', 'Healthier-looking skin'],
      bestFor: ['Melasma', 'Dark spots', 'Uneven skin tone'],
      poster: 'posters/melasma-results.jpg',
      results: ['melasma'],
    },
    {
      slug: 'botox',
      category: 'anti-ageing',
      title: 'Botox',
      summary: 'It’s time to reverse the signs of ageing. Botox softens expression lines for a refreshed, natural look.',
      benefits: ['Softens fine lines', 'Smooths forehead & frown lines', 'Natural-looking results'],
      bestFor: ['Forehead lines', 'Frown lines', 'Early signs of ageing'],
      poster: 'treatments/botox.jpg',
      results: ['botox'],
    },
    {
      slug: 'botox-rf-microneedling',
      category: 'anti-ageing',
      title: 'Botox + RF Microneedling',
      summary: 'A combined treatment to lift, tighten and rejuvenate, smoothing lines while improving firmness and texture.',
      benefits: ['Lift', 'Tighten', 'Rejuvenate'],
      bestFor: ['Fine lines & wrinkles', 'Skin laxity', 'Uneven texture'],
      poster: 'treatments/botox-rf.jpg',
      offer: 'botox-rf',
    },
    {
      slug: 'exosomes',
      category: 'anti-ageing',
      title: 'Exosome Therapy (Exovex)',
      summary: 'Exovex 12 Billion exosomes to restore, rejuvenate and regenerate skin and hair.',
      benefits: ['Healthier skin', 'Stronger hair', 'Cellular repair', 'Natural glow'],
      bestFor: ['Tired, ageing skin', 'Skin repair', 'Thinning hair'],
      poster: 'treatments/exosomes.jpg',
    },
    {
      slug: 'face-prp',
      category: 'anti-ageing',
      title: 'Face PRP',
      summary: 'Platelet-rich plasma from your own blood to revitalise skin with natural, gradual results.',
      benefits: ['Revitalised skin', 'Natural glow', 'Uses your own plasma'],
      bestFor: ['Dull skin', 'Texture concerns', 'Natural rejuvenation'],
      poster: 'treatments/prp.jpg',
      offer: 'prp',
    },
    {
      slug: 'hair-prp',
      category: 'hair',
      title: 'Hair PRP',
      summary: 'Regrow, strengthen, restore. PRP for hair targets thinning and hair fall at the root.',
      benefits: ['Reduces hair fall', 'Boosts growth', 'Thicker & stronger hair'],
      bestFor: ['Hair fall', 'Thinning hair', 'Weak hair'],
      poster: 'treatments/hair-prp.jpg',
      photo: 'hair-prp-team.jpg',
      offer: 'prp',
    },
    {
      slug: 'hair-exosomes',
      category: 'hair',
      title: 'Hair Exosomes',
      summary: 'Your hair needs a boost: advanced hair regeneration for stronger, fuller, healthier hair.',
      benefits: ['Supports healthier-looking hair', 'Helps improve hair appearance', 'Promotes a fuller-looking scalp'],
      bestFor: ['Hair thinning', 'Weak or dull hair', 'Scalp revitalisation'],
      poster: 'treatments/hair-exosomes.jpg',
      offer: 'exosomes',
    },
    {
      slug: 'laser-hair-removal',
      category: 'laser',
      title: 'Laser Hair Removal',
      summary: 'Time to switch to laser: painless, quick and precise hair removal for face and body.',
      benefits: ['Reduces hair growth', 'Smooth & soft skin', 'Long-lasting results', 'Safe & effective'],
      bestFor: ['Upper lip & face', 'Underarms', 'Back, arms & legs'],
      poster: 'treatments/laser-upper-lip.jpg',
      results: ['back', 'underarm'],
    },
  ],

  // -------------------------------------------------------- Training academy
  // From the clinic's "Aesthetics Training Academy: Fast Track" poster.
  academy: {
    title: 'Aesthetics Training Academy',
    tagline: 'Find the right qualification route for your career in aesthetics.',
    poster: 'posters/training-academy.jpg',
    photo: 'academy-trainers.jpg',
    levels: [
      {
        level: 1,
        items: ['Pathway to aesthetics: foundation knowledge for beginners entering the beauty aesthetics industry', 'Anatomy & physiology', 'Health safety (PHC)', 'Client care', 'Ethics protocol', 'Aesthetics practice in the Middle East'],
      },
      {
        level: 2,
        items: ['Skin qualification', 'Introduction to facials', 'Skin analysis', 'Treatment planning', 'Non-invasive treatment', 'Clinical communication skills', 'Advanced skin rejuvenation'],
        for: 'AHS, BS Aesthetics and Cosmetology',
      },
      {
        level: 3,
        items: ['Advanced aesthetics', 'Mesotherapy', 'RF microneedling', 'Face exosomes', 'IV therapy', 'PRP / PRGF', 'Semi-permanent makeup'],
        for: 'Aestheticians and non-core specialists with 2 years’ experience in the medical industry',
      },
      {
        level: 4,
        items: ['Complication management', 'Safety protocol', 'Patient assessment', 'Evidence-based practice', 'Advanced injectables', 'Master-level aesthetics'],
        for: 'MBBS, MCPS, D-Derm, FCPS, MRCP',
      },
    ],
    directEntry: 'With 8+ years of experience and relevant qualifications, you can enter directly at Level 4.',
    directEntryTopics: ['Middle East ethical practice', 'Complication handling strategies'],
    route: ['Top-notch dermatologist supervision', 'Career progression support', 'Accredited CPD programme', 'Programme guidance available'],
  },

  // ----------------------------------------------------------------- Offers
  // Set `active: false` when an offer ends; it disappears from every page.
  offers: [
    { id: 'exosomes', active: true, badge: '40% OFF', title: 'Hair Exosomes', text: 'Flat 40% off advanced hair regeneration for stronger, fuller, healthier hair.', poster: 'offers/exosomes.jpg', treatment: 'hair-exosomes' },
    { id: 'prp', active: true, badge: 'Up to 40% OFF', title: 'Face & Hair PRP', text: 'Up to 40% off PRP to revitalise the scalp, hair and skin.', poster: 'treatments/prp.jpg', treatment: 'hair-prp' },
    { id: 'botox-rf', active: true, badge: '20% OFF', title: 'Botox + RF Microneedling', text: 'Flat 20% off the lift, tighten & rejuvenate combo.', poster: 'treatments/botox-rf.jpg', treatment: 'botox-rf-microneedling' },
  ],

  // ---------------------------------------------------------------- Results
  results: [
    { id: 'acne2', title: 'Acne Scars', before: 'acne2-before.jpg', after: 'acne2-after.jpg', note: 'Clearer, smoother & healthier-looking skin', treatment: 'acne-scar-treatment' },
    { id: 'botox', title: 'Botox: Forehead Lines', before: 'botox-before.jpg', after: 'botox-after.jpg', note: 'Smoother forehead, natural expression', treatment: 'botox' },
    { id: 'back', title: 'Laser Hair Removal: Back', before: 'back-before.jpg', after: 'back-after.jpg', note: 'Smooth skin, longer-lasting results', treatment: 'laser-hair-removal' },
    { id: 'melasma', title: 'Melasma Treatment', before: 'melasma-before.jpg', after: 'melasma-after.jpg', note: 'Clearer, brighter, healthier skin', treatment: 'melasma-pigmentation' },
    { id: 'acne', title: 'Acne Scar Treatment', before: 'acne-before.jpg', after: 'acne-after.jpg', note: 'Smoother texture, reduced scarring', treatment: 'acne-scar-treatment' },
    { id: 'underarm', title: 'Laser Hair Removal: Underarms', before: 'underarm-before.jpg', after: 'underarm-after.jpg', note: 'Visibly reduced hair growth', treatment: 'laser-hair-removal' },
    { id: 'skin', title: 'Skin Rejuvenation', before: 'skin-before.jpg', after: 'skin-after.jpg', note: 'Even tone and refreshed complexion', treatment: 'acne-scar-treatment' },
  ],

  // Full result posters on the Results page (in /img/posters/)
  resultPosters: [
    { file: 'acne-3stage.jpg', title: 'Acne scar results: before, between sessions and after' },
    { file: 'laser-back.jpg', title: 'Laser hair removal results: back' },
    { file: 'melasma-results.jpg', title: 'Melasma treatment results' },
    { file: 'acne-scar-results.jpg', title: 'Acne scar results' },
    { file: 'skin-results.jpg', title: 'Skin rejuvenation results' },
    { file: 'underarm.jpg', title: 'Laser hair removal results: underarms' },
  ],

  // Clinic life gallery on the Doctors page (in /img/posters/)
  clinicPosters: [
    { file: 'meet-dr-asim.jpg', title: 'Meet Dr. Asim Farooq Virk' },
    { file: 'happy-face.jpg', title: 'Dr Asim Virk with a patient' },
    { file: 'consent.jpg', title: 'Consent before every procedure' },
    { file: 'aesthetic-treatments.jpg', title: 'Aesthetic treatments by Dr Asim Virk' },
    { file: 'review-time.jpg', title: 'Your feedback matters' },
    { file: 'meet-dr-asim-contact.jpg', title: 'Book with Dr. Asim' },
  ],

  // ---------------------------------------------------------------- Reviews
  // Only real reviews from real clients. `photo`, `treatment`, `source` (e.g. 'Google review',
  // default 'Verified client') and `stars` (default 5) are optional; no photo shows an initial.
  reviews: [
    { quote: 'The staff is very cooperative and professional. My experience at Aesthetics & Medical Center was excellent. I am really happy with the results and highly recommend this place!', name: 'Happy Client', photo: 'reviews/woman.jpg' },
    { quote: 'Amazing experience at Aesthetics & Medical Center! The staff is professional, friendly and very cooperative. Highly recommended for anyone looking for quality aesthetic treatments and excellent care.', name: 'Happy Client', photo: 'reviews/man.jpg' },
    { quote: 'The staff is very professional, friendly and cooperative. Highly recommended for anyone looking for quality aesthetic treatments and excellent care.', name: 'Happy Clients', photo: 'reviews/couple.jpg' },
  ],

  // Middle slot is the doctor treating a male patient
  videos: ['clinic-1.mp4', 'clinic-3.mp4', 'clinic-2.mp4'],
};

// ---- Derived lookups (used by routes and templates) ----
const m = module.exports;
m.activeOffers = m.offers.filter((o) => o.active);
m.offerById = Object.fromEntries(m.activeOffers.map((o) => [o.id, o]));
m.treatmentBySlug = Object.fromEntries(m.treatments.map((t) => [t.slug, t]));
m.resultById = Object.fromEntries(m.results.map((r) => [r.id, r]));
m.categoryBySlug = Object.fromEntries(m.categories.map((c) => [c.slug, c]));
m.founder = m.doctors.find((d) => /^Founder/.test(d.position || '')) || m.doctors[0];
m.waLink = (text) => `https://wa.me/${m.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
// Pre-filled WhatsApp messages name the treatment or deal the visitor was looking at.
m.waDefault = 'Hi, I would like to book an appointment.';
m.waAbout = (subject) => `Hi, I need info about ${subject}. Could you share the details?`;
m.waOffer = (o) => m.waAbout(`the ${o.title} offer (${o.badge})`);
