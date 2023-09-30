import React from 'react'
import { Container } from 'react-bootstrap'

const OrderConfirm = ({addToCart }) => {
  // const totalcount =addToCart.reduce((total,item)=> total+item.quantity,0)
  // const totalPrice=addToCart.reduce((total,item)=>total+item.totalPrice,0)
  // const name=addToCart.filter((item)=>{item.name===products.name})
 
const productNames=[];
let totalCount=0;
let totalPrice=0;

addToCart.forEach((item)=>{
  totalCount+=item.quantity;
  totalPrice+=item.totalPrice;
  productNames.push(<ul><li>{item.name}({item.quantity})</li></ul>)
})


  return (
    <Container  className='mx-auto justify-content-center' data-aos="zoom-out" data-aos-duration="1000" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'400px',height:'400px',backgroundColor:'sandybrown',borderRadius:'20px'}}>
     
      <h3 style={{color:'green'}}>TOUR ORDER IS PLACED!!! </h3>
      <h3 >Product Name:{productNames}</h3>
      <h3>Total:Rs. {totalPrice} </h3>
      <h3 >Total Count of products:{totalCount>1?totalCount+"Nos.":totalCount+"No."} </h3>

    </Container>
  )
}

export default OrderConfirm


