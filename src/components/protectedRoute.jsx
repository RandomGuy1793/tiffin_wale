import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, isCustomer, children}) {
    if(isLoggedIn && !isCustomer) return children
    return ( <Navigate to="/tiffin-vendor/login" replace /> );
}

export default ProtectedRoute;