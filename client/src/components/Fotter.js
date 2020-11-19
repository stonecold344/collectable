import React from 'react'
import { Link } from 'react-router-dom'

const Fotter = () => {
    const showFotter = () => (
        <div className="container fixed">
            <div className="row pb-3">
                <div className="col-md-12">
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <Link to="https://collections.com/"> collections.com</Link>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
    <footer className="page-footer font-small bg-dark">
        {showFotter()}
    </footer>
    )
}

export default Fotter

