import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Categories from "./Categories"
import Subcategories from './Subcategories';
import Brand from './Brand';
import Products from './Products';
import ProductImage from './ProductImage'
import Banner from "./Banner"
export default function AdminListItems(props) {

  const handleClick = (v) => {
    props.setViewContainer(v)
  }

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(<Categories setViewContainer={props.setViewContainer} />)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(<Subcategories setViewContainer={props.setViewContainer} />)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Sub Category" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(<Brand setViewContainer={props.setViewContainer} />)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Brand" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(<Products setViewContainer={props.setViewContainer} />)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
      </ListItemButton>

      <ListItemButton onClick={() => handleClick(<ProductImage setViewContainer={props.setViewContainer} />)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Product Image" />
      </ListItemButton>

      <ListItemButton onClick={() => handleClick(<Banner setViewContainer={props.setViewContainer} />)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Banner" />
      </ListItemButton>


    </React.Fragment>

  )
}
