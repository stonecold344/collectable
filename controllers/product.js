const Product = require("../models/Product");

let flag = -1;

module.exports = {
  create: async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    console.log("req.user", req.user);
    const {
      category,
      title,
      price,
      description,
      continents,
      preview,
    } = req.body;
    // const images = req.users
    const user = req.user;
    let upTitle = title.charAt(0).toUpperCase() + title.slice(1);
    if (await Product.findOne({ title: title })) {
      res.status(400).json({
        errorMessage: `The product ${upTitle} already exists!`,
      });
    }
    try {
      let newProduct = new Product();
      newProduct.writer = user;
      newProduct.category = category;
      newProduct.title = upTitle;
      newProduct.price = price;
      newProduct.image = preview;
      newProduct.description = description;
      newProduct.continents = continents;
      newProduct = await newProduct.save();
      console.log(newProduct);
      res.status(200).json({
        successMessage: `${upTitle} was created!`,
      });
    } catch (err) {
      console.log("Create product error:", err);
      res.status(500).json({
        errorMessage: "Please try again later!",
      });
    }
  },
  findAll: async (req, res) => {
    await Product.find({})
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        console.log("Get products error:", err);
        res.status(500).json({
          errorMessage: "Please try again later!",
        });
      });
  },
  search: async (req, res) => {
    let query = req.params.query;
    if (query) {
      await Product.find({
        title: {
          $regex: query,
          $options: "i",
        },
      })
        .then((products) => {
          res.status(200).json({
            data: products,
          });
        })
        .catch((err) => {
          console.log("Error to get products:", err);
          res.status(500).json({
            errorMessage: "Please try again later!",
          });
        });
    }
  },
  filter: async (req, res) => {
    if (req.params.category !== "none") {
      let categories = req.params.category;
      categories = categories.split(",");
      await Product.find({ category: categories })
        .then((products) => {
          res.status(200).json({
            data: products,
          });
        })
        .catch((err) => {
          console.log("Filter products error:", err);
          res.status(500).json({
            errorMessage: "Please try again later!",
          });
        });
    } else if (req.params.category === "none") {
      Product.find({})
        .then((products) => {
          res.status(200).json({
            data: products,
          });
        })
        .catch((err) => {
          console.log("Filter products error:", err);
          res.status(500).json({
            errorMessage: "Please try again later!",
          });
        });
    }
  },
  sort: async (req, res) => {
    let categories = undefined;
    if (req.query.filter !== undefined) {
      categories = req.query.filter;
    } else {
      categories = undefined;
    }
    const sortBy = req.params.option;
    if (categories !== undefined) {
      if (sortBy === "price") {
        if (flag === -1) {
          await Product.find({ category: categories })
            .sort({ price: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = 1;
          console.log(flag);
        } else if (flag === 1) {
          await Product.find({ category: categories })
            .sort({ price: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = -1;
        }
      } else if (sortBy === "new") {
        if (flag === -1) {
          await Product.find({ category: categories })
            .sort({ createdAt: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = 1;
        } else if (flag === 1) {
          await Product.find({ category: categories })
            .sort({ createdAt: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = -1;
        }
      } else if (sortBy === "a_z") {
        if (flag === -1) {
          await Product.find({ category: categories })
            .sort({ title: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = 1;
        } else if (flag === 1) {
          await Product.find({ category: categories })
            .sort({ title: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = -1;
        }
      }
    } else if (categories === undefined) {
      if (sortBy === "price") {
        if (flag === -1) {
          await Product.find({})
            .sort({ price: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = 1;
        } else if (flag === 1) {
          await Product.find({})
            .sort({ price: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = -1;
        }
      } else if (sortBy === "new") {
        if (flag === -1) {
          await Product.find({})
            .sort({ createdAt: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = 1;
        } else if (flag === 1) {
          await Product.find({})
            .sort({ createdAt: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = -1;
        }
      } else if (sortBy === "a_z") {
        if (flag === -1) {
          await Product.find({})
            .sort({ title: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = 1;
        } else if (flag === 1) {
          await Product.find({})
            .sort({ title: flag })
            .then((product) => {
              res.status(200).json(product);
            })
            .catch((err) => {
              console.log("Get products error:", err);
              res.status(500).json({
                errorMessage: "Please try again later!",
              });
            });
          flag = -1;
        }
      }
    }
  },
  findById: async (req, res) => {
    await Product.findById({ _id: req.params.id })
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((err) => {
        console.log("Get product by id error:", err);
        res.status(500).json({
          errorMessage: "Please try again later!",
        });
      });
  },
  update: async (req, res) => {
    // console.log(req.user)
    const id = req.body._id;
    // console.log(id)
    // console.log(req.files)
    // let upTitle = title.charAt(0).toUpperCase() + title.slice(1);
    // req.body.title = upTitle
    // // console.log(req.body.title)
    // let product = await Product.findOne({ title: title })
    // if (!product) {
    //   // product = await Product.findOne({ title: upTitle })
    //   res.status(400).json({
    //     errorMessage: `The product ${upTitle} doesn't exists!`,
    //   });
    //   }else {
    // console.log(product)
    try {
      await Product.findOneAndUpdate(
        { _id: id },
        { $set: req.body.data },
        { useFindAndModify: false }
      ).then((response) => console.log(response));
      res.status(200).json({
        successMessage: `${req.body.data.title} was updated`,
      });
    } catch (err) {
      console.log("Update product error:", err);
      res.status(500).json({
        errorMessage: "Please try again later!",
      });
    }
    // }
  },
  updateInCart: async (req, res) => {
    const _id = req.body._id;
    try {
      let data = await Product.updateOne({ _id }, { inCart: req.body.data });
      console.log(data);
      res.status(200).json(data);
    } catch {
      res.status(500).json("Please try again later!");
    }
  },
  checkIfInCart: async (req, res) => {
    await Product.find({ inCart: true })
      .then((product) => {
        res.status(200).json({ product });
      })
      .catch((err) => res.status(500).json({ err }));
  },
  delete: async (req, res) => {
    // const { _id } = req.body;
    // let upTitle = title.charAt(0).toUpperCase() + title.slice(1);
    // const exists = await Product.findOne({ title: upTitle });
    // console.log(!exists);
    // if (!exists) {
    //   res.status(400).json({
    //     errorMessage: `The product ${title} doesn't exists!`,
    //   });
    // } else {

    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({
        successMessage: "Product was removed!",
      });
    } catch (err) {
      console.log("Delete product error:", err);
      res.status(500).json({
        errorMessage: "Please try again later!",
      });
    }
  },
  findUserProductsById: async (req, res) => {
    console.log(req.body, req.params)
    const _id = req.params.id;
    try {
      const data = await Product.find({ writer: _id });
      res.status(200).json({ data });
    } catch (err) {
      console.log("Fetching products error:", err);
      res.status(500).json("Error at fetching products!");
    }
  },
  findLatest: async (req, res) => {
    try {
      await Product.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .then((response) => {
          res.status(200).json(response);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
