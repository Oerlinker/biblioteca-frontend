// src/App.js
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import {useEffect, useContext} from 'react';
import {jwtDecode} from 'jwt-decode';
import {UserContext} from './UserContext';
import BookCrud from './components/BookCrud';
import LandingPage from './components/Landing';
import EdicionesForm from "./Pages/EdicionesForm";
import AutorForm from './Pages/autorForm';
import EditorialForm from "./Pages/EditorialForm";
import CategoriaForm from "./Pages/CategoriaForm";
import UpdateMembersForm from "./Pages/UpdateMembersForm";
import EditMembersName from "./Pages/EditMembersName";
import EditMembersTelefono from "./Pages/EditMembersTelefono";
import EditMembersDireccion from "./Pages/EditMembersDireccion";
import EditMembersCarrera from "./Pages/EditMembersCarrera";
import EditMembersSemestre from "./Pages/EditMembersSemestre";

function App() {
    const {user, isLoggedIn, setUser, setIsLoggedIn,isLoading} = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userData = {
                id: decodedToken.id,
                nombre: decodedToken.nombre,
                correo: decodedToken.correo,
                rol: decodedToken.rol,
                miembroid: decodedToken.miembroid
            };
            setUser(userData);
            setIsLoggedIn(true);
            console.log("Usuario logueado:", userData);
            console.log("Token decodificado:", decodedToken);
        }
    }, [setUser, setIsLoggedIn]);


    if (isLoading) {
        return <p>Cargando aplicación...</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser({});
    };

    return (
        <Router>
            <Header handleLogout={handleLogout}/>
            <div className="flex">
                <Sidebar/>
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/books" element={<Books/>}/>
                        <Route path="/libro/:id" element={<BookDetail/>}/>
                        <Route path="/account/*" element={<AccountForm/>}/>
                        <Route path="/account/edit-name" element={<EditName/>}/>
                        <Route path="/account/edit-email" element={<EditEmail/>}/>
                        <Route path="/account/edit-password" element={<EditPassword/>}/>
                        <Route path="/subscription" element={<SubscriptionForm/>}/>

                        {isLoggedIn && user.rol === 2 && (
                            <>
                                <Route path="/gestionar-prestamos" element={<GestionarPrestamos/>}/>
                                <Route path="/update-members/*" element={<UpdateMembersForm/>}/>
                                <Route path="/update-members/edit-name" element={<EditMembersName/>}/>
                                <Route path="/update-members/edit-phone" element={<EditMembersTelefono/>}/>
                                <Route path="/update-members/edit-direction" element={<EditMembersDireccion/>}/>
                                <Route path="/update-members/edit-career" element={<EditMembersCarrera/>}/>
                                <Route path="/update-members/edit-semester" element={<EditMembersSemestre/>}/>
                            </>
                        )}
                        {isLoggedIn && user.rol === 4 && (
                            <>
                                <Route path="/admin/agregar-libro" element={<BookCrud/>}/>
                                <Route path="/admin/modificar-libro/:id" element={<BookCrud/>}/>
                                <Route path="/admin/obtener-libros" element={<BookCrud/>}/>
                                <Route path="/admin/actualizar-libro" element={<BookCrud/>}/>
                                <Route path="/admin/eliminar-libro" element={<BookCrud/>}/>
                                <Route path="/admin/administrar-usuarios/*" element={<AdministrarUsuarios/>}/>
                                <Route path="/admin/administrar-usuarios/getall-usuarios" element={<GetAllUsuarios/>}/>
                                <Route path="/admin/administrar-usuarios/administrar-roles"
                                       element={<AdministrarRoles/>}/>
                                <Route path="/admin/administrar-usuarios/activity-log" element={<ActivityLog/>}/>
                                <Route path="/admin/administrar-usuarios/administrar-miembros"
                                       element={<AdministrarMiembrosForm/>}/>
                                <Route path="/admin/gestionar-proveedores" element={<ProveedorForm/>}/>
                                <Route path="/admin/gestionar-proveedores" element={<ProveedorForm/>}/>
                                <Route path="/admin/gestionar-editoriales" element={<EditorialForm/>}/>
                                <Route path="/admin/gestionar-categorias" element={<CategoriaForm/>}/>
                                <Route path="/admin/gestionar-ediciones" element={<EdicionesForm/>}/>
                                <Route path="/admin/gestionar-autores" element={<AutorForm/>}/>
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
