import react, { useState, useEffect } from "react"
import { Grid, Button, InputLabel, FormControl } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DropzoneArea } from 'material-ui-dropzone';
import { Select, MenuItem } from '@mui/material'
import { getData, postData, postDataImage } from '../FetchNodeServer'
import Swal from 'sweetalert2'
import DisplayProductImage from "./DisplayPraocutImage";

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

function ProductImage(props) {
  const classes = useStyles();
  const [list, setList] = useState([])
  const [Slist, setSlist] = useState([])
  const [Blist, setBlist] = useState([])
  const [Plist, setPlist] = useState([])
  const [uploadfiles, setFiles] = useState('')
  const [categoryId, setcategoryId] = useState('')
  const [subcategoryId, setsubcategoryId] = useState('')
  const [brandId, setbrandId] = useState('')
  const [productId, setProductId] = useState('')



  const handleImage = (files) => {
    setFiles(files)
  }


  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryId)
    formData.append('subcategoryid', subcategoryId)
    formData.append('brandid', brandId)
    formData.append('productid', productId)
    uploadfiles.map((file, index) => {
      formData.append("image" + index, file)
    })
    var result = await postDataImage('productimages/saveproductimages', formData)
    if (result.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 3000
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Your record has not been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }

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

  const handleBrandChanged = async (event) => {
    setbrandId(event.target.value)
    var result = await postData('product/displayproductbyid', { brandid: event.target.value })
    setPlist(result.result)

  }

  const handleProjectChange = (event) => {
    setProductId(event.target.value)
  }


  useEffect(
    function () {
      fetchCategories()
      fetchSubcategories()
      // fetchBrand()
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

  const fillproduct = () => {
    return Plist.map((item) => {
      return (
        <MenuItem value={item.productid}>{item.productname}</MenuItem>
      )
    })
  }


  const handledisplayproductimage=()=>{
    props.setViewContainer(<DisplayProductImage/>)
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
              ProductImage
            </Grid>
            <Grid item xs={6}> 
            <Button onClick={handledisplayproductimage} style={{ display: 'flex',  background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>list of productimage</Button>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#ffff' }} id="demo-simple-select-label">Category</InputLabel>
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
                <InputLabel style={{ color: '#fff' }} id="demo-simple-select-label">SubCategory</InputLabel>
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#fff' }} id="demo-simple-select-label">Brand</InputLabel>
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
              <FormControl fullWidth>
                <InputLabel style={{ color: '#fff' }} id="demo-simple-select-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productId}
                  label="product "
                  onChange={handleProjectChange}
                >
                  {fillproduct()}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <DropzoneArea
                onChange={handleImage}
                acceptedFiles={['image/jpg', 'image/png','image/JPG', 'image/bmp']}
                maxFileSize={5000000}
                filesLimit={6}
              />
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => handleSubmit()} style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{ display: 'flex', flexDirection: 'row', background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Reset</Button>
            </Grid>

          </Grid>
        </Grid>



      </div>
    </div>
  )
}
export default ProductImage;