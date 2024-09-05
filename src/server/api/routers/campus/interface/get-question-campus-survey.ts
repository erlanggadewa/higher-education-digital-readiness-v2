export interface GetQuestionCampusSurvey {
  id: string;
  variableId: string;
  formGroupId: string;
  createdAt: Date;
  updatedAt: Date;
  variable: Variable;
  campusSurveyLog: CampusSurveyLog[];
  question: Question[];
}

export interface CampusSurveyLog {
  id: string;
  campusId: string;
  variableOnFormGroupId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  question: string;
  isActive: boolean;
  variableOnFormGroupId: string;
  campusAnswer: CampusAnswer[];
  option: Option[];
}

export interface CampusAnswer {
  id: string;
  questionId: string;
  optionId: string;
  revisionOptionId: string;
  campusId: string;
  answerStatus: string;
  reviewComment: null;
  reviewDate: null;
}

export interface Option {
  id: string;
  questionId: string;
  value: string;
  point: number;
}

export interface Variable {
  id: string;
  alias: string;
  name: string;
  description: string;
}
