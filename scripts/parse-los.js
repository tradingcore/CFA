const fs = require('fs');

function parsePDF(text) {
  // Join lines that are continuations (PDF wraps at column boundaries)
  // First, normalize the text by joining broken lines
  let normalized = text
    .replace(/\r\n/g, '\n')
    .replace(/\n(\d+\s+(?:Quantitative|Economics|Financial|Corporate|Equity|Fixed|Derivatives|Alternative|Portfolio|Ethical)[^\n]*)\n/g, '\n') // Remove page headers like "2 Quantitative Methods"
    .replace(/\nLEARNING OUTCOMES\n/g, '\n');
  
  // Split into blocks by "The candidate should be able to:"
  const parts = normalized.split(/The candidate should be able to:\s*/);
  
  const topics = [];
  let currentTopic = null;
  
  // Known topic names that appear as standalone headers
  const topicNames = [
    'Quantitative Methods',
    'Economics', 
    'Financial Statement\nAnalysis',
    'Financial Statement Analysis',
    'Corporate Issuers',
    'Equity Valuation',
    'Fixed Income',
    'Derivatives',
    'Alternative Investments',
    'Portfolio Management',
    'Ethical and Professional\nStandards',
    'Ethical and Professional Standards',
  ];
  
  // First part is before any module - may contain first topic name
  // Each subsequent part starts with LOS items (□) and may end with next module/topic name
  
  for (let p = 0; p < parts.length; p++) {
    const part = parts[p].trim();
    if (!part) continue;
    
    const lines = part.split('\n').map(l => l.trim()).filter(l => l);
    
    // Extract LOS items (lines starting with □)
    // and non-LOS lines (module/topic names, or LOS continuations)
    const losItems = [];
    let currentLos = null;
    let trailingLines = [];
    let inLos = false;
    
    for (const line of lines) {
      if (line.startsWith('□')) {
        if (currentLos !== null) {
          losItems.push(currentLos.trim());
        }
        currentLos = line.replace(/^□\s*/, '');
        inLos = true;
        trailingLines = [];
      } else if (inLos && currentLos !== null) {
        // Could be LOS continuation or a new module/topic name
        // Heuristic: if the NEXT □ comes soon, this is a continuation
        // If no more □ in this part, these are trailing lines (module/topic names)
        const remainingText = lines.slice(lines.indexOf(line)).join('\n');
        if (remainingText.includes('□')) {
          // More LOS to come, this is a continuation
          currentLos += ' ' + line;
        } else {
          // No more LOS, save current and collect trailing
          if (currentLos !== null) {
            losItems.push(currentLos.trim());
            currentLos = null;
          }
          trailingLines.push(line);
          inLos = false;
        }
      } else {
        trailingLines.push(line);
      }
    }
    if (currentLos !== null) {
      losItems.push(currentLos.trim());
    }
    
    // Now process: if this is part 0, it's preamble (topic names before first module)
    if (p === 0) {
      // Find topic name
      const joined = lines.join(' ');
      for (const tn of topicNames) {
        const clean = tn.replace('\n', ' ');
        if (joined.includes(clean)) {
          currentTopic = { name: clean, modules: [] };
          topics.push(currentTopic);
          break;
        }
      }
      // The trailing lines contain the first module name
      if (trailingLines.length > 0 && currentTopic) {
        // Don't create module yet, it'll be handled in next iteration
      }
      continue;
    }
    
    // For parts after 0: losItems go to current module, trailing lines are next module/topic name
    if (currentTopic && currentTopic._pendingModule) {
      currentTopic._pendingModule.los = losItems;
      currentTopic.modules.push(currentTopic._pendingModule);
    }
    
    // Process trailing lines for next module/topic
    if (trailingLines.length > 0) {
      const trailingText = trailingLines.join(' ').trim();
      
      // Check if any trailing line is a topic header
      let foundTopic = false;
      for (const tn of topicNames) {
        const clean = tn.replace('\n', ' ');
        if (trailingText.includes(clean) || trailingLines.some(l => topicNames.map(t => t.replace('\n', ' ')).includes(l))) {
          // New topic
          currentTopic = { name: clean, modules: [], _pendingModule: null };
          topics.push(currentTopic);
          // Module name is the rest after topic name
          const afterTopic = trailingText.replace(clean, '').trim();
          if (afterTopic) {
            currentTopic._pendingModule = { name: afterTopic, los: [] };
          }
          foundTopic = true;
          break;
        }
      }
      
      if (!foundTopic && currentTopic) {
        currentTopic._pendingModule = { name: trailingText, los: [] };
      }
    }
  }
  
  // Push last pending module
  if (currentTopic && currentTopic._pendingModule) {
    // Last module has no LOS (shouldn't happen)
  }
  
  // Clean up _pendingModule
  topics.forEach(t => delete t._pendingModule);
  
  return topics;
}

