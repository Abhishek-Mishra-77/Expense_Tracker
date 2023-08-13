import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouts = () => {
    const idToken = localStorage.getItem('token');
    return idToken ? <Outlet /> : <Navigate to={'/auth'} />
}

export default PrivateRouts