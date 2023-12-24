/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './App.css';
import Login from './routes/login';
import Home from './routes/home';
import Reminders from './routes/reminders';
import CreateBill from './routes/create-bill';
import BillHistory from './routes/bill-history';
import AddProduct from './routes/add-product';
import Overview from './routes/overview';
import RouterView from './components/routes-view';
import { useState } from 'react';

export default function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  function pressLogout(): void {
    setLogin(false);
    navigate('/');
  }

  function pressLogin(): void {
    navigate('/home');
    setLogin(true);
  }

  return (
    <div>
    {login ? (
        <div>
          <div className='header'>
            <div className='logo'><img src={logo} alt='logo'/></div>
            <div className='logout-btn'>
              <button onClick={pressLogout}>Logout</button>
            </div>
          </div>

          <div>
            <div className='top'>
              <RouterView />
            </div>
            <div className='bottom'>
            <Routes>
              {/* <Route path="/" element={<Login />}   /> */}
              <Route path="/home" element={<Home  />} />
              <Route path="/reminder" element={<Reminders   />} />
              <Route path="/view-bill-create" element={<CreateBill  />} />
              <Route path="/view-bill-history" element={<BillHistory  />} />
              <Route path="/add-product" element={<AddProduct   />} />
              <Route path="/overview" element={<Overview  />} />
            </Routes>
            </div>
          </div>
          
        </div>
        ) : (
          <div>
            <div>
              <button onClick={pressLogin}>Login</button>
              <Login />
            </div>
          </div>
        )}
        </div>
  );
}
