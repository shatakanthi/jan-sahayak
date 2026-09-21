import { VERIFIED_SCHEMES } from '../data/verifiedSchemes';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Searches for relevant government & commercial tertiary services based on citizen problem statement
 */
export async function searchCitizenProblem(userProblem, profileContext = {}, apiKey = '') {
  const storedKey = apiKey || localStorage.getItem('gemini_api_key') || '';

  if (storedKey && storedKey.trim() !== '') {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${storedKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are the AI engine for "Unified Citizen Service Navigator".
Citizen Query: "${userProblem}"
Context: ${JSON.stringify(profileContext)}

Rules:
1. Base answers on verified Indian Public & Commercial tertiary services across Municipal, Utilities, Healthcare, Transport, and Banking.
2. Return ONLY JSON matching this structure:
{
  "problemSummary": "Parsed understanding of needs",
  "isHeroUseCase": true/false,
  "matchedSchemes": [
    {
      "id": "scheme-id",
      "name": "Service Name",
      "category": "Municipal & Utilities / Healthcare / Transport / Banking",
      "department": "Department / Provider Name",
      "officialUrl": "https://...",
      "verifiedSource": "Official Source Name",
      "dataOwner": "Data Owner Dept",
      "confidenceScore": 99,
      "shortDescription": "Brief description",
      "requiredDocuments": ["Doc 1", "Doc 2"],
      "applicationSteps": ["Step 1", "Step 2"],
      "potentialObstacle": "Missing document issue",
      "alternativeSolution": "How to resolve"
    }
  ],
  "crossDepartmentBundle": ["Discom", "Municipal Water", "RTO Transport", "Bank"],
  "journeySteps": [
    {"stage": "Problem Identified", "detail": "..."},
    {"stage": "Prerequisites Audit", "detail": "..."},
    {"stage": "Document Checklist", "detail": "..."},
    {"stage": "Simulated Application", "detail": "..."},
    {"stage": "Application Tracking", "detail": "..."}
  ]
}`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          const parsed = JSON.parse(textResponse);
          return { ...parsed, isAiGenerated: true, source: 'Google Gemini 1.5 Flash' };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, using RAG Rule Engine:", err);
    }
  }

  // --- RAG RULE ENGINE FALLBACK ---
  const lowerQuery = userProblem.toLowerCase();
  
  // HERO USE CASE DETECTION: "Moving to a new house"
  const isMovingHouse = lowerQuery.includes('move') || lowerQuery.includes('moved') || lowerQuery.includes('house') || lowerQuery.includes('shift') || lowerQuery.includes('new city') || lowerQuery.includes('relocat');

  let matches = [];

  if (isMovingHouse) {
    // Bundle Utilities + Municipal Water + Transport DL + Banking
    matches = VERIFIED_SCHEMES.filter(s => 
      s.id === 'utility-elec-transfer' || 
      s.id === 'municipal-water-connection' || 
      s.id === 'transport-bus-dl-relocation' || 
      s.id === 'banking-dbt-pension'
    );
  } else {
    matches = VERIFIED_SCHEMES.filter(scheme => {
      const textToSearch = `${scheme.name} ${scheme.category} ${scheme.shortDescription} ${scheme.description} ${scheme.department}`.toLowerCase();
      return textToSearch.split(' ').some(word => word.length > 3 && lowerQuery.includes(word));
    });

    if (matches.length === 0) {
      matches = [VERIFIED_SCHEMES[0], VERIFIED_SCHEMES[2], VERIFIED_SCHEMES[3]];
    }
  }

  return {
    isAiGenerated: false,
    source: 'Verified Knowledge Base (Grounding RAG Engine)',
    isHeroUseCase: isMovingHouse,
    problemSummary: isMovingHouse 
      ? 'Hero Demonstration Journey: Multi-Sector Relocation Package (Utilities + Municipal + Transport + Banking)' 
      : `Identified service needs for: "${userProblem}"`,
    matchedSchemes: matches.map(m => ({
      ...m,
      requiredDocuments: m.requiredDocuments.map(d => typeof d === 'string' ? d : d.name),
      potentialObstacle: m.obstacleSolutions ? Object.keys(m.obstacleSolutions)[0] : 'Missing Address Proof',
      alternativeSolution: m.obstacleSolutions ? Object.values(m.obstacleSolutions)[0] : 'Use Bank Passbook or HOF Consent'
    })),
    crossDepartmentBundle: ['State Electricity Discom', 'City Water Supply Board', 'RTO Transport Authority', 'NPCI Banking Portal'],
    journeySteps: [
      { stage: '1. Citizen Query', detail: `Analyzed natural language input: "${userProblem}"` },
      { stage: '2. Multi-Sector Routing', detail: `Identified ${matches.length} cross-sector services (Utilities, Municipal, Transport, Banking)` },
      { stage: '3. Prerequisites & Docs', detail: `Checked mandatory identity & lease agreement requirements` },
      { stage: '4. Obstacle Resolver', detail: `Active fallback guidance provided for missing lease/address proof` },
      { stage: '5. Simulated Submission', detail: `1-Click submission generates instant Application Ref ID` },
      { stage: '6. Unified Tracking', detail: `Status live on Citizen Dashboard` }
    ]
  };
}
