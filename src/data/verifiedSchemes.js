// Expanded Cross-Sector Verified Services Database (Municipal, Utilities, Healthcare, Transport, Banking & Schemes)
export const VERIFIED_SCHEMES = [
  // --- SECTOR 1: EDUCATION SERVICES ---
  {
    id: 'edu-scholarship-csis',
    name: 'Central Sector Interest Subsidy (CSIS) & Higher Education Scholarship',
    category: 'Education Services',
    sector: 'Education',
    department: 'Ministry of Education / Department of Higher Education',
    officialUrl: 'https://www.education.gov.in/',
    lastVerified: '2026-09-20',
    verifiedSource: 'National Scholarship Portal (scholarships.gov.in)',
    dataOwner: 'Department of Higher Education',
    confidenceScore: 100,
    shortDescription: 'Full interest subsidy on education loans for economically weaker section students.',
    description: 'Provides 100% interest subsidy during the moratorium period on education loans taken for professional courses in accredited Indian institutions.',
    eligibility: { incomeCategory: '< ₹4.5L/yr', state: 'All India' },
    benefits: 'Complete waiver of education loan interest during study + moratorium period.',
    requiredDocuments: [
      { name: 'Income Certificate (Family annual income < ₹4.5 Lakhs)', mandatory: true },
      { name: 'Aadhaar Card of Student', mandatory: true },
      { name: 'Admission Offer Letter & Fee Receipt', mandatory: true },
      { name: 'Bank Education Loan Sanction Letter', mandatory: true }
    ],
    applicationSteps: [
      'Apply online via National Scholarship Portal or Canara Bank CSIS Portal.',
      'Submit family income certificate issued by competent authority.',
      'Institution verifies enrollment details.',
      'Interest subsidy credited directly to education loan account.'
    ],
    obstacleSolutions: {
      'No Income Certificate': 'Apply online via Seva Sindhu / e-District portal using Aadhaar & Ration Card.'
    }
  },

  // --- SECTOR 2: HEALTHCARE SERVICES ---
  {
    id: 'health-discovery-ayushman',
    name: 'Ayushman Bharat PM-JAY & Public Hospital OPD Finder',
    category: 'Healthcare Services',
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
    }
  },

  // --- SECTOR 3: EMPLOYMENT SERVICES ---
  {
    id: 'emp-pmkvy-skills',
    name: 'PM Kaushal Vikas Yojana (PMKVY) & Skill Certification',
    category: 'Employment Services',
    sector: 'Employment',
    department: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
    officialUrl: 'https://www.pmkvyofficial.org/',
    lastVerified: '2026-09-19',
    verifiedSource: 'Skill India Digital Hub',
    dataOwner: 'NSDC / Skill India',
    confidenceScore: 99,
    shortDescription: 'Free industry-aligned skill training, monetary reward & job placement assistance.',
    description: 'Provides free short-term skill training, assessment, and government certification across IT, Healthcare, Manufacturing, and Electronics sectors.',
    eligibility: { state: 'All India' },
    benefits: 'Free course training + NSQF Certification + ₹8,000 stipend & placement support.',
    requiredDocuments: [
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'Bank Account Passbook (DBT Linked)', mandatory: true },
      { name: '10th / 12th Pass Marksheet (Optional)', mandatory: false }
    ],
    applicationSteps: [
      'Register on Skill India Digital Portal.',
      'Choose preferred job role and nearby empanelled Skill Development Centre.',
      'Complete training and pass practical assessment.',
      'Receive digital Skill Card & placement interview calls.'
    ],
    obstacleSolutions: {
      'No Marksheet': 'Enroll under Recognition of Prior Learning (RPL) based on existing practical work experience.'
    }
  },

  // --- SECTOR 4: HOUSING & UTILITY SERVICES ---
  {
    id: 'utility-elec-transfer',
    name: 'Electricity Connection Address Transfer & Bill Payment',
    category: 'Housing & Utility Services',
    sector: 'Utilities',
    department: 'State Electricity Distribution Corporation (Discom / BESCOM / TSSPDCL)',
    officialUrl: 'https://bescom.karnataka.gov.in/',
    lastVerified: '2026-09-20',
    verifiedSource: 'State Electricity Regulatory Portal',
    dataOwner: 'Department of Energy & Discoms',
    confidenceScore: 100,
    shortDescription: 'Transfer or relocate active domestic electricity meter connection to new address.',
    description: 'Enables registered consumers to shift electricity service connection, update consumer billing address, or transfer meter ownership upon moving home.',
    eligibility: { location: 'Urban & Rural Discom jurisdiction', state: 'All India' },
    benefits: 'Seamless meter transfer without security deposit penalty + online billing continuity.',
    requiredDocuments: [
      { name: 'Proof of New Address (Registered Lease / Sale Deed)', mandatory: true },
      { name: 'Existing Consumer RR / Account ID', mandatory: true },
      { name: 'Aadhaar Card of Account Holder', mandatory: true }
    ],
    applicationSteps: [
      'Log into Discom Consumer Portal.',
      'Enter Existing Consumer Account ID & new premises address details.',
      'Upload Lease/Sale agreement copy and Aadhaar identity proof.',
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
    name: 'Water & Sewerage Connection Relocation',
    category: 'Housing & Utility Services',
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

  // --- SECTOR 5: AGRICULTURE SERVICES ---
  {
    id: 'agri-pmkisan-kcc',
    name: 'PM-KISAN Direct Income Support & Kisan Credit Card (KCC)',
    category: 'Agriculture Services',
    sector: 'Agriculture',
    department: 'Ministry of Agriculture & Farmers Welfare',
    officialUrl: 'https://pmkisan.gov.in/',
    lastVerified: '2026-09-21',
    verifiedSource: 'PM-KISAN Portal',
    dataOwner: 'Dept of Agriculture & Cooperation',
    confidenceScore: 100,
    shortDescription: '₹6,000/year direct financial support + low-interest crop loan facility.',
    description: 'Transfers ₹6,000 annually in 3 equal installments directly to land-holding farmer bank accounts + subsidized Kisan Credit Card loan.',
    eligibility: { state: 'All India' },
    benefits: '₹6,000/yr cash support + 4% effective interest rate on crop credit up to ₹3 Lakhs.',
    requiredDocuments: [
      { name: 'Land Record Ownership Document (RTC / Pahani / RoR)', mandatory: true },
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'DBT Enabled Bank Account Passbook', mandatory: true }
    ],
    applicationSteps: [
      'Self-register on PM-KISAN Portal using Aadhaar.',
      'Enter land ownership details and survey number.',
      'Tehsildar verifies land records digitally.',
      'Direct Benefit Transfer (DBT) credited every 4 months.'
    ],
    obstacleSolutions: {
      'Land Record Mismatch': 'Update Aadhaar e-KYC on PM-KISAN portal or approach local Revenue Inspector.'
    }
  },

  // --- SECTOR 6: WOMEN & CHILD SERVICES ---
  {
    id: 'women-pmmvy-sukanya',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    category: 'Women & Child Services',
    sector: 'Social Security',
    department: 'Ministry of Women and Child Development',
    officialUrl: 'https://pmmvy.wcd.gov.in/',
    lastVerified: '2026-09-18',
    verifiedSource: 'WCD PMMVY Portal',
    dataOwner: 'Department of Women & Child Development',
    confidenceScore: 99,
    shortDescription: 'Direct cash incentive of ₹5,000 for pregnant women & lactating mothers.',
    description: 'Provides financial compensation for wage loss during maternity and encourages health-seeking behavior during pregnancy and child immunization.',
    eligibility: { state: 'All India' },
    benefits: '₹5,000 in direct bank transfers + free nutritional counseling at Anganwadi.',
    requiredDocuments: [
      { name: 'Mother Aadhaar Card & Joint Bank Passbook', mandatory: true },
      { name: 'Mother-Child Protection (MCP) Card / ANC Registration', mandatory: true }
    ],
    applicationSteps: [
      'Register at nearest Anganwadi Centre or PMMVY online portal.',
      'Submit MCP card details and proof of ANC checkup.',
      'Installment credited directly to Aadhaar linked bank account.'
    ],
    obstacleSolutions: {
      'No MCP Card': 'Obtain free MCP card registration at any Primary Health Centre (PHC).'
    }
  },

  // --- SECTOR 7: SENIOR CITIZEN SERVICES ---
  {
    id: 'ignoaps-pension',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    category: 'Senior Citizen Services',
    sector: 'Social Welfare',
    department: 'Ministry of Rural Development / Social Welfare',
    officialUrl: 'https://nsap.nic.in/',
    lastVerified: '2026-09-15',
    verifiedSource: 'NSAP Official Portal (nsap.nic.in)',
    dataOwner: 'National Social Assistance Programme',
    confidenceScore: 99,
    shortDescription: 'Monthly financial assistance pension for senior citizens aged 60+.',
    description: 'Provides monthly cash assistance directly transferred to bank accounts for eligible senior citizens to ensure social security.',
    eligibility: { minAge: 60, state: 'All India' },
    benefits: 'Up to ₹2,500/month combined pension.',
    requiredDocuments: [
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'Age Proof (Birth Cert / Voter ID / Aadhaar)', mandatory: true },
      { name: 'Active Bank Passbook', mandatory: true }
    ],
    applicationSteps: [
      'Apply online via Seva Sindhu / e-District portal or local Social Welfare Office.',
      'Attach Aadhaar, Age Proof, and Bank details.',
      'Verification by Municipal Inspector.',
      'Sanction order issued and monthly pension credited via DBT.'
    ],
    obstacleSolutions: {
      'No BPL Card': 'Income certificate issued by Tehsildar accepted.'
    }
  },

  // --- SECTOR 8: DISABILITY ASSISTANCE SERVICES ---
  {
    id: 'disability-udid-aid',
    name: 'Unique Disability ID (UDID) & Assistive Device Support',
    category: 'Disability Assistance Services',
    sector: 'Social Justice',
    department: 'Department of Empowerment of Persons with Disabilities',
    officialUrl: 'https://www.swavlambancard.gov.in/',
    lastVerified: '2026-09-19',
    verifiedSource: 'Swavlamban Card Portal',
    dataOwner: 'Ministry of Social Justice and Empowerment',
    confidenceScore: 99,
    shortDescription: 'Universal Disability ID card, free assistive aids & transport concession.',
    description: 'Enables persons with disabilities to obtain a single digital UDID card for accessing government aid, free hearing aids / wheelchairs, and travel concessions.',
    eligibility: { disabilityPercent: '>= 40%', state: 'All India' },
    benefits: 'Free assistive equipment under ADIP scheme + 75% rail/bus travel concession.',
    requiredDocuments: [
      { name: 'Disability Certificate issued by Medical Board', mandatory: true },
      { name: 'Aadhaar Card', mandatory: true },
      { name: 'Passport Photograph', mandatory: true }
    ],
    applicationSteps: [
      'Apply on Swavlamban Card portal.',
      'Select nearest District Government Hospital for medical assessment.',
      'Medical Board evaluates and generates digital UDID card.',
      'UDID delivered by post + free aids allocated.'
    ],
    obstacleSolutions: {
      'No Medical Board Certificate': 'Schedule appointment at District Hospital via Swavlamban portal for free evaluation.'
    }
  }
];