// Simpler approach: regex-based parsing
function parsePDFSimple(text) {
  // Clean text
  text = text.replace(/\r\n/g, '\n');
  
  // Remove page number headers like "2 Quantitative Methods", "8 Financial Statement Analysis"
  text = text.replace(/^\d+\s+[A-Z][^\n]+$/gm, '');
  text = text.replace(/^LEARNING OUTCOMES$/gm, '');
  
  // Known topic boundaries
  const topicMarkers = [
    { marker: /^Quantitative Methods$/m, name: 'Quantitative Methods', id: 'quant', short: 'Quant', weight: '5-10%', color: '#3b82f6' },
    { marker: /^Economics$/m, name: 'Economics', id: 'economics', short: 'Econ', weight: '5-10%', color: '#f59e0b' },
    { marker: /^Financial Statement$/m, name: 'Financial Statement Analysis', id: 'fra', short: 'FSA', weight: '10-15%', color: '#ef4444' },
    { marker: /^Corporate Issuers$/m, name: 'Corporate Issuers', id: 'corporate', short: 'Corp', weight: '5-10%', color: '#8b5cf6' },
    { marker: /^Equity Valuation$/m, name: 'Equity Valuation', id: 'equity', short: 'Equity', weight: '10-15%', color: '#06b6d4' },
    { marker: /^Fixed Income$/m, name: 'Fixed Income', id: 'fi', short: 'FI', weight: '10-15%', color: '#ec4899' },
    { marker: /^Derivatives$/m, name: 'Derivatives', id: 'derivatives', short: 'Deriv', weight: '5-10%', color: '#f97316' },
    { marker: /^Alternative Investments$/m, name: 'Alternative Investments', id: 'alts', short: 'Alts', weight: '5-10%', color: '#14b8a6' },
    { marker: /^Portfolio Management$/m, name: 'Portfolio Management', id: 'pm', short: 'PM', weight: '10-15%', color: '#6366f1' },
    { marker: /^Ethical and Professional$/m, name: 'Ethical and Professional Standards', id: 'ethics', short: 'Ethics', weight: '10-15%', color: '#10b981' },
  ];
  
  const ABBREVS = { quant: 'qm', economics: 'ec', fra: 'fs', corporate: 'ci', equity: 'eq', fi: 'fi', derivatives: 'dr', alts: 'ai', pm: 'pm', ethics: 'et' };
  
  // Find topic positions
  const topicPositions = [];
  for (const tm of topicMarkers) {
    const match = text.match(tm.marker);
    if (match) {
      topicPositions.push({ ...tm, pos: match.index });
    }
  }
  topicPositions.sort((a, b) => a.pos - b.pos);
  
  // Extract text for each topic
  const topics = [];
  for (let i = 0; i < topicPositions.length; i++) {
    const start = topicPositions[i].pos;
    const end = i + 1 < topicPositions.length ? topicPositions[i + 1].pos : text.length;
    const topicText = text.slice(start, end);
    
    const tp = topicPositions[i];
    const abbrev = ABBREVS[tp.id];
    
    // Find modules: text between "The candidate should be able to:" markers
    // Module name is the text BEFORE "The candidate should be able to:"
    const moduleRegex = /([^\n□]+)\s*\n\s*The candidate should be able to:\s*\n([\s\S]*?)(?=\n[^\n□]+\s*\n\s*The candidate should be able to:|$)/g;
    
    const modules = [];
    let match;
    while ((match = moduleRegex.exec(topicText)) !== null) {
      let moduleName = match[1].trim()
        .replace(/^\d+\s+\w.*$/, '') // Remove page headers
        .replace(/\n/g, ' ')
        .trim();
      
      // Skip if module name looks like a page header
      if (/^\d+\s/.test(moduleName)) continue;
      if (moduleName === 'Analysis' || moduleName === 'Standards') continue;
      
      const losText = match[2];
      const losItems = [];
      const losRegex = /□\s*([\s\S]*?)(?=□|$)/g;
      let losMatch;
      while ((losMatch = losRegex.exec(losText)) !== null) {
        const los = losMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (los) losItems.push(los);
      }
      
      if (moduleName && losItems.length > 0) {
        modules.push({
          id: `l2-${abbrev}-${String(modules.length + 1).padStart(2, '0')}`,
          name: moduleName,
          los: losItems,
        });
      }
    }
    
    topics.push({
      id: tp.id,
      name: tp.name,
      shortName: tp.short,
      weightRange: tp.weight,
      color: tp.color,
      modules,
    });
  }
  
  return topics;
}

function toTS(topics) {
  let ts = '';
  topics.forEach(topic => {
    ts += `  {\n`;
    ts += `    id: "${topic.id}",\n`;
    ts += `    name: "${topic.name}",\n`;
    ts += `    shortName: "${topic.shortName}",\n`;
    ts += `    weightRange: "${topic.weightRange}",\n`;
    ts += `    color: "${topic.color}",\n`;
    ts += `    modules: [\n`;
    topic.modules.forEach(mod => {
      ts += `      {\n`;
      ts += `        id: "${mod.id}",\n`;
      ts += `        name: "${mod.name.replace(/"/g, '\\"')}",\n`;
      ts += `        los: [\n`;
      mod.los.forEach(los => {
        ts += `          "${los.replace(/"/g, '\\"')}",\n`;
      });
      ts += `        ],\n`;
      ts += `      },\n`;
    });
    ts += `    ],\n`;
    ts += `  },\n`;
  });
  return ts;
}

// Parse Level II
const l2Text = fs.readFileSync('/Users/daniel.freund/.cursor/projects/Users-daniel-freund-Desktop-CFA/agent-tools/3d2feae7-b0a3-40a1-b0af-da70f0497cb2.txt', 'utf8');
const l2Topics = parsePDFSimple(l2Text);

console.log('=== Level II Summary ===');
let totalLOS = 0;
l2Topics.forEach(t => {
  let topicLOS = 0;
  t.modules.forEach(m => topicLOS += m.los.length);
  totalLOS += topicLOS;
  console.log(`${t.name}: ${t.modules.length} modules, ${topicLOS} LOS`);
  t.modules.forEach(m => console.log(`  ${m.id}: ${m.name} (${m.los.length} LOS)`));
});
console.log(`Total: ${l2Topics.length} topics, ${totalLOS} LOS`);

const l2TS = toTS(l2Topics);
fs.writeFileSync('/Users/daniel.freund/Desktop/CFA/scripts/level2-generated.ts', l2TS);
console.log('\nWritten to scripts/level2-generated.ts');
