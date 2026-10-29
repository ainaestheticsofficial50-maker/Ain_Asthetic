// One-time asset pipeline: copies the raw WhatsApp exports from /Images into
// /public with clean names, and crops photos out of the posters for page use.
// Run with: npm run assets
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'Images');
const OUT = path.join(__dirname, '..', 'public');
const src = (name) => path.join(SRC, `WhatsApp ${name}`);

const posters = {
  'meet-dr-asim-contact.jpg': 'Image 2026-10-17 at 2.57.38 PM (1).jpeg',
  'aesthetic-treatments.jpg': 'Image 2026-10-17 at 2.57.38 PM (2).jpeg',
  'review-time.jpg': 'Image 2026-10-17 at 2.57.38 PM.jpeg',
  'melasma-results.jpg': 'Image 2026-10-17 at 2.57.39 PM (1).jpeg',
  'meet-dr-asim.jpg': 'Image 2026-10-17 at 2.57.39 PM (2).jpeg',
  'acne-scar-results.jpg': 'Image 2026-10-17 at 2.57.39 PM.jpeg',
  'skin-results.jpg': 'Image 2026-10-17 at 2.57.41 PM.jpeg',
  'happy-face.jpg': 'Image 2026-10-17 at 2.58.03 PM.jpeg',
};

const videos = {
  'clinic-1.mp4': 'Video 2026-10-17 at 2.57.40 PM.mp4',
  'clinic-2.mp4': 'Video 2026-10-17 at 2.57.40 PM (1).mp4',
  'clinic-3.mp4': 'Video 2026-10-17 at 2.58.00 PM.mp4',
};

// [output, source poster, { left, top, width, height }]
const crops = [
  ['img/dr-asim-hero.jpg', 'aesthetic-treatments.jpg', { left: 0, top: 0, width: 560, height: 1030 }],
  ['img/treatment.jpg', 'aesthetic-treatments.jpg', { left: 300, top: 640, width: 822, height: 400 }],
  ['img/dr-asim-portrait.jpg', 'meet-dr-asim.jpg', { left: 90, top: 40, width: 440, height: 600 }],
  ['img/clinic-consult.jpg', 'happy-face.jpg', { left: 0, top: 260, width: 900, height: 900 }],
  ['img/review.jpg', 'review-time.jpg', { left: 450, top: 330, width: 574, height: 760 }],
  ['img/results/melasma-before.jpg', 'melasma-results.jpg', { left: 42, top: 482, width: 452, height: 650 }],
  ['img/results/melasma-after.jpg', 'melasma-results.jpg', { left: 530, top: 482, width: 452, height: 650 }],
  ['img/results/acne-before.jpg', 'acne-scar-results.jpg', { left: 246, top: 458, width: 553, height: 368 }],
  ['img/results/acne-after.jpg', 'acne-scar-results.jpg', { left: 300, top: 856, width: 499, height: 396 }],
  ['img/results/skin-before.jpg', 'skin-results.jpg', { left: 32, top: 302, width: 518, height: 566 }],
  ['img/results/skin-after.jpg', 'skin-results.jpg', { left: 572, top: 302, width: 518, height: 566 }],
];

(async () => {
  for (const [out, name] of Object.entries(posters)) {
    await sharp(src(name)).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, 'img/posters', out));
  }
  for (const [out, name] of Object.entries(videos)) {
    fs.copyFileSync(src(name), path.join(OUT, 'video', out));
  }
  for (const [out, poster, box] of crops) {
    const input = path.join(OUT, 'img/posters', poster);
    const meta = await sharp(input).metadata();
    const safe = {
      left: box.left,
      top: box.top,
      width: Math.min(box.width, meta.width - box.left),
      height: Math.min(box.height, meta.height - box.top),
    };
    await sharp(input).extract(safe).jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(OUT, out));
  }
  await officialLogo();
  await batch2();
  await batch3();
  console.log('Assets ready.');
})();


// Official logo (Images/logo.png, transparent PNG): full lockup plus the "EA" mark on its own.
async function officialLogo() {
  const file = path.join(SRC, 'logo.png');
  await sharp(file).trim().png().toFile(path.join(OUT, 'img/logo.png'));
  const band = await sharp(file).extract({ left: 0, top: 95, width: 557, height: 170 }).png().toBuffer();
  const mark = await sharp(band).trim().png().toBuffer();
  await sharp(mark).toFile(path.join(OUT, 'img/logo-mark.png'));
  // White version for dark backgrounds: keep the alpha, paint every pixel white.
  const { width, height } = await sharp(mark).metadata();
  const alpha = await sharp(mark).extractChannel('alpha').raw().toBuffer();
  await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png().toFile(path.join(OUT, 'img/logo-mark-light.png'));
  await whiteLogo(path.join(OUT, 'img/logo.png'), path.join(OUT, 'img/logo-white.png'));
  await sharp(mark).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(path.join(OUT, 'img/favicon.png'));
}

// Footer version for dark backgrounds: navy becomes white and the white badge text
// becomes navy (blended by luminance so edges stay smooth); rose text is lightened.
async function whiteLogo(input, output) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const navy = [29, 43, 69];
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (r - b > 45) {
      data[i] = 231; data[i + 1] = 185; data[i + 2] = 164;
    } else {
      const t = Math.min(1, Math.max(0, ((r + g + b) / 3 - 45) / 190));
      for (let c = 0; c < 3; c++) data[i + c] = Math.round(255 * (1 - t) + navy[c] * t);
    }
  }
  await sharp(data, { raw: info }).png().toFile(output);
}

// ---------------------------------------------------------------------------
// Batch 2 (Images/batch2): treatment posters, doctors, extra results, reviews.
const B2 = path.join(SRC, 'batch2');
const posterOut = {
  // treatment pages
  'treatments/hydrafacial.jpg': 'hydrafacial.jpg',
  'treatments/carbon-laser.jpg': 'carbon-laser.jpg',
  'treatments/hydra-vs-carbon.jpg': 'hydra-vs-carbon.jpg',
  'treatments/biorepeel.jpg': 'biorepeel.jpg',
  'treatments/botox.jpg': 'botox.jpg',
  'treatments/botox-rf.jpg': 'botox-rf-offer.jpg',
  'treatments/exosomes.jpg': 'exosomes-exovex.jpg',
  'treatments/hair-exosomes.jpg': 'hair-exosomes.jpg',
  'treatments/hair-prp.jpg': 'hair-prp.jpg',
  'treatments/hair-prp-team.jpg': 'sign-hair-prp.jpg',
  'treatments/prp.jpg': 'prp-offer.jpg',
  'treatments/laser-upper-lip.jpg': 'laser-upper-lip.jpg',
  'treatments/laser-specialist.jpg': 'laser-specialist.jpg',
  'treatments/aesthetic.jpg': 'aesthetic-treatment-female.jpg',
  // offers
  'offers/exosomes.jpg': 'exosomes-offer.jpg',
  // result posters
  'posters/acne-3stage.jpg': 'result-acne-3stage.jpg',
  'posters/laser-back.jpg': 'result-laser-back.jpg',
  'posters/underarm.jpg': 'result-underarm.jpg',
  'posters/consent.jpg': 'consent.jpg',
};
const b2Crops = [
  // doctors (4:5 portraits)
  ['img/doctors/asim.jpg', 'dr-asim-navy.jpg', { left: 30, top: 90, width: 580, height: 725 }],
  ['img/doctors/ghulam-sughra.jpg', 'dr-ghulam-sughra.jpg', { left: 0, top: 260, width: 460, height: 575 }],
  ['img/doctors/sadaf-khan.jpg', 'dr-sadaf-25yrs.jpg', { left: 0, top: 300, width: 460, height: 575 }],
  // before / after pairs
  ['img/results/underarm-before.jpg', 'result-underarm.jpg', { left: 0, top: 150, width: 860, height: 650 }],
  ['img/results/underarm-after.jpg', 'result-underarm.jpg', { left: 0, top: 950, width: 860, height: 650 }],
  ['img/results/back-before.jpg', 'result-laser-back.jpg', { left: 0, top: 340, width: 445, height: 630 }],
  ['img/results/back-after.jpg', 'result-laser-back.jpg', { left: 455, top: 340, width: 445, height: 630 }],
  ['img/results/acne2-before.jpg', 'result-acne-3stage.jpg', { left: 32, top: 247, width: 376, height: 533 }],
  ['img/results/acne2-after.jpg', 'result-acne-3stage.jpg', { left: 840, top: 247, width: 348, height: 533 }],
  // review avatars
  ['img/reviews/woman.jpg', 'review-woman.jpg', { left: 190, top: 140, width: 380, height: 380 }],
  ['img/reviews/couple.jpg', 'review-couple.jpg', { left: 510, top: 300, width: 720, height: 720 }],
  ['img/reviews/man.jpg', 'review-man.jpg', { left: 490, top: 200, width: 460, height: 460 }],
  // section photos
  ['img/consent.jpg', 'consent.jpg', { left: 0, top: 480, width: 900, height: 960 }],
  ['img/hair-prp-team.jpg', 'sign-hair-prp.jpg', { left: 0, top: 380, width: 900, height: 800 }],
];

async function batch2() {
  for (const dir of ['treatments', 'offers', 'doctors', 'reviews']) {
    fs.mkdirSync(path.join(OUT, 'img', dir), { recursive: true });
  }
  for (const [out, name] of Object.entries(posterOut)) {
    await sharp(path.join(B2, name)).resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, 'img', out));
  }
  for (const [out, name, box] of b2Crops) {
    await sharp(path.join(B2, name)).extract(box).resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, out));
  }
}

// ---------------------------------------------------------------------------
// Batch 3 (Images/batch3): clinic interior, training academy, Botox result.
const B3 = path.join(SRC, 'batch3');
const b3Crops = [
  // [output, source, crop box or null for the whole image, output width]
  ['img/clinic-lounge.jpg', 'clinic-lounge.jpg', { left: 0, top: 180, width: 960, height: 1000 }, 960],
  ['img/posters/training-academy.jpg', 'training-academy.jpg', null, 963],
  ['img/academy-trainers.jpg', 'training-academy.jpg', { left: 500, top: 100, width: 463, height: 360 }, 463],
  ['img/results/botox-before.jpg', 'result-botox-forehead.jpg', { left: 110, top: 100, width: 560, height: 490 }, 560],
  ['img/results/botox-after.jpg', 'result-botox-forehead.jpg', { left: 110, top: 725, width: 560, height: 500 }, 560],
];

async function batch3() {
  for (const [out, name, box, width] of b3Crops) {
    let img = sharp(path.join(B3, name));
    if (box) img = img.extract(box);
    await img.resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, out));
  }
}
