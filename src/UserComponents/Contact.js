import React from 'react'

const Contact = () => {
    return (
        <div className="site-wrap">

            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Contact</strong></div>
                    </div>
                </div>
            </div>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="h3 mb-3 text-black">Get In Touch</h2>
                        </div>
                        <div className="col-md-7">
                            <form action="#" method="post">
                                <div className="p-3 p-lg-5 border">
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="c_fname" name="c_fname" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="c_lname" name="c_lname" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_email" className="text-black">Email <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" id="c_email" name="c_email" placeholder />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_subject" className="text-black">Subject </label>
                                            <input type="text" className="form-control" id="c_subject" name="c_subject" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_message" className="text-black">Message </label>
                                            <textarea name="c_message" id="c_message" cols={30} rows={7} className="form-control" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-12">
                                            <input type="submit" className="btn btn-primary btn-lg btn-block" defaultValue="Send Message" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 ml-auto">
                            <div className="p-4 border mb-3">
                                <span className="d-block text-primary h6 text-uppercase">New York</span>
                                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
                            <div className="p-4 border mb-3">
                                <span className="d-block text-primary h6 text-uppercase">London</span>
                                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
                            <div className="p-4 border mb-3">
                                <span className="d-block text-primary h6 text-uppercase">Canada</span>
                                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
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
    )
}

export default Contact
