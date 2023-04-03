
type Question = {
  _id: string,
  question: string, // 질문
  passage: string, // 지문
  choices: { // 보기
    a: string,
    b: string,
    c: string,
    d: string,
  }, 
  answer: string, // 정답
  topic: string, // 주제
  difficulty: number, // 문제의 난이도
  length: number, // passage의 문장 수
  sentences: string[] // passage를 구성하는 문장들
  createdAt: string, // <date-time>
  updatedAt: string, // <date-time>
}

type GetQuestion = {
  id: string,
  Authorization: string,
}

type GetNextQuestion = {
  onlyUnsolved?: boolean,
  Authorization: string,
}

type Answer2Index = {
  [key: string]: number
}

type Index2Answer = {
  [key: number]: string
}


export type { Question, GetQuestion, GetNextQuestion, Answer2Index, Index2Answer }
