import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header.js';
import PreCart from './components/PreCart';
import Footer from './components/Footer';
import Landing from './components/Landing';
import SelectedPartner from './components/SelectedPartner';
import RegisterPage from './components/RegisterPage';
import MiscProductPage from './components/MiscProductPage';
import FoodProductPage from './components/FoodProductPage';
import LoginPage from './components/LoginPage';
import AddProductPage from './components/AddProductPage';
import SignIn from './components/SignIn';
import PartnerProfilePage from './components/PartnerProfilePage';
import ApparelProductPage from './components/ApparelProductPage';
import Cart from './components/Cart';
import Search from './components/Search';
import useLocalStorage from "./utils/useLocalStorage"

function App() {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", [])
  
  const handleCartItems = (newItem) => { setCartItems((item) => [...item, newItem]) }
  const handleDelete = (id) => {
    setCartItems(items => {
      return items.filter(item => item.productId !== id)
    })
  }
  const handleCheckOut = () => {
    alert('Thank you for your Order')
    setCartItems([])
    localStorage.clear()
  }

  useEffect(() => {
    setCartItems(cartItems)
  }, [cartItems])
  
  return (
    <>
    <Header cartItems={cartItems} state={cartItems }/>
    <div className="h-screen">
      <Routes>
        <Route exact path='/' element={<Landing cartItems={cartItems}/>} />
        <Route exact path='/ApparelProductPage' element={<ApparelProductPage /> }/>
        <Route exact path='/SelectedPartner' element={<SelectedPartner />}/>
        <Route exact path='/PreCart' element={<PreCart cartItems={cartItems} handleCartItems={handleCartItems} />} />
          <Route exact path='/Cart'
            element={<Cart cartItems={cartItems}
            handleDelete={handleDelete}
            handleCheckOut={handleCheckOut} />}
          />
        <Route exact path='/LoginPage' element={<LoginPage />} />
        <Route exact path='/RegisterPage' element={<RegisterPage />} />
        <Route exact path='/FoodProductPage' element={<FoodProductPage />} />
        <Route exact path='/MiscProductPage' element={<MiscProductPage />} />
        <Route exact path='/AddProductPage' element={<AddProductPage />} />
        <Route exact path='/SignIn' element={<SignIn />} />
        <Route exact path='/PartnerProfilePage' element={<PartnerProfilePage />} />
        <Route exact path='/Search' element={<Search />} />
      
      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
