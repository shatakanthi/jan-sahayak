// Expanded Cross-Sector Verified Services Database (Municipal, Utilities, Healthcare, Transport, Banking & Schemes)
export const VERIFIED_SCHEMES = [
  // --- SECTOR 1: MUNICIPAL & UTILITIES ---
  {
    id: 'utility-elec-transfer',
    name: 'Electricity Connection Address Transfer',
    category: 'Municipal & Utilities',
    sector: 'Utilities',
    department: 'State Electricity Distribution Corporation (Discom / BESCOM / TSSPDCL)',
    officialUrl: 'https://bescom.karnataka.gov.in/',
    lastVerified: '2026-09-20',
    verifiedSource: 'State Electricity Regulatory Portal',
    dataOwner: 'Department of Energy & Discoms',
    confidenceScore: 100,
    shortDescription: 'Transfer or relocate active domestic electricity meter connection to new address.',
    description: 'Enables registered consumers to shift electricity service connection, update consumer billing address, or transfer meter ownership upon moving home.',
    eligibility: {
      location: 'Urban & Rural Discom jurisdiction',
      state: 'All India'
    },
    benefits: 'Seamless meter transfer without security deposit penalty + online billing continuity.',
    requiredDocuments: [
      { name: 'Proof of New Address (Registered Lease / Sale Deed)', mandatory: true },
      { name: 'Existing Consumer RR / Account ID', mandatory: true },
      { name: 'Aadhaar Card of Account Holder', mandatory: true },
      { name: 'Latest Paid Electricity Bill Copy', mandatory: true }
    ],
    applicationSteps: [
      'Log into Discom Consumer Portal or submit unified navigator request.',
      'Enter Existing Consumer Account ID & new premises address details.',
      'Upload Lease/Sale agreement copy and Aadhaar identity proof.',
      'Pay nominal shifting fee (₹150) or schedule junior engineer site inspection.',
      'Meter transfer approved & updated account ID generated within 3 working days.'
    ],
    obstacleSolutions: {
      'No Lease Agreement yet': 'Acceptable alternative: Owner Occupancy NOC letter + Landlord Electricity Bill copy.'
    },
    hasMockPayment: true,
    mockBill: { billNo: 'ELC-2026-8819', amount: 840, dueDate: '2026-09-30', status: 'Pending' }
  },
  {
    id: 'municipal-water-connection',
    name: 'Water & Sewerage Connection Relocation / Payment',
    category: 'Municipal & Utilities',
    sector: 'Municipal',
    department: 'Municipal Water Supply & Sewerage Board (BWSSB / HMWS&SB)',
    officialUrl: 'https://bwssb.karnataka.gov.in/',
    lastVerified: '2026-09-18',
    verifiedSource: 'Municipal Corporation Portal',
    dataOwner: 'City Municipal Water Board',
    confidenceScore: 99,
    shortDescription: 'Apply for fresh domestic water connection or transfer water meter address.',
    description: 'Provides online utility registration, monthly meter reading lookup, address update, and bill payment services for urban residents.',
    eligibility: { state: 'All India' },
    benefits: 'Clean drinking water supply allocation + subsidized tariff rates for residential users.',
    requiredDocuments: [
      { name: 'Property Tax Receipt or Rent Agreement', mandatory: true },
      { name: 'Aadhaar Card', mandatory: true }
    ],
    applicationSteps: [
      'Submit connection update form with new property PID / house number.',
      'Attach address proof and previous water bill clearance certificate.',
      'Inspection by municipal pipeline inspector within 48 hours.',
      'Approval & digital water account issued.'
    ],
    obstacleSolutions: {
      'No Property Tax PID': 'Acceptable alternative: Municipal Khata extract copy or builder allotment letter.'
    },
    hasMockPayment: true,
    mockBill: { billNo: 'WTR-2026-4421', amount: 320, dueDate: '2026-09-27', status: 'Pending' }
  },

  // --- SECTOR 2: HEALTHCARE DISCOVERY ---
  {
    id: 'health-discovery-ayushman',
    name: 'Healthcare Discovery & Public Hospital OPD Finder',
    category: 'Healthcare Discovery',
    sector: 'Healthcare',
    department: 'National Health Authority (NHA) & State Health Dept',
    officialUrl: 'https://pmjay.gov.in/',
    lastVerified: '2026-09-21',
    verifiedSource: 'NHA Empanelled Hospital Registry',
    dataOwner: 'Ministry of Health & Family Welfare',
    confidenceScore: 100,
    shortDescription: 'Locate nearby empanelled public hospitals, check specialist OPD availability & Ayushman cashless cover.',
    description: 'Enables citizens to discover nearest government & empanelled private hospitals, book online OPD slots (e-Sanjeevani / ORS), and check ₹5 Lakh health card eligibility.',
    eligibility: { state: 'All India' },
    benefits: 'Cashless hospital admission up to ₹5 Lakh/year + free outpatient consultation booking.',
    requiredDocuments: [
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'Ayushman Bharat Card or Ration Card', mandatory: false }
    ],
    applicationSteps: [
      'Enter pin code or city to filter empanelled hospitals.',
      'Select required specialty (Cardiology, Orthopedics, Pediatrics, General Medicine).',
      'Generate e-OPD token or check bed availability.',
      'Present QR token at hospital counter for priority registration.'
    ],
    obstacleSolutions: {
      'No Ayushman Card': 'Present Aadhaar + Ration card at hospital Ayushman Mitra desk for instant e-KYC generation.'
    },
    mockHospitals: [
      { name: 'Victoria District Government Hospital', distance: '2.4 km', specialty: 'General, Cardiology, Emergency', bedsAvailable: 14, contact: '080-26701100' },
      { name: 'KC General Municipal Hospital', distance: '4.1 km', specialty: 'Pediatrics, Maternity, OPD', bedsAvailable: 8, contact: '080-23341771' }
    ]
  },

  // --- SECTOR 3: TRANSPORT SERVICES ---
  {
    id: 'transport-bus-dl-relocation',
    name: 'Transport Services & Bus Pass Renewal',
    category: 'Transport',
    sector: 'Transport',
    department: 'Road Transport Authority (RTO) & State Transport Corp (BMTC / TSRTC)',
    officialUrl: 'https://parivahan.gov.in/',
    lastVerified: '2026-09-17',
    verifiedSource: 'Parivahan Sewa Official Portal',
    dataOwner: 'Ministry of Road Transport and Highways',
    confidenceScore: 98,
    shortDescription: 'Renew student/commuter bus passes and update driving license & vehicle address upon relocation.',
    description: 'Unified transport navigation allowing citizens to manage monthly bus passes, submit RTO address updates (Form 33), and track transport applications.',
    eligibility: { state: 'All India' },
    benefits: 'Discounted monthly public transport pass + legal compliance for vehicle registration.',
    requiredDocuments: [
      { name: 'Updated Address Proof (Aadhaar / Rent Agreement)', mandatory: true },
      { name: 'Existing Driving License or Smart Card Number', mandatory: true },
      { name: 'Passport Size Photograph', mandatory: true }
    ],
    applicationSteps: [
      'Select RTO Transport Service -> Address Change or Bus Pass Renewal.',
      'Enter DL / RC number and new residential pin code.',
      'Upload updated Aadhaar address proof.',
      'Pay fee online (₹200) and download digital pass / updated RC acknowledgment.'
    ],
    obstacleSolutions: {
      'DL Address Mismatch': 'Submit online Form 33 on Parivahan portal using updated Aadhaar OTP verification.'
    },
    hasMockPayment: true,
    mockBill: { billNo: 'BUS-PASS-2026-102', amount: 450, dueDate: '2026-10-05', status: 'Pending' }
  },

  // --- SECTOR 4: BANKING & FINANCIAL ASSISTANCE ---
  {
    id: 'banking-dbt-pension',
    name: 'Banking Assistance & Aadhaar Direct Benefit Linkage',
    category: 'Banking & Financial Assistance',
    sector: 'Banking & Finance',
    department: 'National Payments Corporation of India (NPCI) & Lead District Banks',
    officialUrl: 'https://www.npci.org.in/',
    lastVerified: '2026-09-19',
    verifiedSource: 'NPCI Aadhaar Seeding Portal',
    dataOwner: 'Department of Financial Services / RBI',
    confidenceScore: 99,
    shortDescription: 'Link bank account with Aadhaar for government pensions, DBT subsidies, and PM SVANidhi micro-credit.',
    description: 'Guides citizens through zero-balance Jan Dhan account setup, NPCI Aadhaar seeding verification, and government credit subsidy discovery without real money transfer risk.',
    eligibility: { state: 'All India' },
    benefits: 'Guaranteed credit of government welfare subsidies, pensions, and interest-subsidized micro-loans.',
    requiredDocuments: [
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'Active Mobile Number linked with Aadhaar', mandatory: true },
      { name: 'Bank Account Passbook Copy', mandatory: true }
    ],
    applicationSteps: [
      'Check NPCI Aadhaar bank seeding status online.',
      'If unlinked, submit bank e-mandate form or visit post office for IPPB instant account.',
      'Verify biometric / OTP authentication.',
      'DBT status activated for all central & state schemes.'
    ],
    obstacleSolutions: {
      'No Bank Account': 'Open zero-balance India Post Payments Bank (IPPB) account in 10 minutes at post office with Aadhaar.'
    }
  },

  // --- EXISTING SCHEMES ---
  {
    id: 'ignoaps-pension',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    category: 'Senior Citizen Care',
    sector: 'Social Welfare',
    department: 'Ministry of Rural Development / Social Welfare',
    officialUrl: 'https://nsap.nic.in/',
    lastVerified: '2026-09-15',
    verifiedSource: 'NSAP Official Portal (nsap.nic.in)',
    dataOwner: 'National Social Assistance Programme',
    confidenceScore: 99,
    shortDescription: 'Monthly financial assistance pension for senior citizens aged 60+ belonging to BPL families.',
    description: 'Provides monthly cash assistance directly transferred to bank accounts for eligible senior citizens to ensure basic social security.',
    eligibility: { minAge: 60, incomeCategory: 'BPL', state: 'All India' },
    benefits: '₹200 - ₹500/month (Central share) + State contribution (up to ₹2,500 total).',
    requiredDocuments: [
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'Age Proof (Birth Cert / Voter ID)', mandatory: true },
      { name: 'BPL Ration Card or Certificate', mandatory: true },
      { name: 'Active Bank Passbook', mandatory: true }
    ],
    applicationSteps: [
      'Obtain application form from local Gram Panchayat or Social Welfare Office.',
      'Attach Aadhaar, BPL Card, Age Proof, and Bank details.',
      'Verification by Municipal Inspector.',
      'Sanction order issued and monthly pension credited via DBT.'
    ],
    obstacleSolutions: {
      'No BPL Card': 'Acceptable alternative: Income Certificate issued by Tehsildar showing annual family income below state BPL limit.'
    }
  }
];
