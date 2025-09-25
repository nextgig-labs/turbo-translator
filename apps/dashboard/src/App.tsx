import { QueryProvider } from './providers/QueryClientProvider'
import { TranslationService } from './components/TranslationService'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                  <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                  <img src={reactLogo} className="h-8 w-8" alt="React logo" />
                </a>
                <h1 className="text-2xl font-bold text-gray-900">Turbo Translator Dashboard</h1>
              </div>
              <div className="text-sm text-gray-500">
                OpenAPI + React Query Integration
              </div>
            </div>
          </div>
        </header>

        <main>
          <TranslationService />
        </main>
      </div>
    </QueryProvider>
  )
}

export default App
