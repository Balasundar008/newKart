import { Form, Carousel, Navbar, Nav, Row, Card, Col, Container, Button } from 'react-bootstrap'
import product from '../products';
import { Link } from 'react-router-dom';
import cam from '../images/camera.jpg'
import shop from '../images/cart.jpg'
import map from '../images/map.jpg'
import { useState } from 'react';
import catagory from './catagories';
import Aos from 'aos';
import 'aos/dist/aos.css';
Aos.init();

const Main = ({ addToCart, setAddToCart }) => {

 const [selectedCatagory, setSelectedCatagory] = useState('');

  
  const addCart = (item) => {

    const existingItemIndex = addToCart.findIndex((cartItem) => cartItem.id === item.id)
    console.log(existingItemIndex); //while clicking one time of same item it will throw the index of -1 because you have clicked only one time, after clicking 2 times of same item it will throw the index of 0
    if (existingItemIndex !== -1) {
      const updatedItem = [...addToCart]; //if added same item, it will get that object
      console.log(updatedItem);
      updatedItem[existingItemIndex].quantity += 1;
      updatedItem[existingItemIndex].totalPrice = updatedItem[existingItemIndex].quantity * item.price;

      setAddToCart(updatedItem);
    }
    else {
      setAddToCart([...addToCart, { ...item, quantity: 1, totalPrice: item.price }]);

    }



    //         if(addToCart.find((ele)=>addToCart.name==ele.name)){
    //             alert("this item already added")
    //             return;

    //         }
    // else{
    //     setAddToCart([...addToCart,item]);
    // }
  }
  // const handleChange = (e) => {
  //   const text = e.target.textContent;
  //   setSelectedCatagory(text);
  //   console.log(text);
  // }
 
  return (
    <div>

      <Navbar style={{ textAlign: 'center', position:'sticky',top:'0', zIndex:'1'}} bg="primary" variant="dark" expand="lg" className='custom-navbar p-3'>
        <Navbar.Brand href="#home" >nEWKART</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav" style={{ fontSize: '20px' }}>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <div style={{ marginTop: '20px' }} data-aos="flip-up" data-aos-duration="1000">
        <Row  className=' mx-auto justify-content-center' style={{gap:'2px'}} >
          {catagory.map((cat) => (
            <Col lg={2} md={2} sm={2} xs={4} key={cat.id}>
              <Card style={{ width: '120px', height: '120px', borderRadius: '15px', backgroundColor: 'sandybrown' ,padding:'10px'}}>
                <Card.Body>
                <Card.Img src={cat.image} />
                  <Card.Text style={{ cursor: 'pointer', fontSize:'13px'}} onClick={()=>setSelectedCatagory(cat.name)}  >{cat.name} </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          ))}

        </Row>
      </div>

      <Carousel style={{ marginTop: '100px' }} id='home'> 
        <Carousel.Item interval={1000}>
          <Row>
            <Col >
              <img
                className="d-block w-100 "
                src={cam}
                alt="First slide"
                style={{ width: '400px', height: '400px'}}

              />
            </Col>
            <Col  style={{ textAlign:'center'}}>
              <Carousel.Caption style={{ color: 'black' }}>
                <h2 >Welcome to  NEWKART,You can grab your Favourite Items HERE!!</h2>
                <h3>This app contains reliable products with affordable rate</h3>

              </Carousel.Caption>
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item interval={1000}>

          <img
            className="d-block w-100"
            src={shop}
            alt="First slide"
            style={{ width: '400px', height: '400px' }}
          />


        </Carousel.Item>

      </Carousel>



      <Container style={{ marginTop: '20px' }} id='products' >
        <Row style={{ gap: '20px', textAlign: 'center' }} className='justify-content-center'>
          {product.filter((item) => { return !selectedCatagory || item.catagory === selectedCatagory; }).map((item) => ( //if selectedCatagory state is empty it will display all the products , if not it will display the particular product that you have selected
            <Col lg={3} md={4} sm={5} xs={12} key={item.id} >
              <Card style={{ borderRadius: '20px', backgroundColor: 'sandybrown' }} data-aos="flip-left" data-aos-easeing="ease-out-cubic" data-aos-duration="2000" >
                <Card.Img variant="top" src={item.image} style={{ width: '200px', height: '200px', padding: '10px' }} className='mx-auto' />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Rs.{item.price}</Card.Text>
                </Card.Body>
                <Link to="/cart"><Button onClick={() => addCart(item)} style={{ marginBottom: '10px' }}>Add to Cart</Button></Link>
              </Card>
              {/* {item.catagory!==selectedCatagory?(console.log("Not matched")):console.log(" matched")} */}

            </Col>

          ))}

        </Row>
      </Container>


      <div style={{ marginTop: '30px', padding: '10px' }} id='contact'>
        <Row >
          <Col  data-aos="fade-right" data-aos-duration="2000">
            <h2>Contact Us</h2>
            <h4>For more details about our cart cantact us, we will assist you! </h4>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter your message" required />
              </Form.Group>

              <Button variant="success" type="submit" className='suc-btn mt-3'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col  data-aos="fade-left" data-aos-duration="2000">
            <img src={map} alt="map" />
          </Col>
        </Row>
      </div>
      {/* <catagoryProducts products={product} selectedCatagory={selectedCatagory} addToCart={addCart}/> */}
    </div>

  )
}

export default Main;