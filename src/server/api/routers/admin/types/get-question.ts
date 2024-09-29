export type GetQuestion = {
    variable: {
        id: string
        alias: string
        name: string
        description: string
        createdAt: Date
        updatedAt: Date
    } | null
    formGroup: {
        id: string
        name: string
        description: string
        isActive: boolean
        isPublished: boolean
        year: string
        createdAt: Date
        updatedAt: Date
    } | null
    question: {
        optionJoin: string
        option: {
            id: string
            questionId: string
            value: string
            point: number
            createdAt: Date
            updatedAt: Date
        }[]
        id: string
        question: string
        year: string
        isActive: boolean
        variableOnFormGroupId: string
        createdAt: Date
        updatedAt: Date
    }[] | undefined
}
