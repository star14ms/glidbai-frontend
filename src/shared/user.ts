
type UpdateUserQuestion = {
    Authorization: string
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

interface CreateCurriculum extends CreateCurriculumForm {
    Authorization: string
}


export type { UpdateUserQuestion, CreateCurriculumForm, CreateCurriculum }