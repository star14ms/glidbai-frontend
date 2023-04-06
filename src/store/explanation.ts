import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { $axios, $error_can_happen } from '../utils/api'
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

    await $error_can_happen(async () => {
      item = await $axios.$get(`/explanations/${id}`)
    })

    return { item }
  }
}