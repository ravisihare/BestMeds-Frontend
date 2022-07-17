import React, {useState,useEffect} from "react"
import { Grid,Button, Divider,TextField } from "@mui/material"
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {getData} from "../FetchNodeServer"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Footer() {
    var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [category,setCategory]=useState([])

    const FetchAllCategories=async ()=>{
        var result=await getData('categories/displaycategories')
        setCategory(result.result)
    }

    useEffect(function(){
        FetchAllCategories()
    },[])

    const showMainCategory=()=>{
        return category.map((item,index)=>{
           
                return(
                    <>
                    {
                    index <=3?<>
                    <div style={{marginRight:'100px'}}>
                     <Button style={{color:'rgba(11,18,25,.5)'}}>{item.categoryname}</Button>   
                    </div>
                    </>:<></>}</>
                )
                
            })
        
    }

    return (
        <div>
            <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Grid container style={{ marginTop: '100px', paddingLeft: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row' }}>
                        <img src="/bestmedslogo.webp" style={{ height: 80, width: 80 }}></img>
                        <h3 style={{ color: 'lightblue', fontSize: "20px" }}><span style={{ fontSize: "35px", color: 'blue' }}> B</span >estMeds.com</h3>
                    </Grid>
                    <Grid item xs={8} style={{ paddingRight: 300, color: "rgba(11,18,25,.5)", fontSize: '20px' }}>

                        Bestmeds.com, India Ki Pharmacy, is brought to you by the Dadha & Company – one of India’s most trusted pharmacies, with over 100 years’ experience in dispensing quality medicines.
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row',marginTop:10,padding:100 }}>
                        <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3>company</h3>
                            <div >
                                <p >About Bestmeds</p>
                                <p>  Customer speak</p>
                                <p>  In the News </p>
                                <p>  Carrer</p>
                                <p> Terms and Condition </p>
                                <p> Privacy Policy </p>
                                <p> Fees and Payments Policy </p>
                                <p> Shipping and delivering Policy </p>
                                <p> Return, Replacement and Cancellation Policy </p>
                                <p>Contact</p>
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3>Shopping</h3>
                            <div>
                                <p>Browse by A-Z</p>
                                <p>Browse By Manufacture</p>
                                <p>Health Articles</p>
                                <p>offer/coupons</p>
                                <p>FAQs</p>
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{color:'rgb(51, 51, 51)'}} >
                            <h3>Category</h3>
                           
                            {showMainCategory()}

                         
                        </Grid>
                        <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3>Subscribe to our newsletter</h3>
                            <div>
                                <p>Get a free subscription to our health and fitness tip and stay tuned to our latest offers
                                </p>
                                <TextField   label="Enter Your Email" fullWidth />
                                {/* <ArrowForwardIcon/> */}
                                <img style={{width:'300px', height:'60px'}} src="/footer_image.jpeg"/>
                            
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;