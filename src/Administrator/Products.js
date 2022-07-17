import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles"
import { TextField,Avatar, styled, FormControl, InputLabel, Grid } from "@mui/material"
import { Select, Button, MenuItem } from "@mui/material";
import { getData, postData, postDataImage } from "../FetchNodeServer";
import Swal  from "sweetalert2";
import DisplayAllProducts from "./DisplayAllProducts";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    subdiv: {
        backgroundColor: '#7ed6df',
        padding: 10,
        width: 600,
        marginTop: 50
    }
})
const Input = styled('input')({
    display: 'none',
  });

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1.5px solid #FFF'
        },
        '&:hover fieldset': {
            borderColor: '#FFF',

        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF',

        },

    },
})

function Products(props) {
    const classes = useStyles();
    const [list, setList] = useState([])
    const [Slist, setSlist] = useState([])
    const [Blist, setBlist] = useState([])
    const [categoryId, setcategoryId] = useState('')
    const [subcategoryId, setsubcategoryId] = useState('')
    const [brandId, setbrandId] = useState('')
    const [productName,setproductName]=useState('')
    const [description,setDescription]=useState('')
    const [Rating,setRating]=useState('')
    const [saleStatus,setsaleStatus]=useState('')
    const [Status,setStatus]=useState('')
    const [Stock,setStock]=useState('')
    const [Offertype,setOffertype]=useState('')
    const[Offerprice,setOfferprice]=useState('')
    const [Price,setPrice]=useState('')
    const [icon,setIcon]=useState({bytes:'',filename:'/product.jpeg'})
    /***********function********************** */

    const handleIconChange=(event)=>{
        setIcon({bytes:event.target.files[0],filename:URL.createObjectURL( event.target.files[0])})
    }

    const handleSubmit=async()=>{
        var  formData =new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subcategoryId)
        formData.append('brandid',brandId)
        formData.append('productname',productName)
        formData.append('description',description)
        formData.append('price',Price)
        formData.append('offerprice',Offerprice)
        formData.append('offertype',Offertype)
        formData.append('stock',Stock)
        formData.append('status',Status)
        formData.append('salestatus',saleStatus)
        formData.append('rating',Rating)
        formData.append('picture',icon.bytes)
        var result = await postDataImage('product/saveproduct',formData)
        if(result.result)
        {Swal.fire({
        
         icon: 'success',
         title: 'Your product has been saved',
         showConfirmButton: false,
         timer: 1500
       })}
     else
     {
       Swal.fire({
        
         icon: 'error',
         title: 'Your product has not been saved',
         showConfirmButton: false,
         timer: 1500
       })
     }
    }
    const fetchCategories = async () => {
        var result = await getData('categories/displaycategories')
        setList(result.result)

    }
    const fetchSubcategories = async () => {
        var result = await getData('subcategories/displaysubcategory')
        setSlist(result.result)
    }
    const fetchBrand = async () => {
        var result = await getData('brand/displayallbrands')
        setBlist(result.result)
    }

    useEffect(
        function () {
            fetchCategories()
            fetchSubcategories()
            fetchBrand()
        }, []
    )


    const fillCategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

            )
        })
    }

    const fillSubcategory = () => {
        return Slist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })

    }

    const fillbrand = () => {
        return Blist.map((item) => {
            return (
                <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
            )
        })
    }

    const handleDisplayProduct=()=>{
        props.setViewContainer(<DisplayAllProducts/>)
    }

    const handleChange = async (event) => {
        setcategoryId(event.target.value);
        // setsubcategoryId(event.target.value);
        var result = await postData('subcategories/displaysubcategorybyid', { categoryid: event.target.value })
        setSlist(result.result)
    };

    const handleChanged = async (event) => {
        setsubcategoryId(event.target.value)
        var result = await postData('brand/displaybrandbyid', { subcategoryid: event.target.value })
        setBlist(result.result)
    }
    const handleBrandChanged = (event) => {
        setbrandId(event.target.value)

    }
   
    return (
        <div className={classes.root}>
            <style jsx>
                                {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: white !important;
        }
        svg.MuiSvgIcon-root {
          color: white !important;
        }
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
      `}
      </style>
            <div className={classes.subdiv}>
                <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{ color: '#fff', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                            Products
                        </Grid>
                        <Grid item xs={6}>
                        <Button onClick={handleDisplayProduct} style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>list Products</Button>

                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel style={{color:'#ffff'}} id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryId}
                                    label="Category"
                                    onChange={handleChange}
                                >
                                    {fillCategory()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel  style={{color:'#fff'}} id="demo-simple-select-label">SubCategory</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subcategoryId}
                                    label="SubCategory "
                                    onChange={handleChanged}
                                >
                                    {fillSubcategory()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel style={{color:'#fff'}}  id="demo-simple-select-label">Brand</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={brandId}
                                    label="Brand "
                                    onChange={handleBrandChanged}
                                >
                                    {fillbrand()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setproductName(event.target.value)} label="Product Name" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setDescription(event.target.value)} label="Product Description" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setOfferprice(event.target.value)} label=" Offer Price" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setOffertype(event.target.value)} label="Offer Type" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                                <InputLabel  style={{color:'#fff'}} id="demo-simple-select-label">sale Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={saleStatus}
                                    label="SubCategory "
                                    onChange={(event)=>setsaleStatus(event.target.value)}
                                >
                                    <MenuItem value="Trending">Trending</MenuItem> 
                                     <MenuItem value="Top">Top</MenuItem>  
                                     <MenuItem value="Popular">Popular</MenuItem>  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <CssTextField onChange={(event)=>setStatus(event.target.value)} label=" Status" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField onChange={(event)=>setRating(event.target.value)} label="Rating" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <label  >
                                <Input type="file" onChange={(event)=>handleIconChange(event)}/>
                            <Button  type="file" style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>
                                Upload
                            </Button></label>
                        </Grid>
                        <Grid item xs={6} style={{display:"flex", justifyContent:'center',alginItems:'center'}}>
                            <Avatar
                                src={icon.filename}
                                sx={{ width: 56, height: 56 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={()=>handleSubmit()} style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Reset</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}
export default Products;