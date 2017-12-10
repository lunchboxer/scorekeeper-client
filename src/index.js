// @flow
import React from 'react'
import { render } from 'react-dom'
import Index from './pages/index'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SIMPLE_API_ENDPOINT } from './constants'
import { GC_AUTH_TOKEN } from './constants'
import { ApolloLink } from 'apollo-client-preset'

const httpLink = new HttpLink({ uri: SIMPLE_API_ENDPOINT })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
})

const rootElement = document.querySelector('#root')
if (rootElement) {
  render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Index />
      </ApolloProvider>
    </BrowserRouter>,
    rootElement
  )
}
