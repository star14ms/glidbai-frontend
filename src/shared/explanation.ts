import { Question } from "./question"


type ExplanationChoices = {
    choice: string,
    explanation: string,
    relatedIdx: number,
}


type Explanation = {
    _id: string,
    question: Question,
    choices: {
        a: ExplanationChoices,
        b: ExplanationChoices,
        c: ExplanationChoices,
        d: ExplanationChoices,
    },
    createdAt: string, // <date-time>
    updatedAt: string, // <date-time>
}

type GetExplanation = {
    id: string,
}

export type { Explanation, GetExplanation }
