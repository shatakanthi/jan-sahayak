// Mock Interoperable Provider APIs (Demonstrating Unified Service Interoperability API Layer)
export const MOCK_PROVIDER_APIS = [
  {
    providerId: 'discom-utility-api',
    providerName: 'State Discom Electricity API',
    sector: 'Municipal & Utilities',
    endpoint: 'https://api.discom.gov.in/v1/meter-transfer',
    method: 'POST',
    dataOwner: 'State Electricity Regulatory Commission',
    status: 'ACTIVE 🟢',
    schema: {
      requestHeaders: { 'X-Unified-Citizen-ID': 'CITIZEN-KA-99182', 'Content-Type': 'application/json' },
      requestBody: {
        consumerAccountId: 'ELC-881920',
        oldPinCode: '560001',
        newPinCode: '560100',
        addressProofDocRef: 'DOC-AADHAAR-9912'
      },
      responseBody: {
        status: 'SUCCESS',
        referenceNumber: 'BESCOM-RELOC-2026-941',
        estimatedInspectionDays: 2,
        shiftingFee: 150
      }
    }
  },
  {
    providerId: 'municipal-water-api',
    providerName: 'City Water Board API',
    sector: 'Municipal & Utilities',
    endpoint: 'https://api.waterboard.gov.in/v2/bill-lookup',
    method: 'GET',
    dataOwner: 'City Municipal Water Board',
    status: 'ACTIVE 🟢',
    schema: {
      requestHeaders: { 'Authorization': 'Bearer MOCK-JWT-TOKEN' },
      requestParams: { consumerNo: 'WTR-4421' },
      responseBody: {
        consumerName: 'Rajesh Kumar',
        billAmount: 320,
        dueDate: '2026-09-27',
        paymentStatus: 'UNPAID'
      }
    }
  },
  {
    providerId: 'transport-pass-api',
    providerName: 'Parivahan Transport Service API',
    sector: 'Transport Services',
    endpoint: 'https://api.parivahan.gov.in/v1/buspass/renew',
    method: 'POST',
    dataOwner: 'Ministry of Road Transport & Highways',
    status: 'ACTIVE 🟢',
    schema: {
      requestBody: { passCategory: 'COMMUTER_MONTHLY', rtoCode: 'KA-01', aadhaarLinked: true },
      responseBody: { passNo: 'BP-2026-9921', validity: '30 Days', status: 'ISSUED' }
    }
  },
  {
    providerId: 'health-ors-api',
    providerName: 'National Health ORS Hospital API',
    sector: 'Healthcare Discovery',
    endpoint: 'https://api.ors.gov.in/v3/hospitals/opd-slot',
    method: 'GET',
    dataOwner: 'National Health Authority (NHA)',
    status: 'ACTIVE 🟢',
    schema: {
      requestParams: { pinCode: '560001', specialty: 'General' },
      responseBody: { totalHospitalsFound: 4, nearestFacility: 'Victoria Govt Hospital', availableOPDSlots: 14 }
    }
  }
];
