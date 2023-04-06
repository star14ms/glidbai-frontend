import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { $axios, $error_can_happen } from '../utils/api'
import { Question } from '~/src/shared/question'
import { UpdateUserQuestion, CreateCurriculumForm } from '~/src/shared/user'


@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
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

  @Mutation
  async updateUserQuestion({ questionId, solved, correct }: UpdateUserQuestion) {
    await $error_can_happen(async () => {
      await $axios.$post(`/users/quetsion`, { questionId, solved, correct })
    })
  }

  @Mutation
  async createCurriculum({ newby, topics, difficulty }: CreateCurriculumForm) {
    await $error_can_happen(async () => {
      await $axios.$post(`/users/curriculum`, { newby, topics, difficulty })
    })
  }
}