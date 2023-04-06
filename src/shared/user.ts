
type UpdateUserQuestion = {
    questionId: string
    solved: boolean
    correct: boolean
}

type CreateCurriculumForm = {
    [key: string]: any,
    newby?: boolean,
    difficulty?: number,
    topics?: string[],
}


export type { UpdateUserQuestion, CreateCurriculumForm }