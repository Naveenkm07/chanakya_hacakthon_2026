import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('userToken');

    if (!token) {
        // Redirect to login if not logged in
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
