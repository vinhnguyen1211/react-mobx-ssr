import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import Helmet from 'react-helmet'
import routes from './routes'
import Layout from './components/Layout'
import { Provider } from 'mobx-react'
import { User } from './store'
import { fetchUsers } from './api'

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', (req, res) => {
  const context = { }

  const dataRequirements =
        routes
          .filter(route => matchPath(req.url, route)) // filter matching paths
          .map(route => route.component) // map to components

  fetchUsers().then( result => {
    const stores = {
      user: new User(result)
    }
    
    const jsx = (
      <Provider stores={stores}>
        <StaticRouter context={ context } location={ req.url }>
          <Layout />
        </StaticRouter>
      </Provider>
    )
    const reactDom = renderToString(jsx)
    const helmetData = Helmet.renderStatic()

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlTemplate(reactDom, stores, helmetData))
  })

  Promise.all(dataRequirements).then(() => {
    
  })
})

app.listen(2048)

function htmlTemplate(reactDom, mobxStores, helmetData) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString() }
            ${ helmetData.meta.toString() }
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
              window.__INITIAL_STATE__ = ${ JSON.stringify(mobxStores) };
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `
}
