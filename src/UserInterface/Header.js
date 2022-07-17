import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { getData, postData, ServerURL } from "../FetchNodeServer"
import Footer from './Footer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux'
import Popover from '@mui/material/Popover';
import {useNavigate} from "react-router-dom"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header() {
    var theme=useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    // console.log(matches)
    const [category, setCategory] = useState([])
    const [subCategory, setSubcategory] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    var products = useSelector((state) => state.Product)
    var keys = Object.keys(products).length
    console.log(keys)
    var listproducts = Object.values(products)
    var navigate=useNavigate()
    const [panchorEl, setPAnchorEl] = React.useState(null);

    var totalamount=listproducts.reduce(calculatetotal,0)
    function calculatetotal(p,n){
        return(p+(n.price*n.qty))
    }

    var offeramount=listproducts.reduce(calculateoffer,0)
    function calculateoffer(p,n){
        return(p+(n.offerprice*n.qty))
    }

    const handlePopoverOpen = (event) => {
        setPAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setPAnchorEl(null);
    };

    const popopen = Boolean(panchorEl);

    const showCartItems = () => {
        return listproducts.map((item, index) => {
          return (<>
            {index < 2 ? <>
              <Grid item xs={8}>
                <span style={{ fontWeight: 'normal', letterSpacing: 2 }}>{item.productname}</span>
              </Grid>
              <Grid item xs={4}>
                <span style={{ fontWeight: 'normal', display: 'flex', justifyContent: 'right' }}>&#8377; {item.price}x{item.qty}</span>
              </Grid>
            </> : <></>}
    
    
          </>)
        })
    
    
      }

    const CartPopup = () => {
        return (
            <div>

                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={popopen}
                    anchorEl={panchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                   <div style={{ width: 400, padding: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <span style={{ fontWeight: 'lighter', letterSpacing: 2 }}>Order Summary</span>
              </Grid>
              <Grid item xs={4}>
                <span style={{ fontWeight: 'lighter', display: 'flex', justifyContent: 'right' }}>({keys}) Items</span>
              </Grid>
              {showCartItems()}
              <Grid item xs={8}></Grid>
              {keys > 2 ?
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'right' }}>{`+${keys - 2} More items`}</Grid> : <></>}
              <Grid item xs={8}><div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ color: 'orange' }}>Total Amount &#8377; {`${offeramount.toFixed(2)}`} </div><div style={{ color: 'green' }}>You Save &#8377;{`${(totalamount - offeramount).toFixed(2)}`} </div></div></Grid>


              <Grid item xs={4}></Grid>

            </Grid>
          </div>
                </Popover>
            </div>
        );

    }

    const handleClick = (event, categoryid) => {
        setAnchorEl(event.currentTarget);
        FetchSubCategories(categoryid)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const FetchAllCategories = async () => {
        var result = await getData('categories/displaycategories')
        setCategory(result.result)
    }
    const FetchSubCategories = async (categoryid) => {
        var result = await postData('subcategories/displaysubcategorybyid', { categoryid: categoryid })
        setSubcategory(result.result)
    }


    useEffect(function () {
        FetchAllCategories()
    }, [])

    const showMainCategory = () => {
        return category.map((item, index) => {
            return (<>
                {index <= 3 ? <>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(event) => handleClick(event, item.categoryid)}
                            style={{ color: '#000' }}>
                            {item.categoryname}</Button>
                    </div>
                </> : <></>}</>
            )

        })
    }

    const ShowSubcategory = () => {
        return subCategory.map((item, index) => {
            return (
                <>
                    {
                        index < 3 ? <>
                            <MenuItem style={{ display: 'flex' }} >{item.subcategoryname}</MenuItem>
                        </> : <>
                            <MenuItem style={{ display: 'flex', flexDirection: 'column', marginLeft: 200, marginTop: 0 }} >{item.subcategoryname}</MenuItem>
                        </>}
                </>
            )
        })
    }

    const nextApp = () => {
        return category.map((item, index) => {
            return (<>

                {index >= 4 ?
                    <div >
                        <Button style={{ color: '#FFF', marginRight: 50 }} >
                            {item.categoryname }
                        </Button>
                    </div>
                    : <></>}</>
            )
        })

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color='inherit'  >
                <Toolbar>
                    {matches?<>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                       
                        <MenuIcon />
                    </IconButton>
                    </> :<></>}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <img src="/bestmedslogo.webp" style={{ height: '70px', width: '80px' }} />
                    </Typography>
                    {
                        matches?<></>:<>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '70%' }}>
                        {showMainCategory()}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {ShowSubcategory()}
                        </Menu>
                    </div>
                    </>
                    }
                    <Search style={{ border: "1px solid black", borderRadius: '15px', paddingRight: 100 }}>
                        <SearchIconWrapper>
                            <SearchIcon />

                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <div style={{ display: 'flex', padding: '15px' }}>
                        <Badge badgeContent={keys} color="primary">
                            <ShoppingCartOutlinedIcon onClick={()=>navigate('/showcart')} aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose} color="action" style={{ marginLeft: '20px' }} />
                        </Badge>
                        <PersonOutlineOutlinedIcon style={{ marginLeft: '20px' }} />
                        
                    </div>
                   
                    {CartPopup()}
                </Toolbar>
            </AppBar>
            {matches?<></>:
           <div style={{marginTop:'70px',height:50,width:'100%',background:'#000',display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}} >

                {nextApp()}
            </div>}

             
        </Box>


    );

}
