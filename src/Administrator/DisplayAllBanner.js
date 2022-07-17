import React, { useEffect, useState } from "react"
import MaterialTable from "@material-table/core";
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { styled, makeStyles } from '@mui/styles';
import { ServerURL,getData,postDataImage,postData } from '../FetchNodeServer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { DropzoneArea } from 'material-ui-dropzone';

const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 900,
    marginTop: 50

  },

  croot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  csubdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 700,
    marginTop: 50

  },
});
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




export default function DisplayAllBanner(props) {
  var classes = useStyles()
  const [listbanner, setListBanner] = useState([])
  const [bannerid, setBannerId] = useState('')
  const [open,setOpen]=useState(false)
   const [bannerstatus, setBannerStatus] = useState('')
  const [bannerpicture, setBannerPicture] = useState({ bytes: '', filename: '/image.png' })


  const fetchAllBanner = async () => {
    var result = await getData("banner/displayallbanner")
    setListBanner(result.result)
  }

  const handleClose=()=>{
    setOpen(false)
  }

  
  useEffect(function () {

    fetchAllBanner()

  }, [])


  const handleOpen=(rowData)=>{

    setBannerId(rowData.bannerid)
    setBannerStatus(rowData.bannerstatus)
setOpen(true)
  }
  
  
  const handleDeleteData = async (rowData) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
    
      if (result.isConfirmed) {
        var dresult = await postData('banner/deletebanner', {bannerid: (rowData.bannerid) })
        if (dresult.result)
          Swal.fire(
            'Deleted!',
            'Your banner has been deleted.',
            'success'
          )
        fetchAllBanner()

      }
    })


  }

  const handleSubmit=()=>{

  }
const handleImage=()=>{

}

  
function ShowDialog(){
  return(
    <div>
     
 
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         
        </DialogTitle>
        <DialogContent>
        <div className={classes.root}>
    <div className={classes.subdiv}>
      <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>

        <Grid container spacing={2}>
          <Grid item xs={6}>
           Banner 
          </Grid>
          
          <Grid item xs={12} style={{ color: '#fff' }}>
            <CssTextField variant="outlined" onChange={(event)=>setBannerStatus(event.target.value)} InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#FFF" } }} label="Banner Status" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <DropzoneArea
              onChange={handleImage}
              acceptedFiles={['image/jpg', 'image/png', 'image/bmp','image/jpeg']}
              maxFileSize={5000000}
              filesLimit={6}
            />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={() => handleSubmit()} style={{ display: 'flex', background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button style={{ display: 'flex', justifyContent: 'center', alginItem: 'center', background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Reset</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );

}
  
  function displayAll() {
    return (
      <MaterialTable
        title="List of Banners"
        columns={[
          { title: 'Banner Id', field: 'bannerid' },
          { title: 'Banner Status', field: 'bannerstatus' },
          {
            title: 'Picture', field: 'bannerpicture',
            render: rowData => <img src={`${ServerURL}/images/${rowData.bannerpicture}`} style={{ width: 50, borderRadius: '50%' }} />
          },

        ]}
        data={listbanner}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category ',
            onClick: (event, rowData) => handleOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Banner ',
             onClick: (event, rowData) => handleDeleteData(rowData)
          }
        ]}
      />
    )
  }


  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        {displayAll()}
        {ShowDialog()}
       
      </div>
    </div>

  )

}


