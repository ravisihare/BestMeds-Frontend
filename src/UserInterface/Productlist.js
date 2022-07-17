import React, { useState, useEffect, createRef } from "react"
import { makeStyles } from "@material-ui/core"
import Header from "./Header"
import CardButton from './CardButton';
import { postData, getData, ServerURL } from "../FetchNodeServer"
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { useNavigate,useLocation } from "react-router-dom";
const useStyles = makeStyles({
  root: {

    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'


  },
  subdiv: {
    padding: 15,
    width: 250,
    marginTop: 50,
    height: 300,
    border: '0.5px solid #95a5a6',
    borderRadius: 2,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})


export default function Productlist(props){

    const classes = useStyles();
  var categoriesSlider = createRef()
  var brandSlider = createRef()
  const [category, setCategory] = React.useState([])
  const [brand, setBrand] = React.useState([])
  const [banner, setBanner] = React.useState([])
  const [subcategory, setSubCategory] = React.useState([])
  const [products, setProducts] = useState([])
  const [Refresh, setRefresh] = useState(false)

  var dispatch = useDispatch()
  var navigate = useNavigate()
  var location = useLocation()

  const fetchAllCategories = async () => {
    var result = await getData('categories/displaycategories')
    setCategory(result.result)

  }


  const fetchAllBrands = async () => {
    var result = await postData('brand/displayallbrandsbystatus', { status: 'Popular' })
    setBrand(result.result)

  }

  const fetchAllProducts = async () => {
    var result = await postData('product/displayproductbycategoryid', { categoryid:location.state.categoryid })
    setProducts(result.result)
  }



  useEffect(function () {
    fetchAllProducts()
    // fetchAllCategories()
    // fetchAllBrands()
  }, [])



  const showMainProducts = () => {
    return products.map((item, index) => {
      return (
        <div>
          <div className={classes.subdiv}>
            <div style={{ padding: 10 }}>
              <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 150, height: 150 }} />
            </div>

            <div >
              <div  style={{ fontWeight: 'bolder' }}>{item.productname}</div>
              <div> price: &#8377; {item.offerprice}<s style={{color:'red'}}> &#8377; {item.price}</s></div>
              <div style={{ color: 'green' }}>you save: {item.price - item.offerprice}</div>
            </div>
            <div >
              {<CardButton  onChange={(value) => handleQtyChange(value, item)} />}
            </div>
          </div>
        </div>
      )
    })
  }


  const handleQtyChange = (value, item) => {
    item['qty']=value
    if (value > 0) {
      dispatch({ type: 'ADD_Product', payload: [item.productid, item] })
    }
    else {
      dispatch({ type: 'DEL_Product', payload: [item.productid] })

    }
    setRefresh(!Refresh)
  }


    return(
        <div>
            <Header/>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'wrap'}}>
            {showMainProducts()}

            </div>
            <Footer/>
        </div>
    )
}