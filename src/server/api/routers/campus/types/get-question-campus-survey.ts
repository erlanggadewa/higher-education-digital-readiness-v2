import { type $Enums } from '@prisma/client';

export type GetQuestionCampusSurvey = {
  campusSurveyLog: {
    id: string;
    campusId: string;
    variableOnFormGroupId: string;
    status: $Enums.SurveyLogStatus;
    createdAt: Date;
    updatedAt: Date;
  }[];
  question: ({
    campusAnswer: {
      id: string;
      questionId: string;
      optionId: string;
      revisionOptionId: string;
      campusId: string;
      year: string;
      answerStatus: $Enums.AnswerStatus;
      reviewComment: string | null;
      reviewDate: Date | null;
      createdAt: Date;
      updatedAt: Date;
    }[];
    option: {
      id: string;
      questionId: string;
      value: string;
      point: number;
    }[];
  } & {
    id: string;
    question: string;
    year: string;
    isActive: boolean;
    variableOnFormGroupId: string;
    createdAt: Date;
    updatedAt: Date;
  })[];
  formGroup: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    isPublished: boolean;
    year: string;
  };
  variable: {
    id: string;
    alias: string;
    name: string;
    description: string;
  };
} & {
  id: string;
  variableId: string;
  formGroupId: string;
  createdAt: Date;
  updatedAt: Date;
};
