import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { Explanation, GetExplanation } from '~/src/shared/explanation'


@Module({
  name: 'explanation',
  stateFactory: true,
  namespaced: true,
})
export default class ExplanationModule extends VuexModule {
  item: Explanation = {
    _id: String(),
    question: Object(),
    choices: Object(),
    createdAt: String(), // <date-time>
    updatedAt: String(), // <date-time>
  }

  @MutationAction
  async get({ id }: GetExplanation): Promise<{ item: Explanation }> {
    let item: Explanation = this.item

    try {
      item = await $axios.$get(`/explanations/${id}`)
    } catch (e: any) {
      console.log(e.response)
    }

    return { item }
  }
}