// Mock Citizen Account Profile & Dashboard Data
export const MOCK_CITIZEN_ACCOUNT = {
  citizenId: 'CITIZEN-KA-2026-99182',
  name: 'Rajesh Kumar',
  age: 42,
  city: 'Bangalore, Karnataka',
  pinCode: '560001',
  incomeCategory: 'Low Income (< ₹2.5L/yr)',
  occupation: 'Salaried / Commuter',
  aadhaarStatus: 'Verified (Aadhaar Seeded)',
  
  savedServices: [
    { id: 'utility-elec-transfer', name: 'Electricity Connection Address Transfer', category: 'Municipal & Utilities' },
    { id: 'transport-bus-dl-relocation', name: 'Transport Services & Bus Pass Renewal', category: 'Transport' }
  ],

  activeApplications: [
    {
      appId: 'BESCOM-RELOC-2026-941',
      serviceName: 'Electricity Connection Address Transfer',
      sector: 'Utilities',
      appliedDate: '2026-09-19',
      currentStage: 'Junior Engineer Site Verification',
      estimatedCompletion: '2026-09-24',
      status: 'In Progress'
    },
    {
      appId: 'RTO-FORM33-2026-118',
      serviceName: 'Driving License Address Change (Form 33)',
      sector: 'Transport',
      appliedDate: '2026-09-15',
      currentStage: 'Aadhaar Address Verification Approved',
      estimatedCompletion: '2026-09-22',
      status: 'Approved'
    }
  ],

  pendingBills: [
    { billId: 'ELC-2026-8819', title: 'Monthly Electricity Bill (BESCOM)', amount: 840, dueDate: '2026-09-30', provider: 'State Discom' },
    { billId: 'WTR-2026-4421', title: 'Water Tariff Bill (BWSSB)', amount: 320, dueDate: '2026-09-27', provider: 'City Water Board' }
  ],

  transactionReceipts: [
    { receiptNo: 'RCP-2026-9912', service: 'Bus Pass Monthly Renewal', amount: 450, date: '2026-09-01', status: 'Success (Simulated)' }
  ]
};
