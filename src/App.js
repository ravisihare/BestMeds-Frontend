import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Subcategories from "./Administrator/Subcategories";
import Categories from "./Administrator/Categories";
import Brand from "./Administrator/Brand";
import DisplayCategory from "./Administrator/DisplayAllCategories";
import DisplayAllSubcategories from "./Administrator/DisplayAllSubcategories";
import DisplayBrands from "./Administrator/DisplayAllBrand";
import Products from "./Administrator/Products";
import DisplayAllProducts from "./Administrator/DisplayAllProducts";
import Adminlogin from "./Administrator/Admin"
import AdminDashboard from "./Administrator/AdminDashboard";
import ProductImage from "./Administrator/ProductImage";
import Header from "./UserInterface/Header"
import Footer from "./UserInterface/Footer";
import Banner from "./Administrator/Banner";
import DisplayAllBanner from "./Administrator/DisplayAllBanner"
import Home from "./UserInterface/Home";
import DisplayProductImage from "./Administrator/DisplayPraocutImage";
import CardButton from "./UserInterface/CardButton";
import SignIn from "./UserInterface/SignIn";
import Productlist from "./UserInterface/Productlist";
import ProductView from "./UserInterface/ProductView"
import ShowCart from "./UserInterface/ShowCart"
import Signup from "./UserInterface/Signup"
function App(props) {
  return (

   <div>
     <BrowserRouter>
     <Routes>
       <Route history={props.history} element={<Categories/>} path="/categories"/>
       <Route history={props.history} element={<Subcategories/>} path="/subcategories"/>
       <Route history={props.history} element={<DisplayCategory/>} path="/displaycategories"/>
       <Route history={props.history} element={<Brand/>} path="/brand"/>
       <Route history={props.history} element={<DisplayAllSubcategories/>} path="/displaysubcategories"/>
       <Route history={props.history} element={< DisplayBrands/> } path="/displaybrand"/>
       <Route history={props.history} element={<Products/>} path="/products"/>
       <Route history={props.history} element={<DisplayAllProducts/>} path="/displayallproducts"/>
       <Route history={props.history} element={<Adminlogin/>} path="/adminlogin"/>
       <Route history={props.history} element={<AdminDashboard/>} path="/admindashboard"/>
       <Route history={props.history} element={<ProductImage/>} path="/productimage"/>
       <Route history={props.history} element={<DisplayProductImage/>} path="/displayproductimage"/>
       <Route history={props.history} element={<Header/>} path="/header"/>
       <Route history={props.history} element={<Footer/>} path="/footer"/>
       <Route history={props.history} element={<Banner/>} path="/banner"/>
       <Route history={props.history} element={<DisplayAllBanner/>} path="/displayallbanner"/>
       <Route history={props.history} element={<CardButton/>} path="/cardbutton"/>
       <Route history={props.history} element={<SignIn/>} path="/signin"/>
       <Route history={props.history} element={<Home/>} path="/home"/>
       <Route history={props.history} element={<Productlist/>} path="/productlist"/>
       <Route history={props.history} element={<ProductView/>} path="/productview"/>
       <Route history={props.history} element={<ShowCart/>} path="/showcart"/>
       <Route history={props.history} element={<Signup/>} path="/signup"/>

     </Routes>

     </BrowserRouter>

   </div>
  );
}

export default App;
