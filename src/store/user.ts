import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { Question } from '~/src/shared/question'
import { UpdateUserQuestion, CreateCurriculum } from '~/src/shared/user'


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

  @Mutation
  async updateUserQuestion({Authorization, questionId, solved, correct}: UpdateUserQuestion) {
    await $axios.$post(`/users/quetsion`, { questionId, solved, correct }, {
      headers: { 'Authorization': `Bearer ${Authorization}` }
    })
  }

  @Mutation
  async createCurriculum({Authorization, newby, topics, difficulty}: CreateCurriculum) {
    await $axios.$post(`/users/curriculum`, { newby, topics, difficulty }, {
      headers: { 'Authorization': `Bearer ${Authorization}` }
    })
  }
}