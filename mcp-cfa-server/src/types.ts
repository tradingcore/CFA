export interface LosContent {
  losId: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  number: string;
  description: string;
  summary: string;
  keyConcepts: string[];
  relatedFormulas: string[];
}

export interface Exercise {
  id: string;
  level: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  losId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  source: string;
}

export interface Formula {
  id: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  name: string;
  formula: string;
  description: string;
  example: string;
  variables: string[];
}

export interface CurriculumLevel {
  level: string;
  topics: {
    id: string;
    name: string;
    modules: {
      id: string;
      name: string;
      los: LosContent[];
    }[];
  }[];
}
