// Locality & Regional Provider Data with Municipal Commission & Corporator Contacts
export const LOCALITIES = [
  { 
    id: 'all', 
    name: 'All India / Universal', 
    state: 'Pan India', 
    discom: 'Universal Discom', 
    waterBoard: 'Universal Water Board',
    commissioner: { name: 'Shri K. Vijay Kumar, IAS', title: 'Director General of Municipal Administration', phone: '011-23061200', email: 'dg.municipal@gov.in' },
    corporator: { name: 'Smt. Anitha Sharma', title: 'State Municipal Federation President', phone: '+91 98765 43210', ward: 'Universal Ward 01' },
    sarpanch: { name: 'Shri Rajeshwar Rao', title: 'National Panchayat Association President', phone: '+91 98480 11223' },
    wardOfficer: { name: 'Shri M. N. Shastri', phone: '1800-425-1912', office: 'Central Citizen Redressal Hub' }
  },
  { 
    id: 'bangalore-urban', 
    name: 'Bangalore Urban (Karnataka)', 
    state: 'Karnataka', 
    discom: 'BESCOM Electricity Board', 
    waterBoard: 'BWSSB Water Board',
    commissioner: { name: 'Tushar Giri Nath, IAS', title: 'BBMP Chief Commissioner', phone: '080-22221286', email: 'commissioner@bbmp.gov.in' },
    corporator: { name: 'Shri N. R. Ramesh', title: 'Area Ward Corporator / Councillor', phone: '+91 94480 55112', ward: 'Ward 152 (Shanthi Nagar / Urban)' },
    sarpanch: { name: 'Smt. Sunitha Gowda', title: 'Gram Panchayat President / Sarpanch', phone: '+91 98451 22334' },
    wardOfficer: { name: 'K. R. Venkatesh', phone: '080-22660000', office: 'BBMP Joint Commissioner Office, Subhasnagar' }
  },
  { 
    id: 'hyderabad-ts', 
    name: 'Hyderabad Metro (Telangana)', 
    state: 'Telangana', 
    discom: 'TSSPDCL Discom', 
    waterBoard: 'HMWS&SB Water Board',
    commissioner: { name: 'K. Amrapali, IAS', title: 'GHMC Municipal Commissioner', phone: '040-23224734', email: 'comm-ghmc@telangana.gov.in' },
    corporator: { name: 'Shri V. Ramachandra', title: 'GHMC Ward Corporator', phone: '+91 98490 12345', ward: 'Ward 94 (Banjara Hills / Jubilee)' },
    sarpanch: { name: 'Shri M. Yadaiah', title: 'Mandal Parishad President', phone: '+91 99890 54321' },
    wardOfficer: { name: 'P. Srinivas Rao', phone: '040-21111111', office: 'GHMC Circle Office 10, Khairatabad' }
  },
  { 
    id: 'delhi-ncr', 
    name: 'Delhi NCR Region', 
    state: 'Delhi NCR', 
    discom: 'BSES Rajdhani Power', 
    waterBoard: 'Delhi Jal Board (DJB)',
    commissioner: { name: 'Ashwani Kumar, IAS', title: 'MCD Municipal Commissioner', phone: '011-23225201', email: 'commissioner@mcd.nic.in' },
    corporator: { name: 'Smt. Shelly Oberoi', title: 'MCD Mayor & Ward Representative', phone: '+91 98110 33445', ward: 'Ward 86 (Central Delhi)' },
    sarpanch: { name: 'Shri Balbir Singh', title: 'Rural Dehat Panchayat Pradhan', phone: '+91 98101 77665' },
    wardOfficer: { name: 'R. K. Malhotra', phone: '011-23370000', office: 'MCD Zonal Civic Centre, Minto Road' }
  },
  { 
    id: 'chennai-tn', 
    name: 'Chennai Metropolitan (Tamil Nadu)', 
    state: 'Tamil Nadu', 
    discom: 'TANGEDCO Electricity', 
    waterBoard: 'CMWSSB Water Board',
    commissioner: { name: 'J. Kumaragurubaran, IAS', title: 'GCC Greater Chennai Commissioner', phone: '044-25619200', email: 'commissioner@chennaicorporation.gov.in' },
    corporator: { name: 'Smt. R. Priya', title: 'GCC Worshipful Mayor & Councillor', phone: '+91 94440 12121', ward: 'Ward 74 (Royapettah / Mylapore)' },
    sarpanch: { name: 'Shri K. Murugan', title: 'Panchayat Union Chairman', phone: '+91 94431 88990' },
    wardOfficer: { name: 'S. Selvakumar', phone: '044-25384520', office: 'Ripon Building Zonal Office, Park Town' }
  },
  { 
    id: 'mumbai-mh', 
    name: 'Mumbai Metropolitan (Maharashtra)', 
    state: 'Maharashtra', 
    discom: 'BEST / Adani Electricity', 
    waterBoard: 'BMC Water Dept',
    commissioner: { name: 'Bhushan Gagrani, IAS', title: 'BMC Municipal Commissioner', phone: '022-22620525', email: 'mc@mcgm.gov.in' },
    corporator: { name: 'Shri Makarand Narwekar', title: 'BMC Ward Corporator', phone: '+91 98200 44556', ward: 'Ward 226 (Colaba / Nariman Point)' },
    sarpanch: { name: 'Shri Prakash Patil', title: 'Zilla Parishad Administrator', phone: '+91 98211 99887' },
    wardOfficer: { name: 'A. H. Deshmukh', phone: '022-22700000', office: 'BMC A-Ward Zonal HQ, Fort' }
  }
];
