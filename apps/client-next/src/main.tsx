import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { ManekiProvider } from './providers/ManekiProvider'
import './styles/index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ManekiProvider>
        <App />
      </ManekiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
