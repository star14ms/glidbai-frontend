import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'
import { MessageData } from '~/src/shared/vue-chat-bot'

@Module({
  name: 'bot',
  stateFactory: true,
  namespaced: true,
})
export default class BotModule extends VuexModule {
  isOpen: boolean = false
  messageData: MessageData[] = []

  @Mutation
  ChangeIsOpen(isOpen: boolean) {
    this.isOpen = isOpen
  }

  @Mutation
  AddMessageData(messageData: MessageData) {
    this.messageData.push(messageData)
  }

  @Mutation
  clearMessageData() {
    this.messageData = []
  }
}