import react, { useState, useEffect } from "react"
import { Grid, Button, TextField, styled, InputLabel, FormControl } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DropzoneArea } from 'material-ui-dropzone';
import { Select, MenuItem } from '@mui/material'
import { getData, postData, postDataImage } from '../FetchNodeServer'
import Swal from 'sweetalert2'
import DisplayAllBanner from "./DisplayAllBanner";

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


export default function Banner(props) {
  const classes = useStyles();
  const [bannerStatus, setBannerStatus]=useState('')

  const [uploadFiles, setUploadFiles] = useState('')

  const handleImage = (files) => {
    setUploadFiles(files)
  }

  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('bannerstatus',bannerStatus)
    uploadFiles.map((file, index) => {
      formData.append("image" + index, file)
    })
    var result = await postDataImage('banner/savebanner', formData)
    if (result.result) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your banner has been saved',
        showConfirmButton: false,
        timer: 3000
      })
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Your banner has not been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  const handleDisplayBanner=()=>{
    props.setViewContainer(<DisplayAllBanner/>)
  }

  return (<div className={classes.root}>
    <div className={classes.subdiv}>
      <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>

        <Grid container spacing={2}>
          <Grid item xs={6}>
           Banner 
          </Grid>
          <Grid item xs={6}>
          <Button onClick={handleDisplayBanner}  style={{ display: 'flex', background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>List of Banner</Button>
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
  </div>)

}
