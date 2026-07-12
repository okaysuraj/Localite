// mockData.js
export const events = [
  {
    id: "e1",
    title: "The Midsummer Garden Soiree at Elmsley Manor",
    type: "PREMIUM EXHIBITION",
    description: "An evening of curated gastronomy, live jazz, and high-society networking in the private gardens of the historic Elmsley estate.",
    date: "OCT 24, 2024",
    location: "Elmsley Manor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5_ntHtCf-2oV-osFHjF37uhHYTmaDHdxRwH-9gXR_tnVW8uBhRcTJnVOLP3drjqsihPPyVeGeNJXZut2oPxreWDu4_OA0I9nzTBh0EKvfCymtO7LEnXRGlDTIFw1IfR_cSNHrId3ySpf8OwRmfaoDZbdvrn30_ZOOWbyqqRRMb36jTp7XnYO1QjfwnIl5xIXjxoyeK7hnbKQ9BBT6Ylk6qGNfFax_X3SEG76-081XlWHniOHx0zo3WQ",
    category: "CULTURE & ARTS",
    attendees: 120,
    status: "UPCOMING",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "e2",
    title: "Midnight Philharmonic: Vivaldi Reimagined",
    type: "LIVE",
    description: "Experience the fusion of classic renaissance aesthetics with cutting-edge generative technology.",
    date: "FRI, NOV 22",
    location: "The Grand Opera",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8GCyVMZYRsFHTMohkKcArN52qT45xyUXS8_V9gnu_bY_xzC--I23-QfKP1wDMABmiuuH3gHev0zxl0teny56PvTteQ4kMH1HUWnIMmfJN-2iAk2Z87PHlz8eFoJ-CzxwykUf1DIep7-7TkQjQ4lbnzQ7L04UAMOTjEkf7htJVJYVJkI1nLRBfiD-littH3fCv_7jAV8mz5yFleGffwU_zJYiZ8uNYpcg6856t1qQ8zKTsOhut8ttdHg",
    category: "CULTURE & ARTS",
    attendees: 45,
    status: "UPCOMING",
    coordinates: { lat: 40.7138, lng: -74.0160 }
  },
  {
    id: "e3",
    title: "Charity Tennis Invitational & Brunch",
    type: "SPORTS",
    description: "A private doubles tournament held at the historic Belvedere Courts.",
    date: "SUN, NOV 24",
    location: "Royal Oaks Club",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9TG1JfcrKTW23Q65T5QM_dGf-GjwxmkALkR1HmU4u5tXouDjG8zcsA1Aj4ROET2E0Rpfd9Ub80m4zQnwReEch3lOfN22TwKftbD3t4uXATpNU96O48Ig-t1gX1vwPslMNoNnmosetKmTN5MwOflNiolYikncYQwbSsf4c-FxdjZmCb0cmj_h5Fhfce10bi1VSpGlYCihHDkpLelNUjaV4QGTD33pnoWBpIR8yNJVeVObXV0TZ8jQueg",
    category: "SPORTS & CHARITY",
    attendees: 24,
    status: "UPCOMING",
    coordinates: { lat: 40.7028, lng: -74.0120 }
  }
];

