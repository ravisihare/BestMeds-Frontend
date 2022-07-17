import React, { useEffect } from "react"
import { useState } from "react"
import MaterialTable from "@material-table/core"
import { postData, getData, postDataImage, ServerURL } from "../FetchNodeServer";
import { makeStyles, styled } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import { Button, TextField, Grid, Avatar } from '@mui/material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TextFieldsTwoTone } from "@material-ui/icons";
import { borderColor } from "@mui/system";

/***********css table********************/

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    subdiv: {
        backgroundColor: '#7ed6df',
        padding: 10,
        width: 900,
        marginTop: 50

    }
})


const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '1.5px solid #FFF',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#FFF',

        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF',

        },

    },
});

const Input = styled('input')({
    display: "none"
});


export default function DisplayAllSubcategories() {
    const [list, setList] = useState([]);
    const [Slist, setSList] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [categoryId, setcategoryId] = useState('')
    const [categoryName, setcategoryName] = useState('')
    const [subcategoryName, setsubcategoryName] = useState('')
    const [subcategoryDesc, setsubcategoryDesc] = useState('')
    const [ShowButton, setShowButton] = useState(false)
    const [icon, setIcon] = useState({ bytes: '', filename: '/sub.png' })
    const [TempIcon, setTempIcon] = useState()
    const [subcategoryId, setsubcategoryId] = useState('')
    const [btnStatus, setbtnStatus] = useState(true)

    /***********function*********** */
    const handleOpen = (rowData) => {
        setcategoryId(rowData.categoryid)
        setcategoryName(rowData.categoryname)
        setsubcategoryId(rowData.subcategoryid)
        setsubcategoryName(rowData.subcategoryname)
        setsubcategoryDesc(rowData.description)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.icon}` })
        setTempIcon(rowData.icon)
        setOpen(true)
        fillCategory()
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        var result = await postData("subcategories/editdata", {
            categoryid: categoryId,
            subcategoryid: subcategoryId,
            subcategoryname: subcategoryName,
            description: subcategoryDesc,
        });
        if (result.result) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Subcategories has been updated",
                showConfirmButton: false,
                timer: 3000,
            });
            fetchSubCategories()
        }


    }

    const handleCancel = () => {
        setShowButton(false)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${TempIcon}` })
    }
    const handleIconChange = (event) => {
        setbtnStatus(false)
        setIcon({
            bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]
            )
        })
        setShowButton(true)

    }

    const handleIconSave = async () => {
        var formData = new FormData()
        formData.append('subcategoryid', subcategoryId)
        formData.append('icon', icon.bytes)
        var result = await postDataImage('subcategories/editicon', formData)
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
        fetchSubCategories()
    }

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                var result = await postData('subcategories/deletedata', { subcategoryId: (rowData.subcategoryid) })
                if (result.result) {
                    Swal.fire("Deleted!", "Your Sub-Category has been deleted.", "success");
                    fetchSubCategories();
                }
            }
        });
    }
    /**************fetchsubcategory********************** */

    const fetchCategories = async () => {
        var result = await getData('categories/displaycategories')
        setList(result.result)
    }



    useEffect(
        function () {
            fetchCategories()
        }, [])

    const fillCategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

            )
        })
    }

    const handleChange = (event) => {
        setcategoryId(event.target.value);

    };

    /*******Dialog**************/

    function ShowDialog() {
        return (
            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <div>
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
                            <Grid  >
                                <Grid style={{ float: "right", fontSize: '25px' }} onClick={handleClose}>
                                    < CloseOutlinedIcon variant="outlined" fontSize="large" />
                                </Grid>
                                <div className={classes.root}>
                                    <div className={classes.subdiv}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} style={{ color: '#fff', fontSize: '30px' }}>
                                                Subcategories
                                            </Grid>
                                            <Grid item xs={12} style={{ color: '#fff' }}>
                                                <FormControl  fullWidth>
                                                    <InputLabel style={{color:'#fff'}}  
                                                    id="demo-simple-select-label">Category Id</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={categoryId}
                                                        label="Category Id"
                                                        onChange={handleChange}
                                                    >
                                                        {fillCategory()}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} style={{ color: '#fff' }}>
                                                <CssTextField value={subcategoryName} onChange={(event) => setsubcategoryName(event.target.value)} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#fff' } }} label="Subcategory Name" fullWidth />
                                            </Grid>
                                            <Grid item xs={12} style={{ color: '#fff' }}>
                                                <CssTextField value={subcategoryDesc} onChange={(event) => setsubcategoryDesc(event.target.value)} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#fff' } }} label="Subcategory Description" fullWidth />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button onClick={() => handleSubmit()} style={{ color: '#7ed6df', backgroundColor: '#fff' }} fullWidth type="submit" variant="contained" >Edit</Button>

                                            </Grid>

                                            <Grid item xs={6} style={{ color: '#fff' }}>
                                                {btnStatus ? <>
                                                    <label htmlFor="contained-button-file">
                                                        <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                                        <Button style={{ justifyContent: "center", alignItems: "center", background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth> Upload </Button></label>
                                                </> : <></>}
                                                {ShowButton ? <div>
                                                    <Button onClick={handleIconSave} style={{
                                                        justifyContent: "center", alignItems: "center", color: '#fff', fontWeight: 'bold'
                                                    }} component="span" > Save </Button>
                                                    <Button onClick={handleCancel} style={{
                                                        justifyContent: "center", alignItems: "center",
                                                        color: '#fff', fontWeight: 'bold'
                                                    }} > Cancel </Button>
                                                </div> : <></>}
                                            </Grid>


                                            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <Avatar
                                                    src={icon.filename}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                            </Grid>


                                        </Grid>
                                    </div>
                                </div>
                            </Grid>


                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    /**********display list of subcategory************** */

    const fetchSubCategories = async () => {
        var result = await getData("subcategories/displayallsubcategory");
        setSList(result.result);
    };

    useEffect(function () {
        fetchSubCategories();
    }, []);


    function display() {

        return (
            <MaterialTable
                title="list of subcategory"
                columns={[
                    { title: 'Subcategory ID', field: 'subcategoryid' },
                    { title: 'Category Name', field: 'categoryname' },
                    { title: 'Subcategory Name', field: 'subcategoryname' },
                    { title: 'Description', field: 'description' },
                    {
                        title: 'Icon', field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: '50%' }} />
                    }
                ]}
                data={Slist}
                actions={
                    [
                        {
                            icon: 'edit',
                            tooltip: 'edit Data',
                            onClick: (event, rowData) => handleOpen(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'delete Data',
                            onClick: (event, rowData) => handleDelete(rowData)
                        }
                    ]}
            />
        )
    }

    /******************************************** */

    return (
        <div className={classes.root}>

            <div className={classes.subdiv}>
                {display()}
                {ShowDialog()}
            </div>
        </div>

    )

}
