import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import QuestionModule from '../store/question'

let questionState: QuestionModule

function initialiseStores(store: Store<any>): void {
  questionState = getModule(QuestionModule, store)
}

export { initialiseStores, questionState }