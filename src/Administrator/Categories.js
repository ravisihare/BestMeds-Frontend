import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Button, Avatar, TextField, Grid } from '@mui/material';
import { styled } from "@mui/material/styles";
import App from "../App";
import { postDataImage } from "../FetchNodeServer";
// import { grid } from "@mui/system";
import Swal from "sweetalert2";
import DisplayCategory from "./DisplayAllCategories";


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'black'
  },
  subdiv: {
    backgroundColor: '#7ed6df',
    padding: 10,
    width: 600,
    marginTop: 50

  }
});
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
});

function Categories(props) {
  const classes = useStyles();
  const [categoryName, setCategoryName] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: '/3.jpg' })
  const handleIconChange = (event) => {
    setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
  }

  const handleSubmit=async()=>{
    var formData= new FormData()
    formData.append('categoryname',categoryName)
    formData.append('icon',icon.bytes)
    var result= await postDataImage('categories/savecategories',formData)
    if(result.result){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 3000
      })
    }
    else
    {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Your record has not been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleDisplayCategory=()=>{
    props.setViewContainer(<DisplayCategory/>)
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ color: '#fff', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
              Categories
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleDisplayCategory} style={{background:"#ffff",color:'#7ed6df',fontWeight:'bold'}} variant="contained" component="span" fullWidth>list categories</Button>
            </Grid>
            <Grid item xs={12} style={{ color: '#fff' }}>
              <CssTextField variant="outlined" InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#FFF" } }} onChange={(event) => setCategoryName(event.target.value)} label="Category Name" fullWidth />
            </Grid>
            <Grid item xs={6} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <label htmlFor="contained-button-file">
                <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                <Button style={{background:"#ffff",color:'#7ed6df',fontWeight:'bold'}} variant="contained" component="span" fullWidth> Upload </Button></label>
            </Grid>
            <Grid item xs={6} style={{display:'flex', justifyContent: 'center', alignItems: 'center' }} >
              <Avatar
                src={icon.filename}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button onClick={()=>handleSubmit()} style={{background:"#ffff",color:'#7ed6df',fontWeight:'bold'}} variant="contained" component="span" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{background:"#ffff",color:'#7ed6df',fontWeight:'bold'}} variant="contained" component="span" fullWidth>Reset</Button>
            </Grid>
            
          </Grid>
        </Grid>
      </div>
    </div>
  )

}
export default Categories;