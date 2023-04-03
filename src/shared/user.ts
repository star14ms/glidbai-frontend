
type UpdateUserQuestion = {
    Authorization: string
    questionId: string
    solved: boolean
    correct: boolean
}

type CreateCurriculum = {
    Authorization: string
    newby: boolean
    topics: string[]
    difficulty: number
}

export type { UpdateUserQuestion, CreateCurriculum }