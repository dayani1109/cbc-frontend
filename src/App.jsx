import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/adminPage';
import HomePage from './pages/homePage';
import TestPage from './pages/test';

function App() {
  

  return (
    <BrowserRouter>
      <div className ="w-full h-[100vh]">
        <Routes path = "/" > {/*install karagatta router-dom ekem ganne meka component ekak */}

          {/*  me vage Route gdk dagann puluvam */}
          <Route path = "/*" element ={<HomePage/>} /> 
          <Route path = "/register" element ={<h1>Register Page </h1>}/>
          <Route path = "/admin/*" element ={<AdminPage/>}/>
          <Route path = "/test" element ={<TestPage/>}/>


        </Routes>
      </div>

    </BrowserRouter>
    
  );
}

export default App;
