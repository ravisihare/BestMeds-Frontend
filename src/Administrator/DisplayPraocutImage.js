import React from "react";
import { useEffect, useState } from "react"
import MaterialTable from '@material-table/core';
import { Grid, TextField, Avatar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { styled } from "@mui/material/styles";
import { postData, getData, ServerURL, postDataImage } from "../FetchNodeServer";


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



export default function DisplayProductImage() {
    const classes = useStyles();
    const [list, setList] = useState([]);


   
    const fetchProductImage = async () => {
        var result = await getData('productimages/displayproductimages')
        setList(result.result)
    
      }
      useEffect(
        function () {
          fetchProductImage()
        }, [])
    

    function DisplayProducImage() {
        return (
            <MaterialTable
                title="Simple Action Preview"
                columns={[
                    { title: 'Product Image ID', field: 'productimageid' },
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'SubCategory Id', field: 'subcategoryid' },
                    { title: 'Brand Id', field: 'brandid' },
                    { title: 'Product Id', field: 'productid' },



                    {
                        title: 'Icon', field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.image}`} style={
                            { width: 75, borderRadius: '25%' }
                        } />
                    },

                ]}
                data={list}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'edit Data',
                        // onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete Data',
                        // onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
            />

        )
    }


    return (<div className={classes.root}>
        <div className={classes.subdiv}>
            {DisplayProducImage()}

        </div>
    </div>)
}