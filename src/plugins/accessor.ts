import { Plugin } from '@nuxt/types'
import { initialize } from '../utils/api'

const accessor: Plugin = (ctx: any) => {
  initialize(ctx.$axios, ctx.store._watcherVM.error_can_happen)
}

export default accessor