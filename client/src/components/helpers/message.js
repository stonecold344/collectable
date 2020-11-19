import React from 'react'

export const showErrMessage = (msg) => (
    <div className="alert alert-danger text-center" role="alert">
        {msg}
    </div>
)

export const showSuccessMessage = (msg) => (
    <div className="alert alert-success text-center" role="alert">
        {msg}
    </div>
)
