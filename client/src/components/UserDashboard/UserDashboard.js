import React from 'react'
import showHeader from './ShowHeader'
import showActionBtns from './Buttons'
import ShowAddProductModal from './ProductModal'
import ShowUserProducts from './UserProducts'
import UserProfile from './UserProfile'


const UserDashboard = () => {
    //********************
    // Render
    // ********************
    return (
        <div className="profile">
            {showHeader()}
            {UserProfile()}
            {showActionBtns()}
            {ShowAddProductModal()}
            {ShowUserProducts()}
        </div>
    )
}

export default UserDashboard;