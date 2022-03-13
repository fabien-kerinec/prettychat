import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { client } from './apollo'
import Router from './components/routes/Router'
import { AuthProvider } from './context/auth'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
