import React from "react";
import showActionBtns from "./Buttons";
import showHeader from "./ShowHeader";
import ShowAddProductModal from "./ProductModal"
import ShowCategoryModal from './CategoryModal'
import ShowRemoveCategoryModal from './RemoveCategory'
import ShowRemoveProductModal from './RemoveProduct.js'
import ShowUpdateProductModal from './UpdateProduct'

const AdminDashboard = () => {
  // ********************
  // Render
  // ********************
  return (
    <div >
      {showHeader()}
      {showActionBtns()}
      {ShowCategoryModal()}
      {ShowAddProductModal()}
      {ShowUpdateProductModal()}
      {ShowRemoveCategoryModal()}
      {ShowRemoveProductModal()}
    </div>
  );
};

export default AdminDashboard;
