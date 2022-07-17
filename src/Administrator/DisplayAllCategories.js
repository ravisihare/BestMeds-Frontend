import react from "react"
import { useEffect, useState } from "react"
import MaterialTable from '@material-table/core';
import { Grid, TextField, Avatar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { styled } from "@mui/material/styles";
import { postData, getData, ServerURL, postDataImage } from "../FetchNodeServer";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Swal from "sweetalert2"


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



export default function DisplayCategory() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false)
  const [categoryId, setcategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [icon, setIcon] = useState({ bytes: '', filename: '/3.jpg' })
  const [ShowButton, setShowButton] = useState(false)
  const [TempIcon, setTempIcon] = useState()
  const [btnStatus, setbtnStatus] = useState(true)
  

  const handleSubmit = async () => {
    // alert(categoryId )
    // alert(categoryName)
    var result = await postData("categories/editdata", { categoryid: categoryId, categoryname: categoryName })
    fetchCategories()
    if (result.result) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Your record has not been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleIconChange = (event) => {
    setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    setShowButton(true)
    setbtnStatus(false)
  }

  const handleOpen = (rowData) => {
    setcategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.icon}` })
    setTempIcon(rowData.icon)
    setOpen(true)
  }

  const handleDelete = async (rowData) => {

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
        var dresult = await postData('categories/deletedata', { categoryId: (rowData.categoryid) })
        if (dresult.result)
          Swal.fire(
            'Deleted!',
            'Your category has been deleted.',
            'success'
          )
        fetchCategories()
      }
    })



  }

  const handleClose = () => {
    fetchCategories()
    setOpen(false)
  }
  const handleCancel = () => {
    setShowButton(false)
    setbtnStatus(true)
    setIcon({ bytes: '', filename: `${ServerURL}/images/${TempIcon}` })

  }

  const handleIconSave = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryId)
    formData.append('icon', icon.bytes)
    var result = await postDataImage('categories/editicon', formData)
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
  }

  /***********Dialog*************/

  const ShowDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <Grid style={{ float: "right", fontSize: '25px' }} onClick={handleClose}>
            < CloseOutlinedIcon variant="outlined" fontSize="large" />
          </Grid>
          <div className={classes.root}>
            <div className={classes.subdiv}>

              <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2}>

                  <Grid item xs={12} style={{ color: '#fff', justifyContent: 'center', alignItems: 'center', fontSize: '30px' }}>
                    Edit Category
                  </Grid>
                  <Grid item xs={12} style={{ color: '#fff' }}>
                    <CssTextField variant="outlined" value={categoryName} InputLabelProps={{ style: { color: '#FFF' }, }} inputProps={{ style: { color: "#FFF" } }} onChange={(event) => setCategoryName(event.target.value)} label="Category Name" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={() => handleSubmit()} style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth>Edit Data</Button>
                  </Grid>
                  <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {btnStatus ? <>
                      <label htmlFor="contained-button-file">
                        <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button style={{ background: "#ffff", color: '#7ed6df', fontWeight: 'bold' }} variant="contained" component="span" fullWidth> Upload </Button></label>
                    </> : <></>}

                    {
                      ShowButton ? <div>
                        <Button style={{ background: "#7ed6df", color: '#fff', fontWeight: 'bold' }} component="span" onClick={handleIconSave}> Save </Button>
                        <Button style={{ background: "#7ed6df", color: '#fff', fontWeight: 'bold' }} component="span" onClick={handleCancel}> Cancel </Button>
                      </div> : <></>
                    }


                  </Grid>
                  <Grid item xs={6} style={{ display:'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Avatar
                      src={icon.filename}
                      sx={{ width: 75, height: 75 }}
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

    );

  }
  /******************************** */
  const fetchCategories = async () => {
    var result = await getData('categories/displaycategories')
    setList(result.result)

  }
  useEffect(
    function () {
      fetchCategories()
    }, [])


  function display() {
    return (

      <MaterialTable
        title="Simple Action Preview"
        columns={[
          { title: 'Category ID', field: 'categoryid' },
          { title: 'Category Name', field: 'categoryname' },
          {
            title: 'Icon', field: 'icon',
            render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={
              { width: 75, borderRadius: '25%' }
            } />
          },

        ]}
        data={list}
        actions={[
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
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        {display()}
        {ShowDialog()}
      </div>
    </div>

  )
}