import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Login} from './components/Login';
import Menu from './components/Menu';
import Proveedor from './components/Proveedor';
import Ventas from './components/Ventas';
import Gastos from './components/Gastos';
import RecuperarClave from './components/RecuperarClave';
import { AuthProvider } from './context/authContext';
import {ProtetedRoute} from './components/ProtetedRoute';
import ListProveedor from './components/ListProveedor';

function App() {
  return (
    <AuthProvider>
  <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/menu'
          element={<ProtetedRoute>
            <Menu />
          </ProtetedRoute>} />
          <Route path='/proveedor' 
          element={<ProtetedRoute>
            <Proveedor />
          </ProtetedRoute>} />
          <Route path='/listProveedores' 
          element={<ProtetedRoute>
            <ListProveedor />
          </ProtetedRoute>} />
    <Route path='/recuperarClave' element={<RecuperarClave />} />
    <Route path='/ventas' 
    element={<ProtetedRoute>
      <Ventas />
    </ProtetedRoute>} />
    <Route path='/gastos' 
    element={<ProtetedRoute>
      <Gastos />
    </ProtetedRoute>} />
  </Routes>
  </AuthProvider>
  );
}

export default App;
