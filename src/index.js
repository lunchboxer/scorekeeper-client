// @flow
import React from 'react'
import { render } from 'react-dom'
import Index from './pages/index'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {
  SIMPLE_API_ENDPOINT,
  SUBSCRIPTION_API_ENDPOINT,
  GC_AUTH_TOKEN
} from './constants'
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: SIMPLE_API_ENDPOINT })

const wsLink = new WebSocketLink({
  uri: SUBSCRIPTION_API_ENDPOINT,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN)
    }
  }
})

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

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkWithAuthToken
)

const client = new ApolloClient({
  link,
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
