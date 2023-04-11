import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'

@Module({
  name: 'OMR',
  stateFactory: true,
  namespaced: true,
})
export default class OMRModule extends VuexModule {
  n_question: number = 5
  item: Array<boolean> = Array(this.n_question).fill(null)
  leftTime: number = 10 * 60 * 1000
  startTime: Date | null = null
  endTime: Date | null = null
  isOpenCounter: boolean = false
  isPausedCounter: boolean = false

  @Mutation
  init() {
    this.item = Array(this.n_question).fill(null)
    this.leftTime = 10 * 60 * 1000
    this.isOpenCounter = false
    this.isPausedCounter = false
  }

  @Mutation
  update({index, correct}: {index: number, correct: boolean}) {
    this.item[index] = correct
  }

  @Mutation
  updateLeftTime(leftTime: number) {
    this.leftTime = leftTime
  }

  @Mutation
  setStartTime() {
    this.startTime = new Date()
  }

  @Mutation
  setEndTime() {
    this.endTime = new Date()
  }

  @Mutation
  ChangeIsOpenCounter(isOpen: boolean) {
    this.isOpenCounter = isOpen
  }

  @Mutation
  ChangeisPausedCounter(isPaused: boolean) {
    this.isPausedCounter = isPaused
  }
}