
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './Pages/login';
import Books from './Pages/Books';
import BookDetail from './Pages/BookDetails';
import AdminPanel from './Pages/AdminPanel';
import Register from './Pages/Register';
import ModificarCatalogo from './Pages/ModificarCatalogo';

import AdministrarUsuarios from './Pages/AdministrarUsuario';
import GetAllUsuarios from './Pages/GetAllUsuarios';
import AdministrarRoles from './Pages/AdministrarRoles';
import AccountForm from './Pages/AccountForm';
import EditName from './Pages/EditName';
import EditEmail from './Pages/EditEmail';
import ActivityLog from './Pages/ActivityLog';
import HomePage from './Pages/HomePage';
import EditPassword from './Pages/EditPassword';
import SubscriptionForm from './Pages/SubscriptionForm';
import ProveedorForm from "./Pages/ProveedorForm";
import GestionarPrestamos from './Pages/GestionarPrestamos';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { UserProvider } from './UserContext';
import BookCrud from './components/BookCrud';



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userData = { id: decodedToken.id, nombre: decodedToken.nombre, correo: decodedToken.correo, rol: decodedToken.rol };
            setUser(userData);
            setIsLoggedIn(true);
            console.log("Usuario logueado:", userData);
            console.log("Token decodificado:", decodedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser({});
    };

    return (
        <UserProvider>
            <Router>
                <Header handleLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/books" element={<Books/>} />
                    <Route path="/libro/:id" element={<BookDetail />} />
                    <Route path="/account/*" element={<AccountForm />} />
                    <Route path="/account/edit-name" element={<EditName />} />
                    <Route path="/account/edit-email" element={<EditEmail />} />
                    <Route path="/account/edit-password" element={<EditPassword />} />
                    <Route path="/subscription" element={<SubscriptionForm />} />
                    
                    {isLoggedIn && user.rol === 2 && (
                    <>
                        <Route path="/gestionar-prestamos" element={<GestionarPrestamos />} />
                    </>
                    )}
                    {isLoggedIn && user.rol === 4 && (
                        <>
                            <Route path="/admin" element={<AdminPanel />} />
                            <Route path="/admin/agregar-libro" element={<BookCrud />} />
                            <Route path="/admin/modificar-libro/:id" element={<BookCrud />} />
                            <Route path="/admin/modificar-catalogo/*" element={<ModificarCatalogo />} />
                            <Route path="/admin/obtener-libros" element={<BookCrud />} />
                            <Route path="/admin/actualizar-libro" element={<BookCrud />} />
                            <Route path="/admin/eliminar-libro" element={<BookCrud />} />
                            <Route path="/admin/administrar-usuarios/*" element={<AdministrarUsuarios />} />
                            <Route path="/admin/administrar-usuarios/getall-usuarios" element={<GetAllUsuarios />} />
                            <Route path="/admin/administrar-usuarios/administrar-roles" element={<AdministrarRoles />} />
                            <Route path="/admin/administrar-usuarios/activity-log" element={<ActivityLog />} />
                            <Route path="/admin/gestionar-proveedores" element={<ProveedorForm />} />
                        </>
                    )}
                </Routes>
            </Router>
        </UserProvider>
    );
}
export default App;
