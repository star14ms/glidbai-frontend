import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import QuestionModule from '../store/question'
import ExplanationModule from '../store/explanation'
import OMRModule from '../store/OMR'
import UserModule from '../store/user'


let questionState: QuestionModule
let explanationState: ExplanationModule
let OMRState: OMRModule
let userState: UserModule

function initialiseStores(store: Store<any>): void {
  questionState = getModule(QuestionModule, store)
  explanationState = getModule(ExplanationModule, store)
  OMRState = getModule(OMRModule, store)
  userState = getModule(UserModule, store)
}

export { initialiseStores, questionState, explanationState, OMRState, userState }