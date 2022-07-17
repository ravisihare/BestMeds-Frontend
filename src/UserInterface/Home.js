import React, { useState, useEffect, createRef } from 'react';
import { makeStyles } from "@material-ui/core"

import { postData, getData, ServerURL } from "../FetchNodeServer"
import Footer from './Footer'
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Header from "./Header"
import CardButton from './CardButton';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
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

var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 4,
  slidesToScroll: 1,
  //autoplay: true,
  //autoplaySpeed: 2000,
};
var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function Home(props) {
  var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
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

  const fetchAllCategories = async () => {
    var result = await getData('categories/displaycategories')
    setCategory(result.result)

  }

  const fetchAllBanners = async () => {
    var result = await getData('banner/displayallbanner')
    setBanner(result.result)

  }

  const fetchAllBrands = async () => {
    var result = await postData('brand/displayallbrandsbystatus', { status: 'Popular' })
    setBrand(result.result)

  }

  const fetchAllProducts = async () => {
    var result = await postData('product/productbysalestatus', { salestatus: 'trending' })
    setProducts(result.result)
  }



  const fetchAllSubCategories = async (categoryid) => {
    var result = await postData('subcategories/displaysubcategory', { categoryid: categoryid })
    setSubCategory(result.result)

  }

  useEffect(function () {
    fetchAllCategories()
    fetchAllBanners()
    fetchAllBrands()
    fetchAllProducts()
  }, [])

  const handleQtyChange = (value, item) => {
    item['qty'] = value
    if (value > 0) {
      dispatch({ type: 'ADD_Product', payload: [item.productid, item] })
    }
    else {
      dispatch({ type: 'DEL_Product', payload: [item.productid] })

    }
    setRefresh(!Refresh)
  }

  const handleproductlist = (categoryid) => {
    navigate("/productlist", { state: { categoryid: categoryid } })

  }

  const showMainCategories = () => {
    return category.map((item, index) => {
      return (
        <div>
          <div className={classes.subdiv} onClick={() => handleproductlist(item.categoryid)}>

            <div style={{ padding: 10 }}>
              <img src={`${ServerURL}/images/${item.icon}`} style={{ width: 150, height: 150 }} />
            </div>
            <div style={{ fontFamily: 'Sarabun', fontSize: 20 }}>
              {item.categoryname}
            </div>
          </div>
        </div>
      )
    })
  }

  const showMainProducts = () => {
    return products.map((item, index) => {
      return (
        <div>
          <div className={classes.subdiv}>
            <div style={{ padding: 10 }}>
              <img onClick={() => navigate("/productview", { state: { product: item } })} src={`${ServerURL}/images/${item.picture}`} style={{ width: 150, height: 150 }} />
            </div>

            <div >
              <div style={{ fontWeight: 'bolder' }}>{item.productname}</div>
              <div> price: &#8377; {item.offerprice}<s style={{ color: 'red' }}> &#8377; {item.price}</s></div>
              <div style={{ color: 'green' }}>you save: {item.price - item.offerprice}</div>
            </div>
            <div >
              {<CardButton onChange={(value) => handleQtyChange(value, item)} />}
            </div>
          </div>
        </div>
      )
    })
  }

  const trendingtoday = () => {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ padding: 10 }}>
          <img src="/coupon1.jpg" style={{ width: '90%' }} />
        </div>
        <div style={{ padding: 10 }}>
          <img src="/coupon2.jpg" style={{ width: '90%' }} />
        </div>
        <div style={{ padding: 10 }}>
          <img src="/coupon3.jpg" style={{ width: '90%' }} />
        </div><div style={{ padding: 10 }}>
          <img src="/coupon4.jpg" style={{ width: '90%' }} />
        </div><div style={{ padding: 10 }}>
          <img src="/coupon5.jpg" style={{ width: '90%' }} />
        </div>
      </div>
    )
  }



  const showMainBrands = () => {
    return brand.map((item, index) => {
      return (
        <div>
          <div className={classes.subdiv}>

            <div style={{ padding: 10 }}>
              <img src={`${ServerURL}/images/${item.brandicon}`} style={{ width: 200 }} />
            </div>
          </div>
        </div>


      )


    })


  }




  const showAllBanners = () => {
    return banner.map((item, index) => {
      return (
        <div>
         
          <div style={{ padding: 10 }}>
            <img src={`${ServerURL}/images/${item.bannerpicture}`}  width="100%"/>
          </div>
        </div>


      )


    })


  }







  const showSubCategories = () => {
    return subcategory.map((item) => {
      return (

        <MenuItem>{item.subcategoryname}</MenuItem>
      )


    })


  }

  return (<div>
    <Header style={{ width: '100%' }} />

    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ width: '95%' }}>

        <Slider {...bannersettings}  >
          {/* {matches?<></>} */}
          {showAllBanners()}
        </Slider>
      </div>
    </div>

    {/* {paymentoffer()} */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {trendingtoday()}

    </div>
    {/*////////categories list ///////////////*/}
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'Sarabun', fontSize: 32, fontWeight: 'bold' }}>Shop By Category</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >

        <ArrowBackIos onClick={() => categoriesSlider.current.slickPrev()} style={{ cursor: "pointer", fontSize: 42, color: '#95a5a6' }} />
      </div>

      <div style={{ width: '90%', border: 0 }}>

        <Slider {...settings} ref={categoriesSlider} >
          {showMainCategories()}
        </Slider>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >

        <ArrowForwardIosIcon onClick={() => categoriesSlider.current.slickNext()} style={{ cursor: "pointer", fontSize: 42, color: '#95a5a6' }} />
      </div>

    </div>
    {/*/////////////////////////////////////*/}



    {/*////////brand list ///////////////*/}
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'Sarabun', fontSize: 32, fontWeight: 'bold' }}>Popular Brands</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >

        <ArrowBackIos onClick={() => brandSlider.current.slickPrev()} style={{ cursor: "pointer", fontSize: 42, color: '#95a5a6' }} />
      </div>

      <div style={{ width: '90%' }}>

        <Slider {...settings} ref={brandSlider} >
          {showMainBrands()}
        </Slider>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >

        <ArrowForwardIosIcon onClick={() => brand.current.slickNext()} style={{ cursor: "pointer", fontSize: 42, color: '#95a5a6' }} />
      </div>

    </div>
    <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center' }}>
      {showMainProducts()}
    </div>
    {/*/////////////////////////////////////*/}
    {/*****Footer*********** */}


    {<Footer />}
    {/************************** */}

  </div>)

}