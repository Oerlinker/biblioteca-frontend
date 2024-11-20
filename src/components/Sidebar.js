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
    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    if (!user || (user.rol !== 3 && user.rol !== 4)) {
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
                </nav>
            </div>
        </>
    );
};

export default Sidebar;