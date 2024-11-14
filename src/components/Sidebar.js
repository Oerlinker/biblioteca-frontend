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

    if (!user || user.rol !== 4) {
        return null;
    }

    const adminLinks = [
        { name: "CU:8 Administrar Catalogo", path: "/admin/agregar-libro" },
        { name: "CU:8 Administrar Autores", path: "/admin/gestionar-autores" },
        { name: "CU:8 Administrar Editoriales", path: "/admin/gestionar-editoriales" },
        { name: "CU:8 Administrar Categorias", path: "/admin/gestionar-categorias" },
        { name: "CU:8 Administrar Ediciones", path: "/admin/gestionar-ediciones" },
        { name: "CU:11&12 Infor/Administrar Proveedores", path: "/admin/gestionar-proveedores" },
        { name: "Reporte de Usuario", path: "/admin/administrar-usuarios/getall-usuarios" },
        { name: "CU:9 Administrar Miembros", path: "/admin/administrar-usuarios/administrar-roles" },
        { name: "CU:10 Generar Reporte De Uso", path: "/admin/administrar-usuarios/activity-log" },
        { name: "Reporte de Miembros", path: "/admin/administrar-usuarios/administrar-miembros" },
    ];

    const librosLinks = [
        { name: "CU:3 Buscar libros en el catálogo", path: "/libros/buscar" },
        { name: "CU:7 Hacer reseñas y calificar libros", path: "/libros/reseñas" },
        { name: "CU:10 Generar reportes de uso", path: "/libros/reportes" },
        { name: "CU:14 Búsqueda avanzada de libros", path: "/libros/busqueda-avanzada" },
        { name: "CU:16 Ver detalles de un libro", path: "/libros/detalles" },
    ];

    const prestamosLinks = [
        { name: "CU:4 Solicitar préstamo de un libro", path: "/prestamos/solicitar" },
        { name: "CU:5 Gestionar préstamos", path: "/prestamos/gestionar" },
        { name: "CU:6 Devolver un libro", path: "/prestamos/devolver" },
        { name: "CU:21 Leer libros", path: "/prestamos/leer" },
    ];

    const usuariosLinks = [
        { name: "CU:1 Registrarse en el sistema", path: "/usuarios/registrarse" },
        { name: "CU:2 Iniciar sesión", path: "/usuarios/iniciar-sesion" },
        { name: "CU:17 Acceder como visitante", path: "/usuarios/visitante" },
        { name: "CU:18 Ver historial de préstamos y actividad", path: "/usuarios/historial" },
        { name: "CU:15 Modificar perfil", path: "/usuarios/modificar-perfil" },
        { name: "CU:19 Marcar posición de lectura", path: "/usuarios/marcar-posicion" },
        { name: "CU:20 Ver historial de libros leídos", path: "/usuarios/historial-leidos" },
    ];

    return (
        <>
            {/* Botón de menú para dispositivos móviles */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-gray-900 rounded-md"
                onClick={toggleMobileSidebar}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
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
                        <svg className={`w-5 h-5 ml-auto transform transition-transform duration-300 ${isAdminOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    {isAdminOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {adminLinks.map(link => (
                                <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Paquete de Libros */}
                    <button onClick={toggleLibrosMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Libros</span>
                        <svg className={`w-5 h-5 ml-auto transform transition-transform duration-300 ${isLibrosOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    {isLibrosOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {librosLinks.map(link => (
                                <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Paquete de Préstamos */}
                    <button onClick={togglePrestamosMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Préstamos</span>
                        <svg className={`w-5 h-5 ml-auto transform transition-transform duration-300 ${isPrestamosOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    {isPrestamosOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {prestamosLinks.map(link => (
                                <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Paquete de Usuarios */}
                    <button onClick={toggleUsuariosMenu} className="flex items-center w-full px-4 py-2 text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-700 hover:text-white">
                        <span className={`mx-4 font-medium ${isHovered ? 'inline' : 'hidden'}`}>Usuarios</span>
                        <svg className={`w-5 h-5 ml-auto transform transition-transform duration-300 ${isUsuariosOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    {isUsuariosOpen && isHovered && (
                        <div className="pl-8 space-y-2">
                            {usuariosLinks.map(link => (
                                <Link key={link.name} to={link.path} className="block px-4 py-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>
            </div>

            {/* Overlay para cerrar el sidebar en móviles */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-30 bg-black opacity-50 md:hidden" onClick={toggleMobileSidebar}></div>
            )}
        </>
    );
};

export default Sidebar;
