import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { Question } from '~/src/shared/question'
import { UpdateUserQuestion, CreateCurriculumForm } from '~/src/shared/user'


@Module({
  name: 'question',
  stateFactory: true,
  namespaced: true,
})
export default class QuestionModule extends VuexModule {
  item: Question = {
    _id: String(),
    question: String(),
    passage: String(),
    choices: {
      a: String(),
      b: String(),
      c: String(),
      d: String(),
    }, 
    answer: String(),
    topic: String(),
    difficulty: Number(),
    length: Number(),
    sentences: Array(),
    createdAt: String(),
    updatedAt: String(),
  }

  @Action
  async updateUserQuestion({ questionId, solved, correct }: UpdateUserQuestion) {
    await $axios.$post(`/users/quetsion`, { questionId, solved, correct })
  }

  @Action
  async createCurriculum({ newby, topics, difficulty }: CreateCurriculumForm) {
    await $axios.$post(`/users/curriculum`, { newby, topics, difficulty })
  }
}