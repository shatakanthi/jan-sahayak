// Hero Feature: Obstacle Resolver Matrix (Missing Document Alternative Guidance)
export const OBSTACLE_MATRIX = [
  {
    missingDocId: 'no-address-proof',
    missingDocName: 'Address Proof (Utility Bill / Rent Agreement Missing)',
    impactedServices: ['Aadhaar Address Update', 'Ration Card Transfer', 'Voter ID Relocation', 'Passport Application', 'Bank Account Opening'],
    whyRequired: 'Government agencies require verified physical residence proof to prevent identity fraud and ensure localized benefits reach genuine residents.',
    acceptableAlternatives: [
      {
        name: 'Head of Family (HOF) Aadhaar Consent',
        description: 'If staying with family or relatives, the Head of Family can provide online consent on MyAadhaar using OTP.',
        acquisitionDifficulty: 'Instant (Online)',
        authority: 'UIDAI',
        steps: ['Log into MyAadhaar portal', 'Select Update Address -> Head of Family (HOF) option', 'Enter HOF Aadhaar number', 'HOF receives SMS approval link and approves via OTP']
      },
      {
        name: 'Bank Passbook with Photo & Seal',
        description: 'Scheduled Bank / Post Office Passbook with applicant photo, printed current address, and official bank branch stamp.',
        acquisitionDifficulty: '1 Day',
        authority: 'Public / Private Bank / India Post',
        steps: ['Visit home bank branch with request letter', 'Update address in bank records using manager declaration', 'Get passbook printed with new address and stamped']
      },
      {
        name: 'Employer Certificate on Official Letterhead',
        description: 'Certificate from recognized Private/Public PSU Employer certifying current residence address of employee.',
        acquisitionDifficulty: '1-2 Days',
        authority: 'Employer HR / Administration',
        steps: ['Request HR for Address Certification Letter on company letterhead', 'Ensure HR head seal and official signature are present']
      },
      {
        name: 'Post Office Address Certificate / Village Panchayat Certificate',
        description: 'Certificate signed by Village Development Officer (VDO) / Sarpanch or Postmaster.',
        acquisitionDifficulty: '1 Day',
        authority: 'Local Panchayat / Post Office',
        steps: ['Fill Panchayat verification form', 'Obtain Sarpanch signature and official rubber stamp']
      }
    ]
  },
  {
    missingDocId: 'no-income-cert',
    missingDocName: 'Income Certificate Expired or Not Available',
    impactedServices: ['Post-Matric Scholarship', 'Old Age Pension', 'EWS Quota Application', 'Free Healthcare Cards'],
    whyRequired: 'Income validation ensures welfare subsidies reach citizens under prescribed economic thresholds.',
    acceptableAlternatives: [
      {
        name: 'Tehsildar Salary / Land Income Receipt',
        description: 'Recent land revenue tax receipt or Form 16 / ITR acknowledgment from Income Tax Dept.',
        acquisitionDifficulty: 'Instant (if ITR filed)',
        authority: 'IT Dept / Land Revenue',
        steps: ['Download Form 16 / ITR V from e-filing portal or obtain BPL ration card copy']
      },
      {
        name: 'Self-Affidavit + Tehsildar E-District Receipt',
        description: 'Notarized affidavit on ₹20/₹50 stamp paper stating family income + online application acknowledgement slip.',
        acquisitionDifficulty: 'Same Day',
        authority: 'Notary Public / E-District Portal',
        steps: ['Draft affidavit at notary counter', 'Apply for fresh income certificate on E-District portal', 'Use acknowledgement receipt as interim proof']
      }
    ]
  },
  {
    missingDocId: 'name-mismatch',
    missingDocName: 'Name Mismatch between Aadhaar & Marksheet / Documents',
    impactedServices: ['Scholarship Application', 'PM-KISAN Disbursement', 'Bank DBT Credit', 'Passport'],
    whyRequired: 'Automated Direct Benefit Transfer (DBT) systems reject payments if character-by-character name matching fails.',
    acceptableAlternatives: [
      {
        name: 'Gazette Notification / Gazette Gazette Affidavit',
        description: 'Official Name Change Affidavit notarized + Gazette Publication (or Newspaper advertisement).',
        acquisitionDifficulty: '2-3 Days',
        authority: 'State Govt Gazette / Notary',
        steps: ['Draft Name Spelling Clarification Affidavit', 'Get notarized by First Class Magistrate or Notary', 'Upload affidavit copy to portal']
      },
      {
        name: 'MyAadhaar Name Correction (Demographic Update)',
        description: 'Online update of name spelling on Aadhaar using 10th marksheet or Passport.',
        acquisitionDifficulty: '3-5 Days (Online)',
        authority: 'UIDAI',
        steps: ['Go to myaadhaar.uidai.gov.in', 'Select Name Update', 'Upload scanned 10th Marksheet or Voter ID', 'Pay ₹50 fee']
      }
    ]
  },
  {
    missingDocId: 'no-bank-dbt',
    missingDocName: 'Bank Account Not Linked / Seeded with Aadhaar (DBT Failure)',
    impactedServices: ['PM-KISAN', 'Scholarships', 'PMMVY Maternity Subsidy', 'Pensions'],
    whyRequired: 'Government payments use Aadhaar Payment Bridge System (APBS) which requires explicit NPCI bank account mapping.',
    acceptableAlternatives: [
      {
        name: 'Instant Post Office IPPB Aadhaar Seeded Account',
        description: 'Open a digital India Post Payments Bank (IPPB) account in 10 minutes at any local postman / post office with biometric Aadhaar seeding.',
        acquisitionDifficulty: '10 Minutes',
        authority: 'India Post Payments Bank',
        steps: ['Visit nearest Post Office or call door-step postman', 'Provide Aadhaar & Biometric fingerprint', 'Request immediate NPCI Aadhaar seeding']
      }
    ]
  }
];
