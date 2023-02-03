import { defineStore } from 'pinia'

export const useLogin = defineStore('login', {
  state: () => ({
    security_key: '',
    generate_key: '',
    token: ''
  }),
  actions: {
    SET_SECURITY_KEY(key: string) {
      this.security_key = key
    },
    SET_GENERATE_KEY(key: string) {
      this.generate_key = key
    },
    SET_TOKEN(token: string) {
      localStorage.setItem('DATAZHI-TOKEN', token)
      this.token = token
    }
  }
})
