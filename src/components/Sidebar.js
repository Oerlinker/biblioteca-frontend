import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Logo from '../assets/logo.png';

const Sidebar = () => {
    const { user } = useContext(UserContext);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isLibrosOpen, setIsLibrosOpen] = useState(false);
    const [isPrestamosOpen, setIsPrestamosOpen] = useState(false);
    const [isUsuariosOpen, setIsUsuariosOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleAdminMenu = () => setIsAdminOpen(!isAdminOpen);
    const toggleLibrosMenu = () => setIsLibrosOpen(!isLibrosOpen);
    const togglePrestamosMenu = () => setIsPrestamosOpen(!isPrestamosOpen);
    const toggleUsuariosMenu = () => setIsUsuariosOpen(!isUsuariosOpen);
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    if (!user) {
        return null;
    }

    const adminLinks = [
        { name: "CU:8 Administrar Catalogo", path: "/admin/agregar-libro", roles: [3, 4] },
        { name: "CU:8 Administrar Autores", path: "/admin/gestionar-autores", roles: [3, 4] },
        { name: "CU:8 Administrar Editoriales", path: "/admin/gestionar-editoriales", roles: [3, 4] },
        { name: "CU:8 Administrar Categorias", path: "/admin/gestionar-categorias", roles: [3, 4] },
        { name: "CU:8 Administrar Ediciones", path: "/admin/gestionar-ediciones", roles: [3, 4] },
        { name: "CU:11&12 Infor/Administrar Proveedores", path: "/admin/gestionar-proveedores", roles: [4] },
        { name: "Reporte de Usuario", path: "/admin/administrar-usuarios/getall-usuarios", roles: [4] },
        { name: "CU:9 Administrar Miembros", path: "/admin/administrar-usuarios/administrar-roles", roles: [4] },
        { name: "CU:10 Generar Reporte De Uso", path: "/admin/administrar-usuarios/activity-log", roles: [4] },
        { name: "Reporte de Miembros", path: "/admin/administrar-usuarios/administrar-miembros", roles: [4] },
    ];

    const librosLinks = [
        { name: "CU:3 Buscar libros en el catálogo", path: "/books", roles: [1, 2, 3, 4] },
        { name: "CU:7 Hacer reseñas y calificar libros", path: "/gestionar-prestamos", roles: [2] },
        { name: "CU:14 Búsqueda avanzada de libros", path: "/books", roles: [2] },
        { name: "CU:16 Ver detalles de un libro", path: "/books", roles: [2, 3, 4] },
    ];

    const prestamosLinks = [
        { name: "CU:4 Solicitar préstamo de un libro", path: "/books", roles: [2] },
        { name: "CU:5 Gestionar préstamos", path: "/gestionar-prestamos", roles: [2] },
        { name: "CU:6 Devolver un libro", path: "/gestionar-prestamos", roles: [2] },
        { name: "CU:21 Leer libros", path: "/gestionar-prestamos", roles: [2] },
    ];

    const usuariosLinks = [
        { name: "CU:1 Registrarse en el sistema", path: "/register", roles: [1] },
        { name: "CU:2 Iniciar sesión", path: "/login", roles: [1] },
        { name: "CU:17 Acceder como visitante", path: "/", roles: [1, 2, 3, 4] },
        { name: "CU:18 Ver historial de préstamos y actividad", path: "/gestionar-prestamos", roles: [2] },
        { name: "CU:15 Modificar perfil", path: "/account/*", roles: [2] },
        { name: "CU:19 Marcar posición de lectura", path: "/gestionar-prestamos", roles: [2] },
        { name: "CU:20 Ver historial de libros leídos", path: "/gestionar-prestamos", roles: [2] },
    ];

    return (
        <>
            {/* Botón de menú para dispositivos móviles */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-gray-900 rounded-md"
                onClick={toggleMobileSidebar}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out transform ${
                    isHovered ? 'w-64' : 'w-16'
                } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-gray-900 text-white border-r border-gray-700`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center justify-center p-4">
                    <img className="w-12 h-12" src={Logo} alt="Logo" />
                </div>

                {/* Menú principal */}
                <nav className="flex flex-col mt-6 space-y-2">
                    {/* Paquete de Administración */}
                    <button onClick={toggleAdminMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Administración</span>
                    </button>
                    {isAdminOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {adminLinks
                                .filter(link => link.roles.includes(user.rol))
                                .map(link => (
                                    <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                        {link.name}
                                    </Link>
                                ))
                            }
                        </div>
                    )}

                    {/* Paquete de Libros */}
                    <button onClick={toggleLibrosMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Libros</span>
                    </button>
                    {isLibrosOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {librosLinks
                                .filter(link => link.roles.includes(user.rol))
                                .map(link => (
                                    <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                        {link.name}
                                    </Link>
                                ))
                            }
                        </div>
                    )}

                    {/* Paquete de Préstamos */}
                    <button onClick={togglePrestamosMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Préstamos</span>
                    </button>
                    {isPrestamosOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {prestamosLinks
                                .filter(link => link.roles.includes(user.rol))
                                .map(link => (
                                    <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                        {link.name}
                                    </Link>
                                ))
                            }
                        </div>
                    )}

                    {/* Paquete de Usuarios */}
                    <button onClick={toggleUsuariosMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Usuarios</span>
                    </button>
                    {isUsuariosOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {usuariosLinks
                                .filter(link => link.roles.includes(user.rol))
                                .map(link => (
                                    <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                        {link.name}
                                    </Link>
                                ))
                            }
                        </div>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
