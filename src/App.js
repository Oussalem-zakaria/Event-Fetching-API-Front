import React, { useState } from 'react';
import Header from './sections/Header/Header';
import './index.css';
import Home from './pages/Home';
import Footer from './sections/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';

export const AuthContext = React.createContext(null);

function App() {
  const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <AuthContext.Provider value={{loginUser, setLoginUser}}>
      <BrowserRouter>
        <ToastContainer />
        <div className='container mx-auto px-4'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
