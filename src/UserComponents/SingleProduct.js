import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";

const SingleProduct = () => {
  const { addItem } = useCart();
  const { id } = useParams();
  const [pro, setPro] = useState({});

  const getSingleProduct = async (_id) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      console.log(data);
      setPro(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };
  useEffect(() => {
    getSingleProduct();
  });

  return (
    <>
      <div className="site-wrap">
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-0">
                <a href="index.html">Home</a>{" "}
                <span className="mx-2 mb-0">/</span>{" "}
                <strong className="text-black">{pro.name}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={pro.productImage} alt="Image" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h2 className="text-black">{pro.name}</h2>
                <p>{pro.description}</p>
                <p className="mb-4">
                  Ex numquam veritatis debitis minima quo error quam eos dolorum
                  quidem perferendis. Quos repellat dignissimos minus, eveniet
                  nam voluptatibus molestias omnis reiciendis perspiciatis illum
                  hic magni iste, velit aperiam quis.
                </p>
                <p>
                  <strong className="text-primary h4">${pro.price}</strong>
                </p>
                <div className="mb-1 d-flex">
                  <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                    <span
                      className="d-inline-block mr-2"
                      style={{ top: "-2px", position: "relative" }}
                    >
                      <input type="radio" id="option-sm" name="shop-sizes" />
                    </span>{" "}
                    <span className="d-inline-block text-black">Small</span>
                  </label>
                  <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                    <span
                      className="d-inline-block mr-2"
                      style={{ top: "-2px", position: "relative" }}
                    >
                      <input type="radio" id="option-md" name="shop-sizes" />
                    </span>{" "}
                    <span className="d-inline-block text-black">Medium</span>
                  </label>
                  <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                    <span
                      className="d-inline-block mr-2"
                      style={{ top: "-2px", position: "relative" }}
                    >
                      <input type="radio" id="option-lg" name="shop-sizes" />
                    </span>{" "}
                    <span className="d-inline-block text-black">Large</span>
                  </label>
                  <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                    <span
                      className="d-inline-block mr-2"
                      style={{ top: "-2px", position: "relative" }}
                    >
                      <input type="radio" id="option-xl" name="shop-sizes" />
                    </span>{" "}
                    <span className="d-inline-block text-black">
                      {" "}
                      Extra Large
                    </span>
                  </label>
                </div>
                <div className="mb-5">
                  <div
                    className="input-group mb-3"
                    style={{ maxWidth: "120px" }}
                  >
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary js-btn-minus"
                        type="button"
                      >
                        −
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control text-center"
                      defaultValue={1}
                      placeholder
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-primary js-btn-plus"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <p>
                  <Link
                    to="/Cart"
                    className="buy-now btn btn-sm btn-primary"
                    onClick={() => {
                      let item = {
                        ...pro,
                        id: pro._id,
                      };
                      addItem(item);
                    }}
                  >
                    Add To Cart
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
