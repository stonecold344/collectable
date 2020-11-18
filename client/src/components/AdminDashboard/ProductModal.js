import React, { useState, Fragment, useEffect } from 'react'
import { createProduct } from "../../api/product";
import isEmpty from "validator/lib/isEmpty";
import { showErrMessage, showSuccessMessage } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { getCategory } from '../../api/category'
const ShowAddProductModal = () => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState()
    const [description, setDescription] = useState("")
    const [continents, setContinents] = useState("")
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])

    useEffect(() => {
      getCategory()
        .then(res => {
          setCategories(res)
          console.log(res)
        })
        .catch(err => console.log(err))}
    , [])

    // ********************
    // Event Handler
    // ********************
    const onClickSelect = (e) =>{
      getCategory()
      .then(res => {
        setCategories(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
    const handleMessages = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
      };
    const onCategoryChangeHandler = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
        setCategory(e.target.value);
    };
    const onTitleChangeHandler = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
        setTitle(e.target.value);
    };
    const onPriceChangeHandler = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
        setPrice(e.target.value);
    };
    const onImageChangeHandler = (e) => {
      console.log(e.target.files[0])
      setErrorMsg("")
      setSuccessMsg("")
      setImage(e.target.files[0])
    }
    const onDescriptionChangeHandler = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
        setDescription(e.target.value);
    };
    const onContinentsChangeHandler = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
        setContinents(e.target.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // const data = {category, title, price, image, description, continents};
        // console.log(data)
        if (isEmpty(category) && isEmpty(title) && isEmpty(price) && isEmpty(description) && isEmpty(continents) && image == null) {
          setErrorMsg("Error! From is empty, please fill all the fields!");
        }
        else if (isEmpty(category)) {
          setErrorMsg("Error! Please enter a category!");
        }
        else if (isEmpty(title)) {
          setErrorMsg("Error! Please enter a title!");
        }
        else if (isEmpty(price)) {
          setErrorMsg("Error! Please enter a price!");
        }
        else if (image == null) {
          setErrorMsg("Error! Please enter a lest one image!");
        }
        else if (isEmpty(description)) {
          setErrorMsg("Error! Please enter a description!");
        }
        else if (isEmpty(continents)) {
          setErrorMsg("Error! Please enter a continents!");
        }
        else {
          setLoading(true);
          let formData = new FormData()
          formData.append('title', title)
          formData.append('price', price)
          formData.append('description', description)
          formData.append('continents', continents)
          formData.append('category', category)
          formData.append('image', image)

          createProduct(formData)
            .then((response) => {
              setLoading(false);
              setSuccessMsg(response.data.successMessage);
              setCategory("");
              setTitle("")
              setPrice("")
              setImage(null)
              setDescription("")
              setContinents("")
            })
            .catch((err) => {
              setLoading(false);
              setErrorMsg(err.response.data.errorMessage);
            });
        }
      };
    // ********************
    // View
    // ********************
    return(
    <div id="addProductModal" className="modal fade" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-secondary">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Add Product</h5>
              <span className="close">
                <i className="fas fa-times" data-dismiss="modal"></i>
              </span>
          </div>

          <form action="post"  method="POST" onSubmit={onSubmitHandler}>
            <div className="modal-body my-4 ">
              {errorMsg && showErrMessage(errorMsg)}
              {successMsg && showSuccessMessage(successMsg)}
              {loading ? (
                <div className="text-center pb-4">
                    {showLoading()}
                    </div>
              ) : (
                <Fragment>
                  <label className="text-white">All Form fields are needed!!</label>
                  <div className="form-group">
                    <label className="text-white">Title :</label>
                    <input
                        type="text"
                        className="form-control input-sm "
                        placeholder="Example: Vintage coins "
                        name="title"
                        value={title}
                        onChange={onTitleChangeHandler}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="text-white">Price:</label>
                    <input
                        type="text"
                        className="form-control input-sm "
                        placeholder="Example: 100 USD"
                        name="price"
                        value={price}
                        onChange={onPriceChangeHandler}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="text-white">Description :</label>
                    <textarea
                        type="text"
                        className="form-control input-md "
                        placeholder="Example: Coins from 1880"
                        name="description"
                        rows="3"
                        value={description}
                        onChange={onDescriptionChangeHandler}
                    ></textarea>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-md-6">
                          <label className="text-white">Category :</label>
                          <select className="form-control custom-select mr-sm-2" name="category"  onChange={onCategoryChangeHandler} onClick={onClickSelect}>
                            <option defaultValue="Choose one option..." >Choose one option...</option>
                            { categories && categories.map((item, index) =>{
                              return(<option key={index}>{item.category}</option>)
                            }) }
                          </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="text-white">Quantity :</label>
                        <input
                            type="number"
                            className="form-control input-sm "
                            placeholder="Example: Electronics"
                            name="continents"
                            min="0"
                            max="1000"
                            value={continents}
                            onChange={onContinentsChangeHandler}
                        ></input>
                    </div>
                  </div>
                  <div className="form-group">
                          <label className="text-white">Images :</label>
                          <div className="custom-file">
                              <input
                                  type="file"
                                  aria-label="File browser example"
                                  className="custom-file-input "
                                  name="image"
                                  value=''
                                  onChange={onImageChangeHandler}
                              ></input>
                              <label className="custom-file-label">{image ? (<span>Choose file</span>) : (<span>{image}</span>)}</label>
                         </div>
                    </div>
                </Fragment>
              )}
            </div>
            <hr/>
            <div className="modal-fotter d-flex justify-content-center my-4">
              <div className="container-fluid">
                <button className="btn btn-danger btn-block" type="submit">
                  Submit
                </button>
                <button className="btn btn-dark btn-block" data-dismiss="modal">
                  Close{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShowAddProductModal