import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button, TextField, Grid, Avatar} from "@mui/material";
import { styled } from "@mui/material/styles";
import { postDataImage, getData } from "../FetchNodeServer";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import DisplayAllSubcategories from "./DisplayAllSubcategories"

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
    display: 'none',
  });
  

function Subcategories(props) {
    const classes = useStyles();
    const [categoryId, setcategoryId] = useState('')
    const [Subcategoryname, setSubcategoryname] = useState('')
    const [Subcategorydesc, setSubcategorydesc] = useState('')
    const [icon, seticon] = useState({ bytes: '', filename: '/sub.png' })
    const [list, setList] = useState([])

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
    const handleIconChange = (event) => {
        seticon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }
    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append("categoryid", categoryId);
        formData.append("subcategoryname", Subcategoryname);
        formData.append("description", Subcategorydesc);
        formData.append("icon", icon.bytes);
        var result = await postDataImage("subcategories/subsavecategories", formData);
        if(result.result)
         {Swal.fire({
         
          icon: 'success',
          title: 'Your SubCategory has been saved',
          showConfirmButton: false,
          timer: 1500
        })}
      else
      {
        Swal.fire({
         
          icon: 'error',
          title: 'Fail to submit Sub Category',
          showConfirmButton: false,
          timer: 1500
        })
      }

      
    
      };

      const handleDisplaySubcategory=()=>{
        props.setViewContainer(<DisplayAllSubcategories/>)
    }
    return (
        <div>
            <Grid  >
                <div className={classes.root}>
                    <div className={classes.subdiv}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ color: '#fff', fontSize: '30px' }}>
                                Subcategories
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleDisplaySubcategory} style={{ color: '#7ed6df', backgroundColor: '#fff' }} fullWidth type="submit" variant="contained" >list Subcategories</Button>

                            </Grid>
                            <Grid item xs={12} style={{ color: '#fff' }}>
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
                                    <InputLabel style={{color:'#fff'}} id="demo-simple-select-label">Category Id</InputLabel>
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
                                <CssTextField onChange={(event) => setSubcategoryname(event.target.value)} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#fff' } }} label="Subcategory Name" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ color: '#fff' }}>
                                <CssTextField onChange={(event) => setSubcategorydesc(event.target.value)} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#fff' } }} label="Subcategory Description" fullWidth />
                            </Grid>
                            <Grid item xs={6} style={{ color: '#fff' }}>
                                <label htmlFor="contained-button-file">
                                    <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth> Upload </Button></label>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Avatar
                                    src={icon.filename}
                                    sx={{ width: 56, height: 56 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={() => handleSubmit()} style={{ color: '#7ed6df', backgroundColor: '#fff' }} fullWidth type="submit" variant="contained" >Submit</Button>

                            </Grid>
                            <Grid item xs={6}>
                                <Button style={{ color: '#7ed6df', backgroundColor: '#fff' }} fullWidth type="submit" variant="contained" >Reset</Button>

                            </Grid>

                        </Grid>
                    </div>
                </div>
            </Grid>


        </div>
    )
}

export default Subcategories;