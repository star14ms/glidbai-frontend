import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'

@Module({
  name: 'OMR',
  stateFactory: true,
  namespaced: true,
})
export default class OMRModule extends VuexModule {
  n_question: number = 5
  item: Array<boolean> = Array(this.n_question).fill(null)

  @MutationAction
  async init() {
    const item = Array(this.n_question).fill(null)
    return { item }
  }

  @Mutation
  update({index, correct}: {index: number, correct: boolean}) {
    this.item[index] = correct
  }
}