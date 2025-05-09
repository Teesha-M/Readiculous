import React, { useEffect } from 'react';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Viewbookdetails from './pages/Viewbookdetails';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favourites from './components/Favourites';
import OrderHistory from './components/OrderHistory';
import Setting from './components/Setting';
import { useDispatch, useSelector } from 'react-redux';
import { login, changeRole } from './store/auth';
import AddBook from './components/AddBook';
import AllOrders from './components/AllOrders';
import AllUsers from './components/AllUsers';
import UpdateBook from './pages/UpdateBook';
import { ToastContainer } from 'react-toastify';
import PaymentGateway from './components/PaymentGateway';
import AllBook from './components/AllBook';
import AboutUs from './components/AboutUs';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")) {
      dispatch(login());
      dispatch(changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme='dark'/>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<><Home/><Footer/></>} />
        <Route path='/allbooks' element={<AllBooks />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "user" ? (
            <Route path='/profile/orderhistory' element={<OrderHistory />} />
          ) : (
            <Route path='/profile/addbooks' element={<AddBook />} />
          )}
          {role === "admin" && (
            <Route path='/profile/allusers' element={<AllUsers />} />
          )}
          {role === "admin" && (
            <Route path='/profile/allbook' element={<AllBook />} />
          )}
          <Route path='/profile/setting' element={<Setting />} />
        </Route>
        <Route path='/payment-gateway' element={<PaymentGateway />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/updatebook/:id' element={<UpdateBook />} />
        <Route path='/getdetails/:id' element={<Viewbookdetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      </Routes>
    
    </>
   
  );
};


export default App;