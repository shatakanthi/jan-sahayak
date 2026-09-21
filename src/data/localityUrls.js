// Dynamic Locality-Aware Redirect Portal Mappings
export const LOCALITY_PORTALS = {
  'bangalore-urban': {
    name: 'Bangalore Urban (Karnataka)',
    electricity: { name: 'BESCOM Karnataka', url: 'https://bescom.karnataka.gov.in/' },
    water: { name: 'BWSSB Bangalore Water Board', url: 'https://bwssb.karnataka.gov.in/' },
    municipal: { name: 'BBMP / Seva Sindhu Karnataka', url: 'https://sevasindhu.karnataka.gov.in/' },
    transport: { name: 'Karnataka RTO / BMTC', url: 'https://transport.karnataka.gov.in/' },
    certificates: { name: 'E-District Karnataka Seva Sindhu', url: 'https://sevasindhuservices.karnataka.gov.in/' }
  },
  'hyderabad-ts': {
    name: 'Hyderabad Metro (Telangana)',
    electricity: { name: 'TSSPDCL Telangana Power', url: 'https://www.tssouthernpower.com/' },
    water: { name: 'HMWS&SB Hyderabad Water', url: 'https://www.hyderabadwater.gov.in/' },
    municipal: { name: 'GHMC / MeeSeva Telangana', url: 'https://ts.meeseva.telangana.gov.in/' },
    transport: { name: 'Telangana RTO / TSRTC', url: 'https://transport.telangana.gov.in/' },
    certificates: { name: 'MeeSeva Telangana Portal', url: 'https://ts.meeseva.telangana.gov.in/' }
  },
  'delhi-ncr': {
    name: 'Delhi NCR Region',
    electricity: { name: 'BSES Rajdhani / Yamuna Power', url: 'https://www.bsesdelhi.com/' },
    water: { name: 'Delhi Jal Board (DJB)', url: 'https://delhijalboard.delhi.gov.in/' },
    municipal: { name: 'MCD / e-District Delhi', url: 'https://edistrict.delhigovt.nic.in/' },
    transport: { name: 'Delhi Transport Dept / DTC', url: 'https://transport.delhi.gov.in/' },
    certificates: { name: 'e-District Delhi Portal', url: 'https://edistrict.delhigovt.nic.in/' }
  },
  'chennai-tn': {
    name: 'Chennai Metropolitan (Tamil Nadu)',
    electricity: { name: 'TANGEDCO Tamil Nadu', url: 'https://www.tangedco.gov.in/' },
    water: { name: 'CMWSSB Chennai Metrowater', url: 'https://chennaimetrowater.tn.gov.in/' },
    municipal: { name: 'GCC / TN e-Sevai', url: 'https://www.tnesevai.tn.gov.in/' },
    transport: { name: 'Tamil Nadu Transport Dept', url: 'https://tnsta.gov.in/' },
    certificates: { name: 'TN e-Sevai Portal', url: 'https://www.tnesevai.tn.gov.in/' }
  },
  'mumbai-mh': {
    name: 'Mumbai Metropolitan (Maharashtra)',
    electricity: { name: 'BEST Undertaking / Adani Power', url: 'https://www.bestundertaking.net/' },
    water: { name: 'BMC Municipal Water Dept', url: 'https://portal.mcgm.gov.in/' },
    municipal: { name: 'BMC / Aaple Sarkar Maharashtra', url: 'https://aaplesarkar.mahaonline.gov.in/' },
    transport: { name: 'Maharashtra RTO / MSRTC', url: 'https://transport.maharashtra.gov.in/' },
    certificates: { name: 'Aaple Sarkar Maharashtra', url: 'https://aaplesarkar.mahaonline.gov.in/' }
  },
  'all': {
    name: 'All India / Universal National Portals',
    electricity: { name: 'National Power Portal', url: 'https://npp.gov.in/' },
    water: { name: 'Jal Jeevan Mission National Portal', url: 'https://jaljeevanmission.gov.in/' },
    municipal: { name: 'National Single Window System', url: 'https://www.nsws.gov.in/' },
    transport: { name: 'Parivahan Sewa National Portal', url: 'https://parivahan.gov.in/' },
    certificates: { name: 'National Government Services Portal', url: 'https://services.india.gov.in/' }
  }
};

/**
 * Returns dynamic redirect portal URL based on service type and selected locality
 */
export function getLocalityPortal(serviceType, localityId = 'bangalore-urban') {
  const locMap = LOCALITY_PORTALS[localityId] || LOCALITY_PORTALS['bangalore-urban'];
  if (serviceType === 'electricity' || serviceType === 'Utilities') return locMap.electricity;
  if (serviceType === 'water' || serviceType === 'Municipal') return locMap.water;
  if (serviceType === 'transport' || serviceType === 'Transport') return locMap.transport;
  if (serviceType === 'certificates') return locMap.certificates;
  return locMap.municipal;
}
