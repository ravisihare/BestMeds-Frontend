import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import { Button } from '@material-ui/core'
export default function CardButton(props) {
    const [qty,setQty]=useState(0)

    const handlePlus=()=>{
        var v=qty+1
        if(v<10)
    setQty(v)
    props.onChange(v)
    }

    const handleMinus=()=>{
        
        var v=qty-1
        if(v>=0)
        setQty(v)
    props.onChange(v)

    }

  return (
      <>
      { qty==0?    <div onClick={handlePlus} style={{color:'#fff',display:'flex',padding:10,margin:5}}>
<Button variant='contained' style={{width:240, background:'#000',color:'#fff'}} fullWidth>Add to Cart</Button>
            </div>:
    <div style={{display:'flex',padding:10,margin:5}}>
<Avatar onClick={handleMinus} style={{backgroundColor:'#000',color:'#fff',marginRight:15,padding:5}} variant='square' >
    -
</Avatar>
<span style={{display:"flex",alignItems:"center"}}>{qty}</span>
<Avatar onClick={handlePlus} style={{ backgroundColor:'#000',color:'#fff',marginLeft:15,padding:5}} variant='square' >
    +
</Avatar>

    </div>
      }
    </>

  )
}
