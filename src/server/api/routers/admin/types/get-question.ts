export type GetQuestion = {
  question:
    | {
        optionJoin: string;
        option: {
          id: string;
          questionId: string;
          value: string;
          point: number;
          createdAt: Date;
          updatedAt: Date;
        }[];
        id: string;
        question: string;
        year: string;
        isActive: boolean;
        variableOnFormGroupId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
  formGroup?:
    | {
        id: string;
        name: string;
        description: string;
        isActive: boolean;
        isPublished: boolean;
        year: string;
        createdAt: Date;
        updatedAt: Date;
      }
    | undefined;
  variable?:
    | {
        id: string;
        alias: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
      }
    | undefined;
  id?: string | undefined;
  variableId?: string | undefined;
  formGroupId?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};
