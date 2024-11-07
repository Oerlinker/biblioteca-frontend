
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
                            <>
                                <Route path="/gestionar-prestamos" element={<GestionarPrestamos />} />
                            </>
                        )}
                        {isLoggedIn && user.rol === 4 && (
                            <>
                                <ProtectedRoute path="/admin/agregar-libro" element={<BookCrud />} requiredRole={4} />
                                <ProtectedRoute path="/admin/modificar-libro/:id" element={<BookCrud />} requiredRole={4} />
                                <ProtectedRoute path="/admin/obtener-libros" element={<BookCrud />} requiredRole={4} />
                                <ProtectedRoute path="/admin/actualizar-libro" element={<BookCrud />} requiredRole={4} />
                                <ProtectedRoute path="/admin/eliminar-libro" element={<BookCrud />} requiredRole={4} />
                                <ProtectedRoute path="/admin/administrar-usuarios/*" element={<AdministrarUsuarios />} requiredRole={4} />
                                <ProtectedRoute path="/admin/administrar-usuarios/getall-usuarios" element={<GetAllUsuarios />} requiredRole={4} />
                                <ProtectedRoute path="/admin/administrar-usuarios/administrar-roles" element={<AdministrarRoles />} requiredRole={4} />
                                <ProtectedRoute path="/admin/administrar-usuarios/activity-log" element={<ActivityLog />} requiredRole={4} />
                                <ProtectedRoute path="/admin/administrar-usuarios/administrar-miembros" element={<AdministrarMiembrosForm />} requiredRole={4} />
                                <ProtectedRoute path="/admin/gestionar-proveedores" element={<ProveedorForm />} requiredRole={4} />
                                <ProtectedRoute path="/admin/gestionar-editoriales" element={<EditorialForm />} requiredRole={4} />
                                <ProtectedRoute path="/admin/gestionar-categorias" element={<CategoriaForm />} requiredRole={4} />
                                <ProtectedRoute path="/admin/gestionar-ediciones" element={<EdicionesForm />} requiredRole={4} />
                                <ProtectedRoute path="/admin/gestionar-autores" element={<AutorForm />} requiredRole={4} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
