import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import OrgUser from './pages/OrgUser/OrgUser';
import './App.css';

function App() {
  return (
    <div className="app-viewport">
      {/* Elemento superior fijo */}
      <Header />
      
      {/* Contenedor inferior dividido en dos columnas */}
      <div className="app-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/org-user" element={<OrgUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
