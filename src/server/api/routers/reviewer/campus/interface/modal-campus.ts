export interface IModalCampusReview {
  answer: Answer;
  id: string;
  question: string;
  year: string;
  isActive: boolean;
  variableOnFormGroupId: string;
  campusAnswer: CampusAnswer[];
  option: Option2[];
}

export interface Answer {
  reviewStatus: string;
  reviewComment: any;
}

export interface CampusAnswer {
  id: string;
  questionId: string;
  optionId: string;
  revisionOptionId: string;
  campusId: string;
  year: string;
  answerStatus: string;
  reviewComment: any;
  reviewDate: Date;
  revisionOption: RevisionOption;
  option: Option;
}

export interface RevisionOption {
  id: string;
  questionId: string;
  value: string;
  point: number;
}

export interface Option {
  id: string;
  questionId: string;
  value: string;
  point: number;
}

export interface Option2 {
  id: string;
  questionId: string;
  value: string;
  point: number;
}
