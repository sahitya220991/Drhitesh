// ─────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH
//  Change a clinic timing, a phone number or a credential HERE
//  and it updates on every page of the site automatically.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Dr Hitesh Aggarwal',
  role: 'Dermatologist',
  // Always pair the name with "Dermatologist" — there is another
  // Dr Hitesh Aggarwal (ENT) practising in Rohini.
  fullTitle: 'Dr Hitesh Aggarwal · Dermatologist',
  url: 'https://drhiteshaggarwal.com',
  phone: '+918178875845',
  phoneDisplay: '+91 81788 75845',
  email: 'info@drhiteshaggarwal.com',
  instagram: 'https://www.instagram.com/drhiteshaggarwal/',
};

export const doctor = {
  name: 'Dr Hitesh Aggarwal',
  qualifications: 'MBBS, DDVL',
  registration: 'Delhi Medical Council Reg. 57994',
  // VERIFIED against uploaded certificates. Do not inflate.
  // MBBS Dec 2010 · DMC registration Jul 2012 · DDVL May 2017
  practisingSince: 2017,
  registeredSince: 2012,
  training: 'J.J.M. Medical College, Davangere',
  photo: '/images/dr-hitesh-aggarwal.jpg',
};

export const clinics = [
  {
    slug: 'narela',
    name: 'Narela',
    // Address confirmed against the Google Business Profile.
    address: '2371, Bawana Road, near State Bank of India, Bhorgarh, Narela, Delhi 110040',
    locality: 'Narela',
    postalCode: '110040',
    lat: 28.8435146,
    lng: 77.0892033,
    hours: 'Monday to Saturday, 11:00 AM – 3:00 PM',
    hoursSchema: ['Mo-Sa 11:00-15:00'],
    closed: 'Sunday closed',
    rating: 4.9,
    reviewCount: 507,
    mapsUrl: 'https://maps.google.com/?cid=16614388234675505846',
  },
  {
    slug: 'rohini',
    name: 'Rohini',
    // CORRECTED. The old site said "Plot 54, Pocket 20" — that was wrong.
    address: 'Ground Floor, Plot 26, Pocket 17, Sector 24, Rohini, New Delhi 110085',
    locality: 'Rohini',
    postalCode: '110085',
    lat: 28.7249468,
    lng: 77.0935764,
    hours: 'Monday to Saturday, 6:00 PM – 8:00 PM',
    hoursSchema: ['Mo-Sa 18:00-20:00'],
    closed: 'Sunday closed',
    rating: 4.8,
    reviewCount: 148,
    mapsUrl: 'https://maps.google.com/?cid=4155786772974209852',
  },
];

// Greater Kailash removed — confirmed no longer operating.

export const proof = {
  totalReviews: clinics.reduce((n, c) => n + c.reviewCount, 0),
  averageRating: 4.9,
};

// ── Booking abstraction ──────────────────────────────────────
// Every CTA on the site routes through this. Today it resolves to
// WhatsApp. To switch to a real booking system later, change this
// one function — no page needs editing.
export function bookingHref({ mode = 'clinic', clinic = null, concern = null } = {}) {
  const lines = [
    mode === 'video'
      ? 'Hi, I would like to book an online consultation with Dr Hitesh Aggarwal.'
      : 'Hi, I would like to book an appointment with Dr Hitesh Aggarwal.',
    '',
    'Name:',
    concern ? `Concern: ${concern}` : 'Concern:',
    clinic ? `Preferred clinic: ${clinic}` : 'Preferred clinic:',
    'Preferred day/time:',
  ];
  return `https://wa.me/${site.phone.replace('+', '')}?text=${encodeURIComponent(lines.join('\n'))}`;
}
