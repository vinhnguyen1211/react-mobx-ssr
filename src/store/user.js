import { observable } from 'mobx'

export default class User {

  @observable loading = false
  @observable users = []

  constructor(users) {
    this.users = users
  }
}

