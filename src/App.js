import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './Pages/login';
import Books from './Pages/Books';
import BookDetail from './Pages/BookDetails';
import Register from './Pages/Register';
import AdministrarUsuarios from './Pages/AdministrarUsuario';
import GetAllUsuarios from './Pages/GetAllUsuarios';
import AdministrarRoles from './Pages/AdministrarRoles';
import AccountForm from './Pages/AccountForm';
import EditName from './Pages/EditName';
import EditEmail from './Pages/EditEmail';
import ActivityLog from './Pages/ActivityLog';
import EditPassword from './Pages/EditPassword';
import SubscriptionForm from './Pages/SubscriptionForm';
import ProveedorForm from "./Pages/ProveedorForm";
import GestionarPrestamos from './Pages/GestionarPrestamos';
import AdministrarMiembrosForm from './Pages/AdministrarMiembrosForm';
import { useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from './UserContext';
import BookCrud from './components/BookCrud';
import LandingPage from './components/Landing';
import EdicionesForm from "./Pages/EdicionesForm";
import AutorForm from './Pages/autorForm';
import EditorialForm from "./Pages/EditorialForm";
import CategoriaForm from "./Pages/CategoriaForm";
import ProtectedRoute from "./components/protectedRoute";

function App() {
    const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext);

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
                {isLoggedIn && user.rol === 4 && <Sidebar />}
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
                            <Route path="/gestionar-prestamos" element={<GestionarPrestamos />} />
                        )}
                        {isLoggedIn && user.rol === 4 && (
                            <>
                                <Route path="/admin/agregar-libro" element={<ProtectedRoute element={BookCrud} requiredRole={4} />} />
                                <Route path="/admin/modificar-libro/:id" element={<ProtectedRoute element={BookCrud} requiredRole={4} />} />
                                <Route path="/admin/obtener-libros" element={<ProtectedRoute element={BookCrud} requiredRole={4} />} />
                                <Route path="/admin/actualizar-libro" element={<ProtectedRoute element={BookCrud} requiredRole={4} />} />
                                <Route path="/admin/eliminar-libro" element={<ProtectedRoute element={BookCrud} requiredRole={4} />} />
                                <Route path="/admin/administrar-usuarios/*" element={<ProtectedRoute element={AdministrarUsuarios} requiredRole={4} />} />
                                <Route path="/admin/administrar-usuarios/getall-usuarios" element={<ProtectedRoute element={GetAllUsuarios} requiredRole={4} />} />
                                <Route path="/admin/administrar-usuarios/administrar-roles" element={<ProtectedRoute element={AdministrarRoles} requiredRole={4} />} />
                                <Route path="/admin/administrar-usuarios/activity-log" element={<ProtectedRoute element={ActivityLog} requiredRole={4} />} />
                                <Route path="/admin/administrar-usuarios/administrar-miembros" element={<ProtectedRoute element={AdministrarMiembrosForm} requiredRole={4} />} />
                                <Route path="/admin/gestionar-proveedores" element={<ProtectedRoute element={ProveedorForm} requiredRole={4} />} />
                                <Route path="/admin/gestionar-editoriales" element={<ProtectedRoute element={EditorialForm} requiredRole={4} />} />
                                <Route path="/admin/gestionar-categorias" element={<ProtectedRoute element={CategoriaForm} requiredRole={4} />} />
                                <Route path="/admin/gestionar-ediciones" element={<ProtectedRoute element={EdicionesForm} requiredRole={4} />} />
                                <Route path="/admin/gestionar-autores" element={<ProtectedRoute element={AutorForm} requiredRole={4} />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;