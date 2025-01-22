import { type $Enums } from '@prisma/client';

export type GetQuestionCampusSurvey = {
  campusSurveyLog: {
    status: $Enums.SurveyLogStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    campusId: string;
    variableOnFormGroupId: string;
  }[];
  question: ({
    campusAnswer: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
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
    id: string;
    isActive: boolean;
    year: string;
    variableOnFormGroupId: string;
    question: string;
  })[];
  formGroup: {
    name: string;
    id: string;
    isActive: boolean;
    year: string;
    description: string;
    isPublished: boolean;
  };
  variable: {
    name: string;
    id: string;
    description: string;
    alias: string;
  };
} & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  formGroupId: string;
  variableId: string;
};
