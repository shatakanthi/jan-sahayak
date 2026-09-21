// Life Event Workflows
export const LIFE_EVENTS = [
  {
    id: 'new-child',
    title: '👶 New Child & Family Care',
    icon: 'Baby',
    color: 'from-pink-500 to-rose-600',
    description: 'Essential services for birth registration, maternal benefits, immunization, and future savings.',
    bundledServices: [
      { name: 'Birth Registration & CRS Certificate', department: 'Municipal Corp / Chief Registrar of Births & Deaths', url: 'https://crsorgi.gov.in/' },
      { name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)', department: 'Ministry of Women & Child Development', url: 'https://pmmvy.wcd.gov.in/' },
      { name: 'Sukanya Samriddhi Yojana (for Girl Child)', department: 'India Post / Scheduled Banks', url: 'https://www.indiapost.gov.in/' },
      { name: 'Universal Immunization Card & Mother Child Tracking (MCTNS)', department: 'Ministry of Health', url: 'https://nrhm-mctns.nic.in/' }
    ]
  },
  {
    id: 'student',
    title: '🎓 Student & Higher Education',
    icon: 'GraduationCap',
    color: 'from-blue-500 to-indigo-600',
    description: 'Scholarships, caste/income certificates, hostel subsidies, and education loan interest support.',
    bundledServices: [
      { name: 'National Scholarship Portal (NSP)', department: 'Ministry of Electronics & IT', url: 'https://scholarships.gov.in/' },
      { name: 'E-District Caste & Income Certificate', department: 'Revenue Department', url: 'https://edistrict.gov.in/' },
      { name: 'Central Sector Interest Subsidy (CSIS) Loan Scheme', department: 'Ministry of Education', url: 'https://www.education.gov.in/' },
      { name: 'PM YASASVI Scholarship for OBC/EBC/DNT', department: 'Social Justice Dept', url: 'https://yet.nta.ac.in/' }
    ]
  },
  {
    id: 'senior-citizen',
    title: '👴 Senior Citizen Care',
    icon: 'HeartHandshake',
    color: 'from-emerald-500 to-teal-700',
    description: 'Old age pensions, senior citizen identity cards, healthcare coverage, and travel concessions.',
    bundledServices: [
      { name: 'IGNOAPS Old Age Pension', department: 'Social Welfare Department', url: 'https://nsap.nic.in/' },
      { name: 'Ayushman Bharat Senior 70+ Coverage', department: 'National Health Authority', url: 'https://pmjay.gov.in/' },
      { name: 'Senior Citizen Identity Card & Health Card', department: 'District Social Welfare Office', url: 'https://socialjustice.gov.in/' },
      { name: 'Vayoshri Yojana (Free Assisted Living Devices)', department: 'ALIMCO / Social Justice', url: 'https://alimco.in/' }
    ]
  },
  {
    id: 'business',
    title: '💼 Starting a Business',
    icon: 'Briefcase',
    color: 'from-amber-500 to-orange-600',
    description: 'Micro-enterprise registration, collateral-free loans, GST registration, and municipal trade licenses.',
    bundledServices: [
      { name: 'Udyam MSME Online Registration', department: 'Ministry of MSME', url: 'https://udyamregistration.gov.in/' },
      { name: 'PM SVANidhi / PMEGP Credit Subsidy', department: 'KVIC / SIDBI', url: 'https://kviconline.gov.in/' },
      { name: 'GST Portal Registration', department: 'CBIC / GST Council', url: 'https://www.gst.gov.in/' },
      { name: 'Single Window Trade License', department: 'Municipal Corporation', url: 'https://national-single-window-system.gov.in/' }
    ]
  },
  {
    id: 'relocation',
    title: '🏠 Moving to a New City',
    icon: 'MapPin',
    color: 'from-cyan-500 to-blue-600',
    description: 'Address update on Aadhaar, ONORC ration portability, election constituency transfer, and utility connections.',
    bundledServices: [
      { name: 'MyAadhaar Address Update online', department: 'UIDAI', url: 'https://myaadhaar.uidai.gov.in/' },
      { name: 'One Nation One Ration Card (ONORC)', department: 'Department of Food & Public Distribution', url: 'https://nfsa.gov.in/' },
      { name: 'Voter ID Transfer (Form 8)', department: 'Election Commission of India', url: 'https://voters.eci.gov.in/' },
      { name: 'LPG Gas Connection Address Transfer', department: 'IOCL / HPCL / BPCL', url: 'https://mylpg.in/' }
    ]
  },
  {
    id: 'agriculture',
    title: '🚜 Farmer & Agriculture Support',
    icon: 'Tractor',
    color: 'from-green-600 to-emerald-800',
    description: 'Direct income support, subsidized crop insurance, Kisan Credit Card, and soil health diagnostics.',
    bundledServices: [
      { name: 'PM Kisan Samman Nidhi', department: 'Ministry of Agriculture', url: 'https://pmkisan.gov.in/' },
      { name: 'Kisan Credit Card (KCC) Scheme', department: 'NABARD / RBI', url: 'https://www.nabard.org/' },
      { name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', department: 'PMFBY Portal', url: 'https://pmfby.gov.in/' },
      { name: 'Soil Health Card Scheme', department: 'Dept of Agriculture & Cooperation', url: 'https://soilhealth.dac.gov.in/' }
    ]
  }
];
