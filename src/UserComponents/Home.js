import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';




const Home = () => {
  
  const [prostate, setProstate] = useState([]);
  const [category, setCategory] = useState([])

  const getAllCategory = async () => {
    try {
      const res = await axios.get("/categorydata");
      setCategory(res.data);
      console.log("category1:", res.data);
    } catch (error) {
      console.log("err:", error);
    };


  };
  const getAllProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProstate(res.data);
      console.log("category2:", res.data);
    } catch (error) {
      console.log("err:", error);
    }
  };


  const getProducts = async (_id)=>{
    try {
      const {data} = await axios.get(`/products?category=${_id}`)
      console.log("product sayyed", data)
      setProstate(data)
    } catch (err) {
      console.log("err:", err.message);
    }
  }

  useEffect(() => {
    
     getAllProducts();
    getAllCategory();
  }, []);


  return (
    <>
      <div className="site-wrap">

        <div className="site-blocks-cover" style={{ backgroundImage: 'url(images/hero_1.jpg)' }} data-aos="fade">
          <div className="container">
            <div className="row align-items-start align-items-md-center justify-content-end">
              <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
                <h1 className="mb-2">Finding Your Perfect Shoes</h1>
                <div className="intro-text text-center text-md-left">
                  <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. </p>
                  <p>
                    <a href="#" className="btn btn-sm btn-primary">Shop Now</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section site-section-sm site-blocks-1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay>
                <div className="icon mr-4 align-self-start">
                  <span className="icon-truck" />
                </div>
                <div className="text">
                  <h2 className="text-uppercase">Free Shipping</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay={100}>
                <div className="icon mr-4 align-self-start">
                  <span className="icon-refresh2" />
                </div>
                <div className="text">
                  <h2 className="text-uppercase">Free Returns</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay={200}>
                <div className="icon mr-4 align-self-start">
                  <span className="icon-help" />
                </div>
                <div className="text">
                  <h2 className="text-uppercase">Customer Support</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <div className="site-section site-blocks-2">
          <div className="container">
            <div className="row">

            {category.map((el) => {
              console.log("Home wala Console",el)
                    
                    return (
              <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay>
                <NavLink className="block-2-item" to="/Product" onClick={() => getProducts(el._id)}>
                  <figure className="image">
                    <img src="images/women.jpg" alt="" className="img-fluid" />
                  </figure>
                  <div className="text">
                    <span className="text-uppercase">Collections</span>
                    <h3>{el.name}</h3>
                  </div>
                </NavLink>
              </div>
              )
            })}
              
              {/* <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={100}>
                <a className="block-2-item" href="#">
                  <figure className="image">
                    <img src="images/children.jpg" alt="" className="img-fluid" />
                  </figure>
                  <div className="text">
                    <span className="text-uppercase">Collections</span>
                    <h3>Children</h3>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={200}>
                <a className="block-2-item" href="#">
                  <figure className="image">
                    <img src="images/men.jpg" alt="" className="img-fluid" />
                  </figure>
                  <div className="text">
                    <span className="text-uppercase">Collections</span>
                    <h3>Men</h3>
                  </div>
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <div className="site-section block-3 site-blocks-2 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 site-section-heading text-center pt-4">
                <h2>Featured Products</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="nonloop-block-3 owl-carousel">
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/cloth1.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Tank Top</a></h3>
                        <p className="mb-0">Finding perfect t-shirt</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Corater</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/cloth_2.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Polo Shirt</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/cloth_3.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">T-Shirt Mockup</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Corater</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section block-8">
          <div className="container">
            <div className="row justify-content-center  mb-5">
              <div className="col-md-7 site-section-heading text-center pt-4">
                <h2>Big Sale!</h2>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-12 col-lg-7 mb-5">
                <a href="#"><img src="images/blog_1.jpg" alt="Image placeholder" className="img-fluid rounded" /></a>
              </div>
              <div className="col-md-12 col-lg-5 text-center pl-md-5">
                <h2><a href="#">50% less in all items</a></h2>
                <p className="post-meta mb-4">By <a href="#">Carl Smith</a> <span className="block-8-sep">•</span> September 3, 2018</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste dolor accusantium facere corporis ipsum animi deleniti fugiat. Ex, veniam?</p>
                <p><a href="#" className="btn btn-primary btn-sm">Shop Now</a></p>
              </div>
            </div>
          </div>
        </div>
        <footer className="site-footer border-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="footer-heading mb-4">Navigations</h3>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Sell online</a></li>
                      <li><a href="#">Features</a></li>
                      <li><a href="#">Shopping cart</a></li>
                      <li><a href="#">Store builder</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Mobile commerce</a></li>
                      <li><a href="#">Dropshipping</a></li>
                      <li><a href="#">Website development</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Point of sale</a></li>
                      <li><a href="#">Hardware</a></li>
                      <li><a href="#">Software</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <h3 className="footer-heading mb-4">Promo</h3>
                <a href="#" className="block-6">
                  <img src="images/hero_1.jpg" alt="Image placeholder" className="img-fluid rounded mb-4" />
                  <h3 className="font-weight-light  mb-0">Finding Your Perfect Shoes</h3>
                  <p>Promo from  nuary 15 — 25, 2019</p>
                </a>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="block-5 mb-5">
                  <h3 className="footer-heading mb-4">Contact Info</h3>
                  <ul className="list-unstyled">
                    <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
                    <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
                    <li className="email">emailaddress@domain.com</li>
                  </ul>
                </div>
                <div className="block-7">
                  <form action="#" method="post">
                    <label htmlFor="email_subscribe" className="footer-heading">Subscribe</label>
                    <div className="form-group">
                      <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email" />
                      <input type="submit" className="btn btn-sm btn-primary" defaultValue="Send" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" className="text-primary">Colorlib</a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>




    </>
  )
}

export default Home
