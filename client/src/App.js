import 'antd/dist/antd.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import Login from './pages/Login';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import Customers from './pages/Customers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
            <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({children}) {
  if(localStorage.getItem('pos-user'))
    return children
  else
    return <Navigate to='/login' />
}