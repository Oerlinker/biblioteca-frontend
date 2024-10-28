
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './Pages/login';
import Books from './Pages/Books';
import BookDetail from './Pages/BookDetails';
import AdminPanel from './Pages/AdminPanel';
import Register from './Pages/Register';
import ModificarCatalogo from './Pages/ModificarCatalogo';
import BookForm from './Pages/BookForm';
import DeleteBookForm from './Pages/DeleteBooksForm';
import UpdateBookForm from './Pages/UpdateBookForms';
import GetBooksForm from './Pages/GetBookForm';
import AdministrarUsuarios from './Pages/AdministrarUsuario';
import GetAllUsuarios from './Pages/GetAllUsuarios';
import AdministrarRoles from './Pages/AdministrarRoles';
import AccountForm from './Pages/AccountForm';
import EditName from './Pages/EditName';
import EditEmail from './Pages/EditEmail';
import ActivityLog from './Pages/ActivityLog';
import HomePage from './Pages/HomePage';
import EditPassword from './Pages/EditPassword';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

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
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser({});
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                <Route path="/books" element={<Books />} />
                <Route path="/libro/:id" element={<BookDetail />} />
                <Route path="/account/*" element={<AccountForm user={user} />} />
                <Route path="/account/edit-name" element={<EditName user={user} />} />
                <Route path="/account/edit-email" element={<EditEmail user={user} />} />
                <Route path="/account/edit-password" element={<EditPassword user={user} />} />

                {isLoggedIn && user.rol === 4 && (
                    <>
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/admin/agregar-libro" element={<BookForm />} />
                        <Route path="/admin/modificar-libro/:id" element={<BookForm editMode={true} />} />
                        <Route path="/admin/modificar-catalogo/*" element={<ModificarCatalogo />} />
                        <Route path="/admin/obtener-libros" element={<GetBooksForm />} />
                        <Route path="/admin/actualizar-libro" element={<UpdateBookForm />} />
                        <Route path="/admin/eliminar-libro" element={<DeleteBookForm />} />
                        <Route path="/admin/administrar-usuarios/*" element={<AdministrarUsuarios />} />
                        <Route path="/admin/administrar-usuarios/getall-usuarios" element={<GetAllUsuarios />} />
                        <Route path="/admin/administrar-usuarios/administrar-roles" element={<AdministrarRoles />} />
                        <Route path="/admin/administrar-usuarios/activity-log" element={<ActivityLog />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
