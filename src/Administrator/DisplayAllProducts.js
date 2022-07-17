import React from "react";
import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles";
import {useState,useEffect} from "react"
import {getData,postData,postDataImage,ServerURL} from "../FetchNodeServer"
import Swal from "sweetalert2"
import {Select,MenuItem,styled,InputLabel,FormControl,Grid,Avatar,TextField} from "@mui/material"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText'
import { Description } from "@material-ui/icons";
const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    subdiv: {
        background: '#7ed6df',
        padding: "20px 20px 0px 20px",
        borderRight: "5px",
        alignItems:'center',
        width: "1200px",
        // height:"100%",
        borderRadius: "10px"
    }


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

const Input = styled('input')({
  display: "none"
});

function DisplayAllProducts(props){
    const classes= useStyles()
    const [list,setList]=useState([])
    const [Slist, setSlist] = useState([])
    const [Blist, setBlist] = useState([])
    const [icon,setIcon]=useState({bytes:'',filename:'/product.jpeg'})
    const [productId,setProductId]=useState('')
    const [open, setOpen]=useState(false)
    const [saleStatus,setsaleStatus]=useState('')
    const [Status,setStatus]=useState('')
    const [Stock,setStock]=useState('')
    const [Offertype,setOffertype]=useState('')
    const[Offerprice,setOfferprice]=useState('')
    const [price,setprice]=useState('')
    const [categoryId, setcategoryId] = useState('')
    const [subcategoryId, setsubcategoryId] = useState('')
    const [brandId, setbrandId] = useState('')
    const [productName,setproductName]=useState('')
    const [description,setDescription]=useState('')
    const [Rating,setRating]=useState('')
    const [showButton,setShowButton]=useState(false)
    const [tempIcon,settempIcon]=useState('')



    const handleIconChange=(event)=>{
      setShowButton(true)
      setIcon({bytes:event.target.files[0],filename:URL.createObjectURL( event.target.files[0])})
    }
const handleIconSave=async()=>{
  var formData = new FormData()
  formData.append('productid', productId)
  formData.append('picture', icon.bytes)
  var result = await postDataImage('product/editicon', formData)
  if (result.result) {
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your icon has been updated',
          showConfirmButton: false,
          timer: 1500
      })
  }
  else {
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Your icon has not been updated',
          showConfirmButton: false,
          timer: 1500
      })
  }
  fetchAllProduct()
}

  const   handleOpen=(rowData)=>{
setOpen(true)
setcategoryId(rowData.categoryid)
setsubcategoryId(rowData.subcategoryid)
setbrandId(rowData.brandid)
setProductId(rowData.productid)
setDescription(rowData.description)
setprice(rowData.price)
setOfferprice(rowData.offerprice)
setOffertype(rowData.offertype)
setStock(rowData.stock)
setStatus(rowData.status)
setsaleStatus(rowData.salestatus)
setproductName(rowData.productname)
setRating(rowData.rating)
setIcon({bytes:'',filename:`${ServerURL}/images/${rowData.picture}`})
settempIcon(rowData.picture)

    }

    const handleClose=()=>{
      setOpen(false)
    }

    const handleSubmit=async()=>{
      var result =await postData('product/editdata',{
        categoryid: categoryId,
        subcategoryid: subcategoryId,
        brandid: brandId,
        productid:productId,
        productname: productName,
        description: description,
        price: price,
        offerprice:Offerprice,
        offertype:Offertype,
        stock:Stock,
        status:Status,
        salestatus:saleStatus,
        rating:Rating

      })
      if(result.result){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Subcategories has been updated",
          showConfirmButton: false,
          timer: 3000,
      });
      }
      else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Your Subcategories has not  been updated",
          showConfirmButton: false,
          timer: 3000,
      });
      }
      fetchAllProduct()
  }

  const handleCancel=()=>{
    setShowButton(false)
    setIcon({bytes:'', filename: `${ServerURL}/images/${tempIcon}`})

  }

    const handleDelete=async(rowData)=>{
      Swal.fire({
        title: 'Are you sure You want to Delete This Record Permanently',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: 'red',
        denyButtonColor: 'green',
        denyButtonText: 'Cancel',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var result = postData('product/deletedata', { productid: (rowData.productid) })

            Swal.fire('Deleted!', rowData.productname + '  Brand has been deleted.', 'success')
            fetchAllProduct()
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')

        }


    }
    )

    }

  const fetchAllProduct=async()=>{
    var result=await getData('product/displayproduct')
    setList(result.result)
  }
  useEffect(
    function(){
      fetchAllProduct()
    },[]
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

/************show Dialog***************** */
const showDialog=()=>{
  return(
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
                        <Grid item xs={12} style={{ color: '#fff', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                            Products
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <CssTextField value={productName} onChange={(event)=>setproductName(event.target.value)} label="Product Name" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField value={description} onChange={(event)=>setDescription(event.target.value)} label="Product Description" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField value={price} onChange={(event)=>setprice(event.target.value)} label="price" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField value={Offerprice} onChange={(event)=>setOfferprice(event.target.value)} label=" Offer price" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField value={Offertype} onChange={(event)=>setOffertype(event.target.value)} label="Offer Type" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField value={Stock} onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                                <InputLabel  style={{color:'#fff'}} id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Status}
                                    label="SubCategory "
                                    onChange={(event)=>setStatus(event.target.value)}
                                >
                                    <MenuItem value="Trending">Trending</MenuItem> 
                                     <MenuItem value="Top">Top</MenuItem>  
                                     <MenuItem value="Popular">Popular</MenuItem>  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                        <CssTextField value={saleStatus} onChange={(event)=>setsaleStatus(event.target.value)} label="sale status" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={4}>
                            <CssTextField value={Rating} onChange={(event)=>setRating(event.target.value)} label="Rating" variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={()=>handleSubmit()} style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Edit Data</Button>
                        </Grid>
                        <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                                    <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth> Upload </Button></label>
                                    {
                                      showButton?<div>
                                      <Button onClick={handleIconSave} style={{ color: '#fff', fontWeight: 'bold' }} > Save </Button>
                                      <Button onClick={handleCancel} style={{ color: '#fff', fontWeight: 'bold' }} > Cancel </Button>
                                      </div>:<></>
                                    }
                        </Grid>
                        <Grid item xs={6} style={{display:"flex", justifyContent:'center',alginItems:'center'}}>
                            <Avatar
                                src={icon.filename}
                                sx={{ width: 56, height: 56 }}
                            />
                        </Grid>
                       
                        
                    </Grid>
                </Grid>

            </div>
        </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>  
        </DialogActions>
      </Dialog>
    </div>
  )
}


/**********display************************ */
    function display(){
        return(
            <div>
                <MaterialTable
      title="Simple Action Preview"
      columns={[
        {title:'Product ID',field:'productid'},
        { title: 'Category Name', field: 'categoryname' },
        { title: 'SubCategory Name', field: 'subcategoryname'},
        { title: 'Brand Name', field: 'brandname' },
        { title: 'Product Name', field: 'productname'},
        {title:'Description', field:'description'},
        {title:'price',field:'price'},
        {title:'Offer price',field:'offerprice'},
        {title:'Offer Type',field:'offertype'},
        {title:'Stock',field:'stock'},
        {title:'Status',field:'status'},
        {title:'Salestatus',field:'salestatus'},
        {title:'Rating', field:'rating'},
        {title:'Picture',field:'picture',
        
        render:rowData=> <img src={`${ServerURL}/images/${rowData.picture}`}
        style={{width:"50px", height:"50px"}}/>
      }
      





      ]}
      data={list}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'edit Data',
          onClick: (event, rowData) => handleOpen(rowData)
        },{
          icon: 'delete',
          tooltip: 'delete Data',
          onClick: (event, rowData) => handleDelete(rowData)
        }
      ]}
    />
            </div>
        )
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {display()}
                {showDialog()}
            </div>
        </div>
        
    )
}
export default DisplayAllProducts;