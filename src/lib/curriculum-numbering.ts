import { CFALevel, getTopicsForLevel } from "./cfa-topics";

export interface CurriculumLabel {
  topicNumber: number;
  topicLabel: string;
  moduleNumber: string;
  moduleLabel: string;
}

export interface LosLabel {
  number: string;
  description: string;
  moduleId: string;
  topicId: string;
}

/**
 * Build a lookup map from internal IDs to human-readable numbered labels.
 *
 * Topic "quant" (first in Level I) → topicNumber: 1, topicLabel: "1. Quantitative Methods"
 * Module "l1-qm-01" (first module in quant) → moduleNumber: "1.1", moduleLabel: "1.1 Rates and Returns"
 * LOS "l1-qm-01:0" (first LOS in that module) → number: "1.1.a", description: "interpret interest rates..."
 */
export function buildCurriculumIndex(level: CFALevel) {
  const topics = getTopicsForLevel(level);

  const topicLabels = new Map<string, CurriculumLabel>();
  const moduleLabels = new Map<string, CurriculumLabel>();
  const losLabels = new Map<string, LosLabel>();

  topics.forEach((topic, topicIdx) => {
    const tNum = topicIdx + 1;
    const tLabel: CurriculumLabel = {
      topicNumber: tNum,
      topicLabel: `${tNum}. ${topic.name}`,
      moduleNumber: "",
      moduleLabel: "",
    };
    topicLabels.set(topic.id, tLabel);

    topic.modules.forEach((module, modIdx) => {
      const mNum = `${tNum}.${modIdx + 1}`;
      const mLabel: CurriculumLabel = {
        topicNumber: tNum,
        topicLabel: `${tNum}. ${topic.name}`,
        moduleNumber: mNum,
        moduleLabel: `${mNum} ${module.name}`,
      };
      moduleLabels.set(module.id, mLabel);

      module.los.forEach((description, losIdx) => {
        const losId = `${module.id}:${losIdx}`;
        const letter = String.fromCharCode(97 + losIdx);
        losLabels.set(losId, {
          number: `${mNum}.${letter}`,
          description,
          moduleId: module.id,
          topicId: topic.id,
        });
      });
    });
  });

  return { topicLabels, moduleLabels, losLabels };
}

/**
 * Get numbered label for a module, e.g. "1.1 Rates and Returns"
 */
export function getModuleLabel(level: CFALevel, moduleId: string): string {
  const { moduleLabels } = buildCurriculumIndex(level);
  return moduleLabels.get(moduleId)?.moduleLabel ?? moduleId;
}

/**
 * Get numbered label for a LOS, e.g. "1.1.a"
 */
export function getLosNumber(level: CFALevel, losId: string): string {
  const { losLabels } = buildCurriculumIndex(level);
  return losLabels.get(losId)?.number ?? losId;
}

/**
 * Resolve a losId to its number + description.
 */
export function getLosInfo(level: CFALevel, losId: string): LosLabel | null {
  const { losLabels } = buildCurriculumIndex(level);
  return losLabels.get(losId) ?? null;
}
