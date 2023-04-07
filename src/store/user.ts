import { Module, VuexModule, Mutation, MutationAction } from 'vuex-module-decorators'
import { $axios, $error_can_happen } from '../utils/api'
import { UpdateUserQuestion, CreateCurriculumForm } from '~/src/shared/user'


@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  userCurriculum: UpdateUserQuestion[] = []

  @Mutation
  async updateUserQuestion({ questionId, solved, correct }: UpdateUserQuestion) {
    await $error_can_happen(async () => {
      await $axios.$post(`/users/question`, { questionId, solved, correct })
    })
  }

  @MutationAction
  async createCurriculum({ newbie, topics, difficulty }: CreateCurriculumForm) {
    let userCurriculum = this.userCurriculum

    await $error_can_happen(async () => {
      userCurriculum = await $axios.$post(`/users/curriculum`, { newbie, topics, difficulty })
    })

    return { userCurriculum }
  }
}