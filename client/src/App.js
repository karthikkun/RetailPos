import 'antd/dist/antd.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Homepage />}/>
            <Route path="/items" element={<Items />}/>
            <Route path="/cart" element={<CartPage />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
