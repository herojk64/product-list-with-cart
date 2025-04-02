import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ItemList } from './context/Items.tsx'
import { ModelProvider } from './context/ModelContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ItemList>
      <ModelProvider>
        <App />
      </ModelProvider>
    </ItemList>
  </StrictMode>,
)
