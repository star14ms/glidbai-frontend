import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import QuestionModule from '../store/question'
import ExplanationModule from '../store/explanation'

let questionState: QuestionModule
let explanationState: ExplanationModule

function initialiseStores(store: Store<any>): void {
  questionState = getModule(QuestionModule, store)
  explanationState = getModule(ExplanationModule, store)
}

export { initialiseStores, questionState, explanationState }