import { useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../UserContext';
import LandingPage from "./Landing";
import Register from "../Pages/Register";
import Login from "../Pages/login";
import Books from "../Pages/Books";
import BookDetail from "../Pages/BookDetails";
import AccountForm from "../Pages/AccountForm";
import EditName from "../Pages/EditName";
import EditEmail from "../Pages/EditEmail";
import EditPassword from "../Pages/EditPassword";
import SubscriptionForm from "../Pages/SubscriptionForm";
import GestionarPrestamos from "../Pages/GestionarPrestamos";
import BookCrud from "./BookCrud";
import AdministrarUsuarios from "../Pages/AdministrarUsuario";
import GetAllUsuarios from "../Pages/GetAllUsuarios";
import AdministrarRoles from "../Pages/AdministrarRoles";
import ActivityLog from "../Pages/ActivityLog";
import AdministrarMiembrosForm from "../Pages/AdministrarMiembrosForm";
import ProveedorForm from "../Pages/ProveedorForm";
import EditorialForm from "../Pages/EditorialForm";
import CategoriaForm from "../Pages/CategoriaForm";
import EdicionesForm from "../Pages/EdicionesForm";
import AutorForm from "../Pages/autorForm";
import Sidebar from "./Sidebar";
import {Route, Routes} from "react-router-dom";


function App() {
    const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userData = { id: decodedToken.id, nombre: decodedToken.nombre, correo: decodedToken.correo, rol: decodedToken.rol, permisos: decodedToken.permisos };
            setUser(userData);
            setIsLoggedIn(true);
            console.log("Usuario logueado:", userData);
            console.log("Token decodificado:", decodedToken);
        }
    }, [setUser, setIsLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser({});
    };

    return (
        <Router>
            <Header handleLogout={handleLogout} />
            <div className="flex">
                {isLoggedIn && (user.rol === 4 || user.permisos.includes('admin_access')) && <Sidebar />}
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/books" element={<Books />} />
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
                        {isLoggedIn && (user.rol === 4 || user.permisos.includes('admin_access')) && (
                            <>
                                <Route path="/admin/agregar-libro" element={<BookCrud />} />
                                <Route path="/admin/modificar-libro/:id" element={<BookCrud />} />
                                <Route path="/admin/obtener-libros" element={<BookCrud />} />
                                <Route path="/admin/actualizar-libro" element={<BookCrud />} />
                                <Route path="/admin/eliminar-libro" element={<BookCrud />} />
                                <Route path="/admin/administrar-usuarios/*" element={<AdministrarUsuarios />} />
                                <Route path="/admin/administrar-usuarios/getall-usuarios" element={<GetAllUsuarios />} />
                                <Route path="/admin/administrar-usuarios/administrar-roles" element={<AdministrarRoles />} />
                                <Route path="/admin/administrar-usuarios/activity-log" element={<ActivityLog />} />
                                <Route path="/admin/administrar-usuarios/administrar-miembros" element={<AdministrarMiembrosForm />} />
                                <Route path="/admin/gestionar-proveedores" element={<ProveedorForm />} />
                                <Route path="/admin/gestionar-proveedores" element={<ProveedorForm />} />
                                <Route path="/admin/gestionar-editoriales" element={<EditorialForm />} />
                                <Route path="/admin/gestionar-categorias" element={<CategoriaForm />} />
                                <Route path="/admin/gestionar-ediciones" element={<EdicionesForm />} />
                                <Route path="/admin/gestionar-autores" element={<AutorForm />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;