export type GetFormGroup = {
    formGroupId: string | undefined
    formGroupName: string | undefined
    formGroupDescription: string | undefined
    year: string | undefined
    variable: {
        totalQuestion: number
        variableOnFormGroup: ({
            _count: { question: number }
            variable: {
                id: string
                alias: string
                name: string
                description: string
                createdAt: Date
                updatedAt: Date
            }
        } & {
            id: string
            variableId: string
            formGroupId: string
            createdAt: Date
            updatedAt: Date
        })[]
        id: string
        alias: string
        name: string
        description: string
        createdAt: Date
        updatedAt: Date
    }[]
}
