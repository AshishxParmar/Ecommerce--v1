const express = require("express");
const product = require("../DB/models/productmodel");
const category = require("../DB/models/categorymodel");
const router = express.Router();
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage();

const uploads = multer({
  storage,
});

router.post(
  "/productdata",
  uploads.single("productImage"),
  async function (req, res) {
    // const {name,sku,price,category,description} = req.body;
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    fs.access("uploads", (err) => {
      if (err) {
        fs.mkdirSync("/uploads");
      }
    });
    const date = new Date();
    await sharp(req.file.buffer)
      .resize({
        width: 400,
        height: 400,
      })
      .toFile(`uploads/${date.toString()} ${req.file.originalname}`);

    const newProduct = await product.create({
      ...req.body,
      productImage: `uploads/${date.toString()} ${req.file.originalname}`,
    });
    console.log("body", req.body);

    await category.updateMany(
      { _id: newProduct.category },
      { $push: { products: newProduct._id } }
    );

    return res.send(newProduct);
  }
);

// router.get("/products", async (req, res) => {
//   try {
//     if (req.query.category) {
//       const productdata = await product.find({ category: req.query.category });

//       return res.status(200).send(productdata);
//     }

//     const productdata = await product.find({});
//     res.send(productdata);
//   } catch (e) {
//     res.send(e);
//   }
// });
router.get("/products", async (req, res) => {
  try {
    let searchQuery = "";

    if (req.query.keyword) {
      searchQuery = String(req.query.keyword);
    }

    // for category filter
    if (req.query.category) {
      let categoryQuery = req.query.category;
      const findQuery = {
        $and: [
          { category: categoryQuery },
          {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } },
              { description: { $regex: searchQuery, $options: "i" } },
            ],
          },
        ],
      };
      const results = await product.find(findQuery);

      const products = await product
        .find(findQuery)
        .sort("-createdAt")
        // .populate('category', 'title')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip));

      return res.json({
        success: true,
        totalResults: results.length,
        products,
      });
    }

    const findQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const results = await product.find(findQuery);

    const products = await product
      .find(findQuery)
      .sort("-createdAt")
      // .populate('category', 'title')
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip));

    return res.json({ success: true, totalResults: results.length, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const productdata = await product.findById(req.params.id);
    res.send(productdata);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const deleteProduct = await product.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(200).send();
    }
    res.send(deleteProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/products/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateProduct = await product.findByIdAndUpdate(_id, req.body);
    res.send(updateProduct);
  } catch (e) {
    res.send(e);
  }
});

router.get("/pro/:id", async (req, res) => {
  try {
    const studentsdata = await product.find({ category: req.params.id });
    res.send(studentsdata);
  } catch (e) {
    res.send(e);
  }
});

router.post("/categories", async (req, res) => {
  try {
    const cate = new category(req.body);
    const Addcategory = await cate.save();
    res.status(201).send(Addcategory);
  } catch (e) {
    res.send(e);
  }
});

router.get("/categorydata", async (req, res) => {
  try {
    const categoriesdata = await category.find();
    res.send(categoriesdata);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.get("/categorydata/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const categorydata = await category.findById({ _id: _id });
    res.send(categorydata);
  } catch (e) {
    res.send(e);
  }
});

router.delete("/categorydata/:id", async (req, res) => {
  try {
    const deleteProduct = await category.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    }
    res.send(deleteProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/categorydata/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateCategory = await category.findByIdAndUpdate(_id, req.body);
    res.send(updateCategory);
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.patch('/changePermission/:id',async(req,res)=>{
//     try{
//         const _id=req.params.id;
//         const updateUser=await User.findByIdAndUpdate(_id , req.body ,{
//             new:true
//         })
//        res.send(updateUser);
//     }catch(err){
//         console.log(err)
//     }
// })

// @desc Update prouduct image
// @route PATCH  '/api/products/:id/updateImage'
// @access Private : Admin

router.patch(
  "/updateimage/:id",
  uploads.single("produtImage"),
  async (req, res) => {
    const date = new Date();
    try {
      const producta = await product.findById(req.params.id);
      console.log("req.file", req.file);

      if (!producta) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }

      if (!req.file) throw new Error("please upload an image");
      fs.access("uploads", (err) => {
        if (err) {
          fs.mkdirSync("/uploads");
        }
      });
      fs.unlinkSync(path.resolve(producta.productImage));

      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .toFile(`uploads/${date.getTime()}${req.file.originalname}`);

      producta.productImage = `uploads/${date.getTime()}${
        req.file.originalname
      }`;
      await producta.save();
      res.json({
        success: true,
        message: "Image updated",
        image: producta.productImage,
      });
    } catch (err) {
      if (req.file) {
        // fs.unlinkSync(
        //   path.resolve(`uploads/${date.getTime()}${req.file.originalname}`)
        // );
      }
      res.status(400).json({ success: false, error: err.message });
    }
  }
);
module.exports = router;
