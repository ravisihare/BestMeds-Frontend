import { React, useEffect, useState } from "react";
import MaterialTable from '@material-table/core'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import { Avatar, Divider, Button, TextField, Dialog, DialogActions, DialogContent} from '@mui/material';
import { postDataImage, postData, getData, ServerURL } from "../FetchNodeServer";
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Swal from 'sweetalert2';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    subdiv: {
        backgroundColor: '#7ed6df',
        padding: 10,
        width: "100%",
        marginTop: 50
    }
})

const CssTextField = styled(TextField)({

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: "2px solid white"
        },
        '&:hover fieldset': {
            borderColor: 'lightgrey',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },


    },
});





function DisplayBrands(props) {
    const classes = useStyles();
    const [List, setList] = useState([]);
    const [open, setOpen] = useState(false)
    const [icon, setIcon] = useState({ bytes: "", filename: "/brand.jpeg" })
    const [showButton, setShowButton] = useState(false)
    const [btn, setbtn] = useState(true)
    const [categoryId, setcategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandid, setBrandId] = useState('')
    const [brandname, setBrandName] = useState('')
    const [status, setStatus] = useState('')
    const [tempIcon, settempIcon] = useState('')
    const [Clist, setCList] = useState([])
    const [SClist, setSCList] = useState([])

    const handleIconChange = (event) => {
        setShowButton(true)
        setbtn(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconSave = async () => {
        var formData = new FormData()
        formData.append('brandid', brandid)
        formData.append('brandicon', icon.bytes)
        var result = await postDataImage('brand/editicon', formData)
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
        fetchallbrands()
    }

    const deleteData = async (rowData) => {

        setOpen(false)

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
                var result = postData('brand/deletedata', { brandid: (rowData.brandid) })

                Swal.fire('Deleted!', rowData.brandname + '  Brand has been deleted.', 'success')
                fetchallbrands()
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')

            }


        }
        )
    }

    const handleSubmit = async () => {

        var result = await postData('brand/editdata',
            {
                categoryId: categoryId,
                subcategoryId: subCategoryId,
                brandid: brandid,
                brandname: brandname,
                status: status
            })
        
        setOpen(false)
        if (result.result) {

            Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: 'Your Brand has been Updated',
                showConfirmButton: true,
                timer: 5000
            })
        }
        else {
            Swal.fire({
                position: "top-middle",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Brand',

            })
        }
        fetchallbrands()

    }

    const fetchallbrands = async () => {
        var result = await getData("brand/displayallbrands")
        setList(result.result)
        // alert('subcategories called')
    }



    const fetchSubCategories = async (cid) => {
        var result = await postData("subcategories/displaysubcategorybyid",{categoryid:cid})
        setSCList(result.result)
    }

    const fetchCategories = async () => {
        var result = await getData("categories/displaycategories")
        setCList(result.result)

    }


    useEffect(() => {
        fetchallbrands()
        fetchCategories()
        // fetchSubCategories()
        
    }, [])

    const handleCancel = () => {
        setShowButton(false)
        setbtn(true)
        setTimeout(() => {
            setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
        }, 0.5);

    }

    const handleOpen = (rowData) => {
        fetchSubCategories(rowData.categoryid)
        setStatus(rowData.status)
        setBrandId(rowData.brandid)
        setBrandName(rowData.brandname)
        setSubCategoryId(rowData.subcategoryid)
        setcategoryId(rowData.categoryid)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.brandicon}` })
        setOpen(true)
        settempIcon(rowData.brandicon)
    }
    const handleClose = () => {
        setOpen(false)
        fetchallbrands()
    }

    const handleChange = async(event) => {
        setcategoryId(event.target.value);
        var result = await postData("subcategories/displaysubcategorybyid", { categoryid: event.target.value })
        setSCList(result.result)

    };

    const handleChanged = (event) => {
        setSubCategoryId(event.target.value)


    }


    const fillCategory = () => {
        return Clist.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategory = () => {
        return SClist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }


    const Input = styled('input')({
        display: "none"
      });

    /***Dialog START**** */

    const showDialog = () => {
        return (
            <div>


                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >

                    <DialogContent>
                    <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ color: '#fff', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                                Brand
                            </Grid>
                            <Grid item xs={12}>
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
                                <FormControl fullWidth>
                                    <InputLabel style={{color:'#fff',marginLeft:"12px",marginTop:"-8px"}} id="demo-simple-select-label">Category </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryId}
                                        variant="outlined"
                                        label="Category "
                                        onChange={handleChange}
                                    >
                                        {fillCategory()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel style={{color:'#fff', marginLeft:"12px",marginTop:"-8px"}}  id="demo-simple-select-label">SubCategory </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategoryId}
                                        label="SubCategory "
                                        variant="outlined"

                                        onChange={handleChanged}
                                    >
                                        {fillSubCategory()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField onChange={(event)=>setBrandName(event.target.value)} label="Brand Name" value={brandname} variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#fff" } }} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl fullWidth>
                                    <InputLabel style={{color:'#fff',marginLeft:"12px",marginTop:"-8px"}}  >Status </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status "
                                        variant="outlined"

                                        onChange={(event)=>setStatus(event.target.value)}
                                        
                                    >
                                     <MenuItem value="Trending">Trending</MenuItem> 
                                     <MenuItem value="Top">Top</MenuItem>  
                                     <MenuItem value="Popular">Popular</MenuItem>  

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={()=>handleSubmit()} style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Edit data</Button>
                            </Grid>
                            <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                                    <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth> Upload </Button></label>
                                    {
                                        showButton?<div><Button onClick={handleIconSave} style={{ color: "#ffff", fontWeight: 'bold' }}  >Save </Button>
                                        <Button onClick={handleCancel} style={{ color: "#ffff", fontWeight: 'bold' }}  >Cancel </Button></div>:<></>
                                    }
                                
                            </Grid>
                            <Grid item xs={6} style={{display:"flex",justifyContent:'center',alignItems:"center"}}>
                                <Avatar
                                    src={icon.filename}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </Grid>
                            
                            
                        </Grid>
                    </Grid>
                </div>
            </div>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>

                    </DialogActions>
                </Dialog>
            </div>
            /*Dialog End */
        );

    }







    function display() {
        return (

            <MaterialTable
                title="List of Brand Items"


                columns={[
                    {
                        title: 'Brand ID', field: 'brandid',


                    },
                    {
                        title: <font size="3">Category Name</font>, field: 'categoryname',


                    },
                    {
                        title: <font size="3">Sub Category Name</font>, field: 'subcategoryname',


                    },

                    {
                        title: 'Brand Name', field: 'brandname',


                    },

                    {
                        title: 'Brand Status', field: 'status'
                    },
                    {
                        title: 'Brand Icon', field: 'brandicon',

                        render: rowData => <img src={`${ServerURL}/images/${rowData.brandicon}`} style={{ width: 100, height: "70%", borderRadius: "5px" }} />
                    },

                ]}
                data={List}
                actions={[
                    {
                        icon: "edit",
                        tooltip: 'Edit Brand',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: "delete",
                        tooltip: 'Delete Brand',
                        onClick: (event, rowData) => deleteData(rowData)
                    },

                ]}
            />


        )
    }

    return (
        <div>
            <div className={classes.root}>

                <div className={classes.subdiv}>
                    {display()},
                    {showDialog()}
                </div>

            </div>
        </div>
    )



}




export default DisplayBrands;