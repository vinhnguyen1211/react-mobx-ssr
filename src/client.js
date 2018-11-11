import 'babel-core/register'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout'
import { Provider } from 'mobx-react'
import { User } from './store'


const { user } = window.__INITIAL_STATE__

const stores = {
  user: new User(user.users)
}

const jsx = (
  <Provider stores={stores}>
    <Router>
      <Layout />
    </Router>
  </Provider>
)


const app = document.getElementById('app')
ReactDOM.hydrate(jsx, app)
