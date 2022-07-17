import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core"
import { Grid } from "@mui/material"
import { getData, ServerURL } from '../FetchNodeServer'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const useStyles = makeStyles({
    root: {
        display: 'flex',
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

    },
    banner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        width: '100%',
        height: 100,
        // backgroundColor: '#fff'
    },
    showcart: {
        width: 500,
        height: 500,
        margin: 20,
        backgroundColor: '#fff'
    },
    promode: {
        width: 200,
        height: 100,
        margin: 10,
        backgroundColor: '#fff'
    }
})

var bannersettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

export default function ShowCart() {
    const classes = useStyles()
    const [banner, setBanner] = useState([])

    const fetchAllBanners = async () => {
        var result = await getData('banner/displayallbanner')
        setBanner(result.result)

    }
    useEffect(function () {
        fetchAllBanners()
    },[])


    const showAllBanners = () => {
        return banner.map((item, index) => {
            return (
                <div>
                    <div style={{ padding: 10 }}>
                        <img src={`${ServerURL}/images/${item.bannerpicture}`} />
                    </div>
                </div>


            )


        })


    }


    return (

        <div className={classes.root} >
            <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <div className={classes.banner}>
                            <Slider {...bannersettings}  >
                                {showAllBanners()}
                            </Slider>
                        </div>
                        <div className={classes.showcart}>

                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.promode}>

                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div >

    )
}