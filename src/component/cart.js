import React, { useState } from 'react'
import { Row, Card, Col, Container, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';


const Cart = ({ addToCart, setAddToCart }) => {

    const navigate = useNavigate(); //useHistory(in v5 of reac-router-dom) is replaced by useNavigate in react-router-dom above v6

    const removeCart = (item) => {
        // const updatedCart=addToCart.filter((cartItem)=>cartItem.id==item.id)
        // setAddToCart(updatedCart);
        const updatedItem = [...addToCart];


        const existingItemIndex = updatedItem.findIndex((cartItem) => cartItem.id === item.id)
        if (existingItemIndex !== -1) {
            if (updatedItem[existingItemIndex].quantity > 1) {
                updatedItem[existingItemIndex].quantity -= 1; 
                updatedItem[existingItemIndex].totalPrice -= item.price;

            }
            else {
                updatedItem.splice(existingItemIndex, 1)
            }
            setAddToCart(updatedItem)

        }

    }

    const [validated, setValidated] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        district: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, //without array bracket it considered as a name as keyname
        })
        // console.log(e.target.name);


    }

    // const [errors,setErrors]=useState({});


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget; //check every field
        if (form.checkValidity()) { //it validate the every field, if all field got valid it will navigate to orderconfirm page
            navigate('/orderConfirm')
            console.log("Shipping address",formData);


        }
        setValidated(true)  //it will update the state of every form fields to display after submitting
        // const newError={};
        // if (!formData.name) {
        //     newError.name="Name is required"
        // }
        // if (!formData.email) {
        //     newError.email="Email is required"
        // }  
        // if (!formData.address) {
        //     newError.address="Address is required"
        // }  

        // if (!formData.district) {
        //     newError.district="District is required"
        // }
        // if (Object.keys(newError).length>0) {
        //     setErrors(newError)
        //     return;
        // }
        // console.log('Form is submitted :', formData); 
        // if (!errors) {
        //     return <OrderConfirm/>
        // }
    }



    const total = addToCart.length > 0 ? addToCart.reduce((total, item) => total + item.totalPrice, 0) : 0;
    return (
        <Container>
            <h1> Cart</h1>
            <h2>Order Summary</h2>
            {addToCart.length === 0 ? (<h4>Your Cart is Empty</h4>) : (

                <Container style={{ marginTop: '20px' }}  >



                    <Row style={{ gap: '20px', textAlign: 'center' }} className='justify-content-center'>
                        {addToCart.map((item) => (
                            <Col sm={5} md={4} lg={3} key={item.id} className='col'>
                                <Card style={{ borderRadius: '20px', backgroundColor: 'sandybrown' }} data-aos="flip-left" data-aos-easeing="ease-out-cubic" data-aos-duration="2000" >
                                    <Card.Img variant="top" src={item.image} style={{ width: '200px', height: '200px', padding: '10px' }} className='mx-auto' />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>Rs.{item.price * item.quantity}</Card.Text>
                                    </Card.Body>
                                    <Link to="/cart"><Button onClick={() => removeCart(item)}>Remove Item</Button></Link>
                                    <span className='count'>{item.quantity}</span>
                                </Card>
                            </Col>

                        ))}

                    </Row>

                    <h2 style={{ marginTop: '20px' }}>Total price:Rs.{total}</h2>


                </Container>



            )}
            <Container data-aos="fade-right" data-aos-duration="2000">
               
                <h1>Delivery Address</h1>
                {addToCart.length>0?(
                <div style={{ marginTop: '30px', padding: '10px' }} id='contact'>
                    <Row >
                        <Col >
                            <Form onSubmit={handleSubmit} noValidate validated={validated}> 
                                <Form.Group controlId="name">
                                    <Form.Label  > Your Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" name='name' required value={formData.name} onChange={handleChange} />
                                    {/* {errors.name && <p style={{color:'red'}}>{errors.name}</p>} */}
                                    <Form.Control.Feedback type='invalid'>Please fill your name</Form.Control.Feedback>
                                    {/* it check the validation of every fields it will execute only after the fields are validated */}
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label >Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" name='email' required value={formData.email} onChange={handleChange} />
                                    {/* {errors.email && <p style={{color:'red'}}>{errors.email}</p>} */}
                                    <Form.Control.Feedback type='invalid'>Please fill your email</Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Label  >Home Address</Form.Label>
                                    <Form.Control type='text' placeholder="Enter your address" name='address' required value={formData.address} onChange={handleChange} />
                                    {/* {errors.address && <p style={{color:'red'}}>{errors.address}</p>} */}
                                    <Form.Control.Feedback type='invalid'>Please fill your address </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group controlId="district">
                                    <Form.Label >District</Form.Label>
                                    <Form.Control type='text' placeholder="Enter your district" name='district' required value={formData.district} onChange={handleChange} />
                                    {/* {errors.district && <p style={{color:'red'}}>{errors.district}</p>} */}
                                    <Form.Control.Feedback type='invalid'>Please fill your district</Form.Control.Feedback>

                                </Form.Group>


                                <Button variant="success" type="submit" className='suc-btn mt-3' >
                                    Proceed to Place Order
                                </Button>


                            </Form>
                        </Col>

                    </Row>
                </div>

):("Please add the products to order")}
            </Container>

        </Container>
    )
}

export default Cart;