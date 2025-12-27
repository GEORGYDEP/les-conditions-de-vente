
export interface GeneralConditions {
  name: string;
  prix: string;
  livraison: string;
  delai: string;
  paiement: string;
  reductions: string;
  reclamations: string;
}

export interface Question {
  id: number;
  text: string;
  correctAnswer: string;
  hint?: string;
}

export interface AnalysisExerciseData {
  id: number;
  title: string;
  conditions: GeneralConditions;
  questions: Question[];
}

export interface CalculationExerciseData {
  id: number;
  title: string;
  companyName: string;
  supplierName: string;
  items: {
    label: string;
    quantity: number;
    unitPrice: number;
  }[];
  remiseRate: number;
  remiseThreshold: number;
  escompteRate: number;
  escompteDays: number;
}
