require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
// const { wait } = require("@testing-library/user-event/dist/utils");
const { error } = require("console");
const { type } = require("os");

const key = process.env.JWT_TOKEN
// const key = "&@*@&*!hsggbxhsbdu8*&!@dhms12hdj$5";

const app = express();

// app.use(cors());
app.use(cors({
  origin: "https://stelina-1-xeyx.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  // .connect("mongodb+srv://tushardumra07_db_user:PmiFp8i7MAgUhKPX@stelina.yk40mv5.mongodb.net/stelina")
  // .connect("mongodb://localhost:27017/stelina")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("error occured");
  });

const signUpSchema = mongoose.Schema({
  Email: String,
  UserName: String,
  Phone: Number,
  Password: String,
  UserType: String,

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  // role: {
  //   type: String,
  //   enum: ["customer", "admin", "superadmin"],
  //   default: "customer"
  // },

  // tokenVersion: {
  //   type: Number,
  //   default: 0
  // }
});

const signUpModel = new mongoose.model("SignUp", signUpSchema);

app.post("/api/signup", async (req, res) => {
  const userData = new signUpModel({
    Email: req.body.mailId,
    UserName: req.body.uname,
    Phone: req.body.phone,
    Password: req.body.pwd,
    // role: role.enum,
    UserType: "user",
  });

  const dataSave = await userData.save();

  if (dataSave) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

app.post("/api/login", async (req, res) => {
  const dataFind = await signUpModel.findOne({
    Email: req.body.mail,
  });

  // User check with email
  if(!dataFind) {
    return res.send({ statuscode: 0, msg: "User not found" });
  }

 // if user find and password check
 if (dataFind) {
   const Pwd = dataFind.Password;
   if(Pwd !== req.body.pwd) {
    return res.send({ statuscode: 0, msg: "Invalid Password"});
   }
   if (Pwd === req.body.pwd) {
     // if password match and user-status check
     if(dataFind.status === "inactive") {
      return res.send({ statuscode: 0, msg: "Your Account is disabled.Please Contact Support." });
     }
     
     // if user-status ok then data save in token also
      let token = jwt.sign(
        {
          id: dataFind._id,
          userRole: dataFind.UserType,
          username: dataFind.UserName,
          tokenVersion: dataFind.tokenVersion,
        },
        key,
        { expiresIn: "1h" },
      );
      res.send({
        statuscode: 1,
        userInfo: dataFind,
        authToken: token,
        userId: dataFind._id,
        userRole: dataFind.UserType
      });
    } else {
      res.send({ statuscode: 0 });
    }
  }

  
});

// // For Session Verification
// app.get("/api/verify-session", async (req, res) => {
//   try {
//     const header = req.headers.authorization;

//     if (!header) {
//       return res.send({ statuscode: -1 });
//     }

//     const token = header.split(" ")[1];
//     const decoded = jwt.verify(token, key);

//     const user = await signUpModel.findById(decoded.id);

//     // user deleted
//     if (!user) {
//       return res.send({ statuscode: -1 });
//     }

//     // role changed
//     if (user.role !== decoded.userRole) {
//       return res.send({ statuscode: -1 });
//     }

//     // account disabled
//     if (user.status === "inactive") {
//       return res.send({ statuscode: -1 });
//     }

//     // session valid
//     res.send({
//       statuscode: 1,
//       role: user.role,
//       username: user.UserName
//     });

//   } catch (err) {
//     res.send({ statuscode: -1 });
//   }
// });

// Get User name from database to display in header

// app.get("/api/getUname", async(req, res) => {
//   const uname = await signUpModel.find();
//   if (uname) {
//     res.send({ statuscode: 1, data: uname });
//   } else {
//     res.send({ statuscode: 0 });
//   }
// });

// Contact Form Schema and Model

const contactUsSchema = mongoose.Schema({
  Name: String,
  Email: String,
  Phone: Number,
  Country: String,
  Msg: String,
});

const contactUsModel = new mongoose.model("contactUs", contactUsSchema);

app.post("/api/contact", async (req, res) => {
  const custinfo = new contactUsModel({
    Name: req.body.name,
    Email: req.body.mail,
    Phone: req.body.phone,
    Country: req.body.country,
    Msg: req.body.msg,
  });

  const name = req.body.name;
  const email = req.body.mail;
  const phone = req.body.phone;
  const country = req.body.country;
  const message = req.body.country;

  if (
    name !== "" && email !== "" && phone !== "" &&
    country !== "" && message !== ""
  ) {
    const infoSave = await custinfo.save();
    if (infoSave) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
  }
});

// Add Categories

const uploadCategory = mongoose.Schema({
  CategoryName: String,
  CateImgPath: String,
});

const addCategoryModel = new mongoose.model("addCategorie", uploadCategory);

const categoryStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/assets/uploadCategories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadCatePic = multer({ storage: categoryStore }); // ✅ FIXED

app.post(
  "/api/uploadCategories",
  uploadCatePic.single("category_img"),
  async (req, res) => {
    try {
       if (req.body.category_name && req.file) {
       
        const oldPath = req.file.path;
        const newPath = path.join(
          "../client/public/assets/uploadCategories",
          req.body.category_name + path.extname(req.file.originalname),
        );

        fs.renameSync(oldPath, newPath);

        const categoryData = new addCategoryModel({
          // ✅ FIXED
          CategoryName: req.body.category_name,
          CateImgPath: newPath,
        });

        const saveCateData = await categoryData.save();
        if (saveCateData) {
          res.json({ statuscode: 1, file: categoryData }); // ✅ FIXED - only one response
        } else {
          res.json({ statuscode: 0 });
        }
      } else {
        res.json({ statuscode: 0, error: "Missing category name or file" });
      }
    } catch (error) {
      console.log("error occurred:", error);
      res.status(500).json({ statuscode: 0, error: error.message });
    }
  },
);

// Categories Fetch to show in the Add Category Section

app.get("/api/getall", async (req, res) => {
  const result = await addCategoryModel.find();
  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Delete Categories from Add Category section

app.delete("/api/deleteCate/:id", async (req, res) => {
  const result = await addCategoryModel.deleteOne({ _id: req.params.id });

  if (result.deletedCount == 1) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Update Categories in the Add Category section

app.put("/api/update-category/:id", uploadCatePic.single("category_img"), async (req, res) => {
  try {
    // Fetch the existing category to get the current name if needed
    const existingCategory = await addCategoryModel.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).send({ statuscode: 0, error: "Category not found" });
    }

    // let newPath = existingCategory.CateImgPath;
    let existingPath = existingCategory.CateImgPath;
    let newName = req.body.category_name || existingCategory.CategoryName;
    let newPath = existingPath;   // Default to existing path

    // If a new file is uploaded
    if (req.file) {
      newPath = path.join("../client/public/assets/uploadCategories", newName + path.extname(req.file.originalname));

      // fs.renameSync(req.file.path, newPath);
      fs.renameSync(req.file.path, newPath);

      // Delete old image if it exists
      if (existingPath && fs.existsSync(existingPath)) {
        fs.promises.unlink(existingPath, (err) => {
          if (err) {
            console.log("Old file deletion failed:", err);
          } else {
            console.log("Old file deleted successfully");
          }
        });
      }
    }

    // Update only the fields that are changed
    const result = await addCategoryModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          CategoryName: newName,
          CateImgPath: newPath,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.send({ statuscode: 1 });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ statuscode: 3, error: "Update failed" });
  }
});


// Categories Fetch to list in product listing

app.get("/api/getCategories", async (req, res) => {
  const cateName = await addCategoryModel.find();

  if (cateName) {
    res.send({ statuscode: 1, data: cateName });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Update Categories



// Add Product Form Schema and Model

const addProductSchema = mongoose.Schema({
  ProductName: String,
  ProductCategory: String,
  ProdCateName: String,
  ProductPrice: Number,
  ProductDesc: String,
  ImgPath: String,
  addOn: String,
  IsSale: Boolean,
  DiscountPrice: Number,
});

const addProductModel = new mongoose.model("addProduct", addProductSchema);

const productStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/assets/uploadProducts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProdPic = multer({ storage: productStore });

app.post(
  "/api/uploadProducts",
  uploadProdPic.single("product_img"),
  async (req, res) => {
    try {
      if (req.body.product_name) {
        const fs = require("fs");
        const oldPath = req.file.path;
        const newPath = path.join(
          "../client/public/assets/uploadProducts",
          req.body.product_name + path.extname(req.file.originalname),
        );

        fs.renameSync(oldPath, newPath);

        const productData = new addProductModel({
          ProductName: req.body.product_name,
          ProductCategory: req.body.product_category,//ID
          ProdCateName: req.body.prod_cate_name,// NAME
          ProductPrice: req.body.product_price,
          ProductDesc: req.body.product_desc,
          ImgPath: newPath,
          addOn: new Date(),
          IsSale: req.body.product_sale,
          DiscountPrice: req.body.discount_price,
        });

        const saveProdData = await productData.save();
        if (saveProdData) {
          res.send({ statuscode: 1 });
        } else {
          res.send({ statuscode: 0 });
        }

        res.json({
          file: {
            product_name:
              req.body.product_name + path.extname(req.file.originalname),
            path: newPath,
          },
        });
      } else {
        res.json({
          file: req.file,
        });
      }
    } catch (error) {
      console.log("error here");
    }
  },
);

// Fetch Products in the Add Products Section

app.get("/api/getProducts", async (req, res) => {
  const result = await addProductModel.find();

  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Fetch latest Products

app.get("/api/latestProducts", async (req, res) => {
  const result = await addProductModel.find().sort({ addOn: -1 }).limit(6);

  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Delete Products from Add Products section

app.delete("/api/deleteProd/:id", async (req, res) => {
  const result = await addProductModel.deleteOne({ _id: req.params.id });

  if (result.deletedCount == 1) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Update Products Section

app.put("/api/update-product/:id", uploadProdPic.single("product_img"), async (req, res) => {
  try {
    const existingProduct = await addProductModel.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).send({ statuscode: 0, error: "Product not found" });
    }

    let newImgPath = existingProduct.ImgPath;
    let newProdName = req.body.product_name || existingProduct.ProductName;
    let newProdCate = req.body.product_category || 
    existingProduct.ProductCategory;
    let newProdPrice = req.body.product_price || existingProduct.ProductPrice;
    let newProdDesc = req.body.product_desc ||
    existingProduct.ProductDesc;

    // If a new file is uploaded
    if (req.file) {
      newImgPath = path.join("public/assets/uploadProducts/", newProdName + path.extname(req.file.originalname));
      fs.renameSync(req.file.path, newImgPath);

      // Delete old image if it exists
      if (existingProduct.ImgPath && fs.existsSync(existingProduct.ImgPath)) {
        fs.unlink(existingProduct.ImgPath, (err) => {
          if (err) {
            console.log("Old file is not deleted");
          } else {
            console.log("Old file is deleted");
          }
        })
      }
    } 

    // Update only the fields that are changed
    const result = await addProductModel.updateOne(
      {_id: req.params.id},
      {
        $set: {
          ProductName: newProdName,
          ProductCategory: newProdCate,
          ProductPrice: newProdPrice,
          ProductDesc: newProdDesc,
          ImgPath: newImgPath,
        },
      }
    )

    if (result.modifiedCount > 0) {
      res.send({ statuscode: 1 });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ statuscode: 3, error: "Update failed"});
  }
});

// Fetch Products list to show in Products by Category

app.get("/api/productsList/:id", async (req, res) => {
  const result = await addProductModel.find({ ProductCategory: req.params.id });
  // const result = await addProductModel.aggregate([
  //   {
  //     $sample:{size:4}
  //   }
  // ])
  if (result) {
    console.log(result);
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Fetch Product to show in Product Details page

app.get("/api/productDetails/:id", async (req, res) => {
  const result = await addProductModel.findOne({ _id: req.params.id });
  // console.log(result);
  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Fetch Products for Sale
app.get("/api/products-onSale", async (req, res) => {
  const result = await addProductModel.find({ IsSale: true });
  // console.log(result)
  if(result) {
    res.send({ statuscode: 1, onSaleData: result })
  } else {
    res.send({ statuscode: 0 });
  }
});

// Send Product Details to wishlist

const productWishlistSchema = mongoose.Schema({
  wlProductName: String,
  wlProductPrice: Number,
  wlProductDesc: String,
  wlProductImage: String,
  wlUserId: String,
  wlProductId: String,
});

const productWishlistModel = new mongoose.model(
  "productWishlist",
  productWishlistSchema,
);

app.post("/api/saveInWishlist", async (req, res) => {
  try {
    const wlUserFind = await productWishlistModel.findOne({
      wlUserId: req.body.userid,
      wlProductId: req.body.pId,
    });

    if (wlUserFind) {
      console.log(wlUserFind + "userid");
      res.send({ statuscode: 2 });
    } else {
      const wlProductData = new productWishlistModel({
        wlProductName: req.body.prodName,
        wlProductPrice: req.body.prodPrice,
        wlProductDesc: req.body.prodDesc,
        wlProductImage: req.body.prodImg,
        wlUserId: req.body.userid,
        wlProductId: req.body.pId,
      });

      const wlproductSave = await wlProductData.save();
      if (wlproductSave) {
        res.send({ statuscode: 1 });
      } else {
        res.send({ statuscode: 0 });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/wishlistProducts/:userid", async (req, res) => {
  const result = await productWishlistModel.find({
    wlUserId: req.params.userid,
  });

  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

app.delete("/api/removefromWishlist/:id", async (req, res) => {
  const result = await productWishlistModel.deleteOne({
    wlProductId: req.params.id
    // wlUserId: req.params.id,
  });

  if (result.deletedCount == 1) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

const shoppingCartSchema = mongoose.Schema({
  scProductName: String,
  scProductPrice: Number,
  scProductImg: String,
  scProductCount: Number,
  scUserId: String,
  scProductId: String,
});

const shoppingCartModel = new mongoose.model(
  "shoppingcart",
  shoppingCartSchema,
);

app.post("/api/addInShoppingCart", async (req, res) => {
  try {
    const scUserFind = await shoppingCartModel.findOne({
      scUserId: req.body.userid,
      scProductId: req.body.pId,
    });

    if (scUserFind) {
      res.send({ statuscode: 2 });
    } else {
      const scProductData = new shoppingCartModel({
        scProductPrice: req.body.prodPrice,
        scProductName: req.body.prodName,
        scProductCount: req.body.prodQty,
        scProductImg: req.body.prodImg,
        scUserId: req.body.userid,
        scProductId: req.body.pId,
      });

      console.log(scProductData, "this is data");
      const scProductSave = await scProductData.save();

      if (scProductSave) {
        console.log(scProductSave, "this is stored data");
        res.send({ statuscode: 1, data: scProductSave });
      } else {
        res.send({ statuscode: 0 });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/shoppingCartProducts/:userid", async (req, res) => {
  const result = await shoppingCartModel.find({ scUserId: req.params.userid });
  console.log(result);
  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

app.delete("/api/deleteItem/:id", async (req, res) => {
  const result = await shoppingCartModel.deleteOne({
    scProductId: req.params.id,
  });

  if (result.deletedCount == 1) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Update Product Quantity in Shopping Cart

app.put("/api/cart/update-all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartItems } = req.body;

    // 1️⃣ Basic validations
    if (!userId) {
      return res.status(400).json({
        statuscode: 0,
        message: "User ID is required",
      });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        statuscode: 0,
        message: "Cart items are required",
      });
    }

    // 2️⃣ Prepare bulk update operations
    const bulkOps = cartItems.map((item) => {
      if (!item._id || item.scProductCount < 1) return null;

      return {
        updateOne: {
          filter: {
            _id: item._id,
            scUserId: userId, // security check
          },
          update: {
            $set: { scProductCount: item.scProductCount },
          },
        },
      };
    }).filter(Boolean);

    if (bulkOps.length === 0) {
      return res.status(400).json({
        statuscode: 0,
        message: "Invalid cart data",
      });
    }

    // 3️⃣ Execute bulk update
    const result = await shoppingCartModel.bulkWrite(bulkOps);

    return res.json({
      statuscode: 1,
      message: "Cart updated successfully",
      modifiedCount: result.modifiedCount,
    });

  } catch (error) {
    console.error("Update all cart error:", error);
    res.status(500).json({
      statuscode: 0,
      message: "Server error",
    });
  }
});

// Delete whole cart after the user checkout based on user id

app.delete("/api/deleteCart/:id", async (req, res) => {
  const result = await shoppingCartModel.deleteMany({
    scUserId: req.params.id,
  });
  console.log(req.params.id)
  console.log(result);
  if (result.deletedCount > 0) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Fetch All Products to show in Shop Page

app.get("/api/allShopProducts", async (req, res) => {
  const result = await addProductModel.find().sort({ addOn: -1 });

  if (result) {
    res.send({ statuscode: 1, data: result });
  } else {
    res.send({ statuscode: 0 });
  }
});

// Checkout Page Schema and Model

const checkoutPageSchema = mongoose.Schema({
  coUserId: String,
  FullName: String,
  Email: String,
  Address: String,
  Phone: Number,
  Zipcode: String,
  Products: Array,
  PayType: String,
  CardDetail: {
    CardNumber: String,
    CardMonth: String,
    CardYear: String,
    CardCVV: String,
  },
  TotalPrice: Number,
  Addon: Date,
});

const checkoutPageModel = new mongoose.model("checkout", checkoutPageSchema);

app.post("/api/checkout", async (req, res) => {
  try {
    const checkoutData = new checkoutPageModel({
      coUserId: req.body.userid,
      FullName: req.body.fullname,
      Email: req.body.email,
      Address: req.body.address,
      Phone: req.body.phone,
      Zipcode: req.body.zipcode,
      Products: req.body.products,
      PayType: req.body.payOption,
      CardDetail: {
        CardNumber: req.body.cardNo,
        CardMonth: req.body.cardMonth,
        CardYear: req.body.cardYear,
        CardCVV: req.body.cardCVV,
      },
      TotalPrice: req.body.totalPrice, 
      Addon: new Date(),
    });

    const saveCheckoutData = await checkoutData.save();
    console.log(saveCheckoutData);

    if (saveCheckoutData) {
      res.send({ statuscode: 1 });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/getOrderInfo/:userid", async (req, res) => {
  try {
    const result = await checkoutPageModel.findOne({
      coUserId: req.params.userid,
    });

    if (result) {
      res.send({ statuscode: 1, data: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error);
  }
});

// -------- For Customer Management on Admin Panel -----
// For Customers info on Admin Panel
app.get("/api/customers-info", async (req, res) => {
  try {
    const result = await signUpModel.find({UserType:"user"});
    if (result) {
      res.send({ statuscode: 1, custInfoData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting customers info from database")
  }
  
});

app.put("/api/toggle-customer-status/:id", async (req, res) => {
  try {
    const customer = await signUpModel.findById(req.params.id);
    if(!customer) {
      return res.send({ statuscode: 0, msg: "Customer not found" });
    }

    // Toggle status
    customer.status = customer.status === "active" ? "inactive" : "active";

    // const custStatus = await customer.save();
    // if(custStatus) {}

    await customer.save();

    res.send({
      statuscode: 1,
      newStatus: customer.status
    });

  } catch (error) {
    console.log(error);
    res.send({ statuscode: 0 });
  }
});

// For Orders info on Admin Panel
app.get("/api/customers-orders", async (req, res) => {
  try {
    const result = await checkoutPageModel.find();
    if(result) {
      res.send({ statuscode: 1, custOrdData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting customers orders from database")
  }
})

// For Admin Management on Admin Panel
app.get("/api/admin-list", async (req, res) => {
  try {
    const result = await signUpModel.find({UserType: "admin"});
    if(result) {
      res.send({ statuscode: 1, adminListData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting admin list from database")
  }
});

app.get("/api/customers-list", async (req, res) => {
  try {
    const result = await signUpModel.find({UserType: "user"});
    if(result) {
      res.send({ statuscode: 1, custListData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting customers list from database")
  }
});

// For Promote and Demote Admin
app.put("/api/toggle-admin/:id", async (req, res) => {
  try {
    const user = await signUpModel.findById(req.params.id);

    if (!user) return res.send({ statuscode: 0 });

    // prevent removing superadmin
    if (user.role === "superadmin") {
      return res.send({ statuscode: 0, msg: "Cannot modify superadmin" });
    }

    user.role = user.role === "admin" ? "customer" : "admin";
    await user.save();

    res.send({
      statuscode: 1,
      newRole: user.role
    });

  } catch (err) {
    res.send({ statuscode: 0 });
  }
});

//---- API for Messages display -----
app.get("/api/showing-messages", async (req, res) => {
  try {
    const result = await contactUsModel.find();
    if(result) {
      res.send({ statuscode: 1, msgData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting messages from database")
  }
});

// ---- Api for sending charts data ----
// for Category Count data
app.get('/api/category-count', async (req, res) => {
  try {
    const result = await addCategoryModel.find();
    if(result) {
      res.send({ statuscode: 1, categoryData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting data from categorymodel")
  }
});

// for Product Count data
app.get('/api/products-count', async (req, res) => {
  try {
    const result = await addProductModel.find();
    if(result) {
      res.send({ statuscode: 1, productData: result });
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "in getting data from productmodel")
  }
});

// Payment Type Distribution Chart API
app.get("/api/paytype", async (req, res) => {
  try {
    const result = await checkoutPageModel.find();
    if(result) {
      res.send({ statuscode: 1, paymentData: result});
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    console.log(error, "error in getting data from checkout model")
  }
});

// Group Orders By Date (MongoDB Aggregation)
app.get("/api/orders-over-time", async (req, res) => {
  try {
    const orders = await checkoutPageModel.aggregate([
      {
      //  $match: {
      //       AddOn: {
      //         $gte: new Date(new Date().setDate(new Date().getDate() - 7))
      //       }
      //     },

        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$Addon"
            }
          },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    console.log(orders)
    // console.log(json(ordersData));
    // res.json(ordersData);
    if(orders) {
      res.send({ statuscode: 1, ordersData: orders});
    } else {
      res.send({ statuscode: 0 });
    }
  } catch (error) {
    // res.status(500).json({ error: err.message });
    console.log(error, "in getting Orders data from checkout model")
  }
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server running on port 9000");
});
