import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
     
    </div>
  )
}

export default App
