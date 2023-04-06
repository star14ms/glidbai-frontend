import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance
let $error_can_happen = Function()

export function initialize(axiosInstance: NuxtAxiosInstance, error_can_happen: Function) {
  $axios = axiosInstance
  $error_can_happen = error_can_happen
}

export { $axios, $error_can_happen }