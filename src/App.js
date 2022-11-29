import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <>
    <Header />
    <div className="h-screen">
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/ApparelProductPage' element={<ApparelProductPage />}/>
        <Route exact path='/SelectedPartner' element={<SelectedPartner />}/>
        <Route exact path='/PreCart' element={<PreCart />} />
        <Route exact path='/Cart' element={<Cart />} />
        <Route exact path='/LoginPage' element={<LoginPage />} />
        <Route exact path='/RegisterPage' element={<RegisterPage />} />
        <Route exact path='/FoodProductPage' element={<FoodProductPage />} />
        <Route exact path='/MiscProductPage' element={<MiscProductPage />} />
        <Route exact path='/AddProductPage' element={<AddProductPage />} />
        <Route exact path='/SignIn' element={<SignIn />} />
        <Route exact path='/PartnerProfilePage' element={<PartnerProfilePage />} />
      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
