import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import QuestionModule from '../store/question'
import ExplanationModule from '../store/explanation'
import OMRModule from '../store/OMR'


let questionState: QuestionModule
let explanationState: ExplanationModule
let OMRState: OMRModule

function initialiseStores(store: Store<any>): void {
  questionState = getModule(QuestionModule, store)
  explanationState = getModule(ExplanationModule, store)
  OMRState = getModule(OMRModule, store)
}

export { initialiseStores, questionState, explanationState, OMRState }