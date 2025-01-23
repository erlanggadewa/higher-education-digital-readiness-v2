import { type $Enums } from '@prisma/client';

export type GetQuestionCampusSurvey = {
  question: ({
    campusAnswer: {
      id: string;
      campusId: string;
      year: string;
      questionId: string;
      optionId: string;
      revisionOptionId: string;
      answerStatus: $Enums.AnswerStatus;
      reviewComment: string | null;
      reviewDate: Date | null;
    }[];
    option: {
      value: string;
      id: string;
      questionId: string;
      point: number;
    }[];
  } & {
    question: string;
    id: string;
    year: string;
    variableOnFormGroupId: string;
    isActive: boolean;
  })[];
  formGroup: {
    name: string;
    id: string;
    description: string;
    year: string;
    isActive: boolean;
    isPublished: boolean;
  };
  variable: {
    name: string;
    id: string;
    description: string;
    alias: string;
  };
  campusSurveyLog: {
    status: $Enums.SurveyLogStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    campusId: string;
    variableOnFormGroupId: string;
  }[];
} & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  variableId: string;
  formGroupId: string;
};
