import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Clothing from './components/Clothing.js';
import PreCart from './components/PreCart';
import Footer from './components/Footer';
import Landing from './components/Landing';
import SelectedPartner from './components/SelectedPartner';
import Admin from './components/Admin';

function App() {
  return (
    <>
    <Header />
    <div className="h-screen">
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/Clothing' element={<Clothing />}/>
        <Route exact path='/SelectedPartner' element={<SelectedPartner />}/>
        <Route exact path='/PreCart' element={<PreCart />} />
        <Route exact path='/Admin' element={<Admin />} />

      </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App;
