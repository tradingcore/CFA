const fs = require('fs');

let text = fs.readFileSync('/Users/daniel.freund/.cursor/projects/Users-daniel-freund-Desktop-CFA/agent-tools/4a720bce-53e6-4ca6-8b53-4a277763c04d.txt', 'utf8');

// Clean
text = text.replace(/\r\n/g, '\n')
  .replace(/© CFA Institute\. For candidate use only\. Not for distribution\.\n?/g, '')
  .replace(/^\d+ (?:Economics|Portfolio Management|Derivatives|Fixed Income|Equity Investments|Alternative Investments|Ethical and Professional Standards)\s*$/gm, '')
  .replace(/^2024 Level III Topic Outlines\s*$/gm, '')
  .replace(/^LEARNING OUTCOMES\s*$/gm, '');

const topicDefs = [
  { re: /^Economics$/m, id: 'economics', name: 'Economics', short: 'Econ', weight: '5-10%', color: '#f59e0b', abbrev: 'ec' },
  { re: /^Portfolio Management$/m, id: 'pm', name: 'Portfolio Management', short: 'PM', weight: '35-40%', color: '#6366f1', abbrev: 'pm' },
  { re: /^Derivatives$/m, id: 'derivatives', name: 'Derivatives', short: 'Deriv', weight: '5-10%', color: '#f97316', abbrev: 'dr' },
  { re: /^Fixed Income$/m, id: 'fi', name: 'Fixed Income', short: 'FI', weight: '15-20%', color: '#ec4899', abbrev: 'fi' },
  { re: /^Equity Investments$/m, id: 'equity', name: 'Equity Investments', short: 'Equity', weight: '10-15%', color: '#06b6d4', abbrev: 'eq' },
  { re: /^Alternative Investments$/m, id: 'alts', name: 'Alternative Investments', short: 'Alts', weight: '5-10%', color: '#14b8a6', abbrev: 'ai' },
  { re: /^Ethical and Professional\s*$/m, id: 'ethics', name: 'Ethical and Professional Standards', short: 'Ethics', weight: '10-15%', color: '#10b981', abbrev: 'et' },
];

// Find topic positions
const positions = [];
for (const td of topicDefs) {
  const m = text.match(td.re);
  if (m) positions.push({ ...td, pos: m.index });
}
positions.sort((a, b) => a.pos - b.pos);

const topics = [];

for (let i = 0; i < positions.length; i++) {
  const start = positions[i].pos;
  const end = i + 1 < positions.length ? positions[i + 1].pos : text.length;
  const topicText = text.slice(start, end);
  const tp = positions[i];
  
  // Find all "The candidate should be able to:" markers and collect module name before each
  const sections = [];
  const regex = /([\s\S]*?)The candidate should be able to:\s*\n([\s\S]*?)(?=\n[A-Z][^\n□]*\nThe candidate should be able to:|$)/g;
  let match;
  
  // Alternative: split by "The candidate should be able to:"
  const splits = topicText.split('The candidate should be able to:');
  
  const modules = [];
  
  for (let s = 1; s < splits.length; s++) {
    // Module name is at the end of splits[s-1]
    const prevLines = splits[s - 1].trim().split('\n').map(l => l.trim()).filter(l => l);
    // Module name: last non-empty lines before the split that aren't LOS
    let moduleName = '';
    for (let j = prevLines.length - 1; j >= 0; j--) {
      const line = prevLines[j];
      if (line.startsWith('□')) break;
      if (line === tp.name || line === 'Standards' || line === 'Economics' || line === 'Derivatives' || line === 'Fixed Income' || line === 'Equity Investments' || line === 'Alternative Investments' || line === 'Portfolio Management') break;
      moduleName = line + (moduleName ? ' ' + moduleName : '');
    }
    
    // LOS from splits[s]
    const losText = splits[s];
    const losItems = [];
    const losLines = losText.split('\n');
    let currentLos = null;
    
    for (const line of losLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('□')) {
        if (currentLos) losItems.push(currentLos.replace(/\s+/g, ' ').trim());
        currentLos = trimmed.replace(/^□\s*/, '');
      } else if (currentLos) {
        // Is this a continuation or a module name?
        // If the line doesn't start with lowercase and doesn't look like continuation, it might be next module name
        if (/^[A-Z]/.test(trimmed) && !trimmed.startsWith('□')) {
          // Check if next split exists - this might be module name for next section
          // For now, check if more □ follow
          const remaining = losLines.slice(losLines.indexOf(line)).join('\n');
          if (remaining.includes('□')) {
            currentLos += ' ' + trimmed;
          } else {
            // No more LOS, this is trailing text
            losItems.push(currentLos.replace(/\s+/g, ' ').trim());
            currentLos = null;
          }
        } else {
          currentLos += ' ' + trimmed;
        }
      }
    }
    if (currentLos) losItems.push(currentLos.replace(/\s+/g, ' ').trim());
    
    if (moduleName && losItems.length > 0) {
      modules.push({
        id: `l3-${tp.abbrev}-${String(modules.length + 1).padStart(2, '0')}`,
        name: moduleName,
        los: losItems,
      });
    }
  }
  
  topics.push({
    id: tp.id, name: tp.name, shortName: tp.short,
    weightRange: tp.weight, color: tp.color, modules,
  });
}

// Generate TypeScript
let ts = '';
topics.forEach(topic => {
  ts += `  {\n    id: "${topic.id}",\n    name: "${topic.name}",\n    shortName: "${topic.shortName}",\n    weightRange: "${topic.weightRange}",\n    color: "${topic.color}",\n    modules: [\n`;
  topic.modules.forEach(mod => {
    ts += `      {\n        id: "${mod.id}",\n        name: "${mod.name.replace(/"/g, '\\"')}",\n        los: [\n`;
    mod.los.forEach(los => {
      ts += `          "${los.replace(/"/g, '\\"')}",\n`;
    });
    ts += `        ],\n      },\n`;
  });
  ts += `    ],\n  },\n`;
});

fs.writeFileSync('/Users/daniel.freund/Desktop/CFA/scripts/level3-generated.ts', ts);

console.log('=== Level III Summary ===');
let totalLOS = 0;
topics.forEach(t => {
  let tLOS = 0;
  t.modules.forEach(m => tLOS += m.los.length);
  totalLOS += tLOS;
  console.log(`${t.name}: ${t.modules.length} modules, ${tLOS} LOS`);
  t.modules.forEach(m => console.log(`  ${m.id}: ${m.name} (${m.los.length} LOS)`));
});
console.log(`Total: ${topics.length} topics, ${totalLOS} LOS`);
