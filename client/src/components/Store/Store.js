import React, { useState, useEffect } from "react";
import Product from "./Product";
import { getProducts, searchProduct, filterProduct, sortProduct } from "../../api/product";
import Title from ".././helpers/title";
import { getCategory } from "../../api/category";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [found, setFound] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState([])
  const [sort, setSort] = useState([])


  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
        setFound(true);
      })
      .catch((err) => console.log(err));
    getCategory()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => console.log(err));
    setFilter([])  
    setSort([false,false,false])
  }, []);


/////////////////////////////////////////
/////////////// Search //////////////////
////////////////////////////////////////
  const onSearchChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const onSearchSubmitHandler = (e) => {
      e.preventDefault()
      console.log(query)
      if(query === ''){
        getProducts()
        .then((res) => {
          setProducts(res);
        })
      }
      else{
      searchProduct(query)
      .then((res) => {
        if(res.data.data.length === 0){
          setFound(false)
        }
        else{
        setProducts(res.data.data)
        setFound(true)
        }})
      .catch((err) => {
       console.log(err)
       setFound(false)
      })
    }
  }



/////////////////////////////////////////
/////////////// Filter //////////////////
////////////////////////////////////////
const handleToggle = (e) => {
  if(e.target.checked === true){
    filter.push(e.target.value)
    handelFilter(filter)
  }
  else{
    const index  = filter.indexOf(e.target.value)
    if(index > -1){
      filter.splice(index, 1)
    }
    handelFilter(filter)
  }
}
const handelFilter = (cat) => {
  if(cat !== '')
  filterProduct(cat)
  .then((res) => {
    setProducts(res.data.data)
  })
  .catch((err) => console.log(err))
  else{
    getProducts()
    .then((res) => {
      setProducts(res);
    })
  }
  console.log(products)
}

///////////////////////////////////////
/////////////// Sort //////////////////
//////////////////////////////////////
const onSortToggle = (e) => {
  // let data = products
  if(e.target.value === 'price'){
    setSort([true, false, false])
    if(sort[0] === true){
      setSort([false, false, false])
    }
    sortProduct(e.target.value, filter)
    .then((res) =>{
      setProducts(res.data)
    })
    .catch((err) => console.log('Sort products error:', err))
  }
  else if(e.target.value === 'new'){
    setSort([false, true, false])
    if(sort[1] === true){
      setSort([false, false, false])
    }
    sortProduct(e.target.value, filter)
    .then((res) =>{
      setProducts(res.data)
    })
    .catch((err) => console.log('Sort products error:', err))
  }
  else if(e.target.value === 'a_z'){
    setSort([false, false, true])
    if(sort[2] === true){
      setSort([false, false, false])
    }
    sortProduct(e.target.value, filter)
    .then((res) =>{
      setProducts(res.data)
    })
    .catch((err) => console.log('Sort products error:', err))
  }
}





  let cards =
    products.length > 0 ? products &&
    products.map((product) => {
      return <Product key={product._id} product={product} />;
    }):(null)


  let radioBoxes =
    categories &&
    categories.map((category, index) => {
      return index % 2 ? (
        <li key={category._id} className="row form-check " style={{backgroundColor:'#1affc9'}}>
          <label>
            <input
              type="checkbox"
              value={ category.category }
              name={category.category}
              className="mr-1"
              onClick={handleToggle}
            />

          <span className="text-dark">{category.category}</span>
          </label>
        </li>
        )
        :(<li key={category._id} className="row form-check" style={{backgroundColor:"#00cc9c"}}>
          <label>
            <input
              type="checkbox"
              value={ category.category }
              name={category.category}
              className="mr-1"
              onClick={handleToggle}
            />

          <span className="text-dark">{category.category}</span>
          </label>
        </li>
      )
    });
  return (
    <div className="py-5 store">
      <div className="container">
      <form
          className="search"
          onSubmit={onSearchSubmitHandler}
        >
          <input
            type="text"
            placeholder="Search.."
            name="search"
            onChange={onSearchChangeHandler}
          />
          <button type="submit">
            <i className="fa fa-search search-icon"></i>
          </button>
        </form>
        <Title name="our" title="products" />
        <div className="d-flex justify-content-center sort-buttons">
          <button  value='price'  onClick={onSortToggle}>Price <span>{sort[0]?<i className="fas fa-sort-up"></i>:<i className="fas fa-caret-down"></i>}</span></button>
          <button  value='new'  onClick={onSortToggle}>New <span>{sort[1]?<i className="fas fa-sort-up"></i>:<i className="fas fa-caret-down"></i>}</span></button>
          <button  value='a_z' onClick={onSortToggle}>A - Z <span>{sort[2]?<i className="fas fa-sort-up"></i>:<i className="fas fa-caret-down"></i>}</span></button>
          </div>
        <div className="row d-flex justify-content-center py-5">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 ">
          <div className="container ">
          <h4 className="text-center site-title border border-dark bg-info fixed">Categories</h4>

            <ul className="list-unstyled mr-3 filter ml-3 ">
              {radioBoxes}
            </ul>
            </div>
          </div>
          <div className="row d-flex justify-content-center col-12 col-sm-9 col-md-6 col-lg-9 bg-light border border-dark rounded">
            {cards && found ? (
              cards
            ) : (null)}
          </div>
        </div>
      </div>
      </div>
  );
};
export default Store;
