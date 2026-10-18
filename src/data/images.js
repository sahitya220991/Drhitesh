// ═══════════════════════════════════════════════════════════
//  PHOTOGRAPHS
//
//  This is the only file you edit to add or change an image.
//
//  TO ADD A PHOTOGRAPH
//  1. Put the file in  public/images/
//  2. Find its entry below and fill in  file,  alt,  width  and
//     height. Delete the  //  in front of each of those lines.
//
//  Until  file  is filled in, the page shows a labelled grey
//  placeholder. Nothing breaks, and nothing moves on the page
//  when the real image arrives.
//
//  WIDTH AND HEIGHT must be the real pixel dimensions of the
//  file. They are not display sizes — the browser uses them to
//  reserve the right space before the image loads, which is what
//  stops the page jumping. Right-click the file and check
//  Properties (Windows) or Get Info (Mac).
//
//  ALT TEXT describes the photograph for someone who cannot see
//  it, and for Google. Write what is in the picture, plainly.
//  Not "best dermatologist in Delhi".
// ═══════════════════════════════════════════════════════════

export const images = {
  // ── Homepage hero ────────────────────────────────────────
  // Portrait, upright. The most important image on the site.
  'home-hero': {
    placeholder: 'Image 1 · Hero — dr-hitesh-portrait.jpg',
    file: 'dr-hitesh-portrait.jpg',
    alt: 'Dr Hitesh Aggarwal standing in his consulting room',
    width: 1200,
    height: 1500,
  },

  // ── Homepage, "How a diagnosis is made" ──────────────────
  // Dermatoscope or trichoscope in use. Clinical, not posed.
  'home-diagnosis': {
    placeholder: 'Image 2 · Diagnosis — trichoscopy.jpg',
    file: 'trichoscopy.jpg',
    alt: 'Dr Hitesh Aggarwal examining a patient with a dermatoscope',
    width: 1200,
    height: 900,
    // the slot is tall, so bias the crop right to keep the
    // instrument and the patient in frame rather than centring
    position: '72% 50%',
  },

  // ── Homepage, second opinion section ─────────────────────
  // Consultation in progress. Landscape.
  'home-second-opinion': {
    placeholder: 'Image 3 · Second opinion — consultation.jpg',
    file: 'consultation.jpg',
    alt: 'Dr Hitesh Aggarwal going through a patient’s existing medication with him at the clinic',
    width: 1200,
    height: 750,
  },

  // ── Homepage, About section ──────────────────────────────
  'home-about': {
    placeholder: 'Image 4 · About — dr-hitesh-about.jpg',
    file: 'dr-hitesh-about.jpg',
    alt: 'Dr Hitesh Aggarwal at his clinic',
    width: 1200,
    height: 1500,
  },

  // ── About page ───────────────────────────────────────────
  // Can reuse the same file as home-about, or use a different one.
  'about-portrait': {
    placeholder: 'Image · dr-hitesh-about.jpg',
    file: 'dr-hitesh-about.jpg',
    alt: 'Dr Hitesh Aggarwal at his clinic',
    width: 1200,
    height: 1500,
  },

  // ── Clinic photographs — not yet placed on any page ──────
  // Fill these in and they can be added to the clinics page.
  'clinic-narela': {
    placeholder: 'Clinic — Narela',
    // file: 'clinic-narela.jpg',
    // alt: 'Reception at the Narela clinic',
    // width: 1200,
    // height: 800,
  },

  'clinic-rohini': {
    placeholder: 'Clinic — Rohini',
    // file: 'clinic-rohini.jpg',
    // alt: 'Consulting room at the Rohini clinic',
    // width: 1200,
    // height: 800,
  },
};
