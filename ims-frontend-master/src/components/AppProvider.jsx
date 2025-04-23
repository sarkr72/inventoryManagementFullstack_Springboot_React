import React, { useEffect, useState } from 'react';
import { getRoles } from "../services/EmployeeService";
import { isUserLoggedIn } from '../services/AuthService';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem("role") || '');
    // const [loading, setLoading] = useState(true);

    // const fetchRoles = async () => {
    //     try {
    //         const response = await getRoles();
    //         const data = response.data;
    //         localStorage.setItem("role", data[0]);
    //         setRole(data[0]);
    //     } catch (error) {
    //         console.error("Failed to fetch roles:", error);
    //     } finally {
    //         setLoading(false); 
    //     }
    // };

    // const signIn = async (credentials) => {
        // await fetchRoles();
    // };

    //  useEffect(() => {
    //     if (isUserLoggedIn) {
    //         fetchRoles();
    //     } else {
    //         setLoading(false); 
    //     }
    // }, []);

    return (
        <AppContext.Provider value={{ role }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext };
export default AppProvider;