import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

// Organismo Fin (Abril)
import OrganismoFin from './pages/OrganismoFin'
import CreateOrganismoFin from './components/organismo-fin/create'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="app-body">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/organismo-fin" element={<OrganismoFin />} />
                        <Route path="/organismo-fin/create" element={<CreateOrganismoFin />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;