export const users = [
  {
    id: "u1",
    name: "Julian Vance",
    role: "Principal Architect",
    distance: "0.8 MILES",
    interests: ["Modernism", "Sailing", "Vinyl"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaE8RD8w1ffPWyQeSoMWwHK764oE4YdkXo1wsal0FWmryzptNtZuTUQZ_WG4vVk6-3SknVVuBQQvrOFs35aEj56FnXsLMvl_Y1ThUozU5X4XpHekiBAHgO7-uqMUbBSDn0zrn3rPEWspugY1kjVPBPOYRtq7GuT4M2eBPQabxMuSKI2lW-Wg-yWe4GKIxOP-UhNdjwdxa22D6LS3HsEJG7vTICUqns7RgDOUSI8qmEEXKxpVetBykHLg"
  },
  {
    id: "u2",
    name: "Elena Rossi",
    role: "Sommelier",
    distance: "1.2 MILES",
    interests: ["Tuscany", "Jazz", "Fine Dining"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwf_DpQZd7hJpQjkLmC17R7kP78opcwjlYJqbrEJEAmwpBZVBfykVwXqoeheuTmfmqR92MOexwnY5mVGoIPZE5wscuKRGIAIzhXzEGVQDtvtHklhA8PCGHapJuVDGooMEwHBuImbgBdFOx1qIRTg-9_CYXfttZ803i7VhQbVLr0lTVXi9QLNWUscTJpQQsO-AnQZadp1PYiz_gSmNyRtr0gs2eDAVfMSGRDENKrc3-YqCBa17MF-mJ0Q"
  },
  {
    id: "u3",
    name: "Marcus Thorne",
    role: "Venture Partner",
    distance: "2.5 MILES",
    interests: ["Tennis", "Startups", "Philanthropy"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUMM8EiC3FbNtxU98MZlDHfjuhu4nHyGJgyDjtMOBvUE9yEqNT9W5t5LIbRbT9br9rW8azRIRg7KWQROHRs4VTlJ1k0_yniBjI26BDmRIIqwFDif8PSMlUFoBfbCa_QRSl1VJoAAY1B_n903TKJZ_ERnPLDIce-rgHRtyrqK7TuEobvzkUOaSYUc6L_xTiUvGYPNHWwEb6aMYIvvNUvsD8Ql28BtkNbCZ0vfmbr5hKvbA1WTy6zNhHkw"
  },
  {
    id: "u4",
    name: "Sophia Chen",
    role: "Creative Director",
    distance: "0.5 MILES",
    interests: ["Branding", "Sculpture", "Travel"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8aVfn1ZJ81sBFMq6ZFkfDGSZmdYJBgUkzJibXQMHoqNfJ3xICmURceNOqk-4RovrGezRd7cM2Z3Zw1j6nFJm7Hzm87wu65Rc94Ar7gASmanFa1gSbi6Tao_QbAYt069GWpkzEI4CHhQCR7E4yuogQ_vu1MtUlZA9QN482gbIRT0H3qOXd5zuh5-PqrMjOdYiTFtNcUeoFDA0m7J8RWdPnfbuNHHX6VcSktLP2aVsxijAHVIDXu8agkA"
  }
];

export const categories = [
  {
    id: "c1",
    name: "Tennis",
    type: "TRADITION",
    activeMatches: 24,
    venues: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUg8QrDPQJk75uhkvDQh_5r_1od6bLcWWDl2xGwc-NovzRMlETtljT3uiGuZaqFCWM3HIK4vQdjeY6IHdcGbbr1PhlVlk5EHIXS-hc4pRqlLAh2s0fQiHa7BFOgeTV--Z8FwytAMmSQVlyQFunstpp57vXpRXQKaN8JlKDh7BTtglO7zEuXBIOZQEDA-cBKNQP1BzFkw-NHQhnpi3lkiyR1SOiQHR4jKNjvNQVJNSgfoepPvHly6RHNw"
  },
  {
    id: "c2",
    name: "Polo",
    type: "MAJESTY",
    activeMatches: 8,
    venues: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6-QYCloEn4YPVifuHqvUSVPSOnrE8JgjvRMp11MZIqsLHkaaUQ4-0qm6yGlNjO8avzbXaogcMHrNk6h0-8YMNWx2_18FDXa-ptZKjlLpQzGR4WirbnxNKqsWKDMimzQkstS-LV_fLFYrCq47TUx2RD2m98U4J_DkGkWYx6BKedTBNl-OSFMrSVN8SGL44pT11TqhZ0D0HKD5zrNcvq336VBoW-q6Pb7yS5S6sxDu001sXTGp5_q_9oQ"
  },
  {
    id: "c3",
    name: "Golf",
    type: "PRECISION",
    activeMatches: 11,
    venues: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgQspEnJ36dCN3YJVDXpOM3-aqisOi65bF5flfSdAQuQA3Dx5BkbD8Y4dK-icVIPnigBpJ_OAOjOlAODJwM0-1UmepuVGCvlS2Lc75NahAVUv-KwRmKBgIVpihw2YTdIdPYQzeo6xz9zD2M4UMLn5WP-S3RIyvrRewjrh0hzDMPpjeDwzD2PWT5Mr6mgvLHKurZ7_OQaQztCCr6mKQnPtuQujxB3poiky9iW1Bwbxz4ohMT4Z0RCPIog"
  },
  {
    id: "c4",
    name: "Cricket",
    type: "HERITAGE",
    activeMatches: 5,
    venues: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzUC_MM3iIfr1bRDeWexWi9u1Wxvj9sPgOUK8kMnoLnVD7_7_1dYNbr4VpcAd-m8eTDBDy7PXE97pvP_fVMTF51tZXhY2aC0Lumn8_7pJAUlx6BltTBlzLrUmgvhPsYKbJcsuauZB2MU3_EWyxus1Q6QUKfsL7yR2l9bgpyERBnfkVfnGAv0f0t9TG4HrK8ixWKQvVvUeIMN1puiVP46oXfYsrgR6iZ0hilhIIhX4ImGKPb22uO9StUQ"
  }
];
