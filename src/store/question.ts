import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { $axios, $error_can_happen } from '../utils/api'
import { Question, QuestionInit, GetQuestion, NextQuestion, GetNextQuestion } from '../../src/shared/question'


@Module({
  name: 'question',
  stateFactory: true,
  namespaced: true,
})
export default class QuestionModule extends VuexModule {
  item: Question = QuestionInit

  nextItem: NextQuestion = {
    questionId: String(),
  }

  @MutationAction
  async get({ id }: GetQuestion): Promise<{ item: Question }> {
    let item: Question = this.item

    await $error_can_happen(async () => {
      item = await $axios.$get(`/questions/${id}`)
    })

    return { item }
  }

  @MutationAction
  async getNext({ onlyUnsolved }: GetNextQuestion) {
    let nextItem: NextQuestion = this.nextItem

    await $error_can_happen(async () => {
      nextItem = await $axios.$get(`/users/next-question?onlyUnsolved=${onlyUnsolved}`)
    })

    return { nextItem }
  }
}