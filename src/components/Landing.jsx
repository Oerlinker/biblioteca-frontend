import React from 'react';
import { Link } from 'react-router-dom';
import fondo from '../assets/fondo.jpeg';

const LandingPage = () => {
    return (
        <div className="bg-gray-100 text-gray-800 font-sans">
            <section className="bg-cover bg-center h-96"style={{ backgroundImage: `url(${fondo})` }}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center text-white px-4">
                        <h2 className="text-4xl font-semibold mb-4">Descubre tu próxima lectura</h2>
                        <p className="mb-8">Explora un mundo de historias, conocimiento e inspiración en nuestra colección seleccionada cuidadosamente.</p>
                        <Link to="/books" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Explorar Catálogo</Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto my-16 px-4 text-center">
                <h3 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">En Librería Alejandría, creemos en el poder de los libros para enriquecer vidas. Nos enorgullece ofrecer una variedad de títulos que van desde los clásicos hasta las nuevas voces emergentes, siempre enfocados en la calidad y el valor literario.</p>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold text-center mb-12">Testimonios de nuestros alumnos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                            <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                                <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM12 14c-3.1 0-9 1.5-9 4.5V22h18v-3.5c0-3-5.9-4.5-9-4.5z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-lg">Ana Sánchez</p>
                            <p className="text-gray-500 text-center">“Gracias a esta librería, he encontrado libros que realmente cambiaron mi vida. Muy recomendada.”</p>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                            <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                                <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM12 14c-3.1 0-9 1.5-9 4.5V22h18v-3.5c0-3-5.9-4.5-9-4.5z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-lg">Luis Martínez</p>
                            <p className="text-gray-500 text-center">“El servicio y la calidad de los libros son excepcionales. Siempre encuentro lo que busco y más.”</p>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                            <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                                <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM12 14c-3.1 0-9 1.5-9 4.5V22h18v-3.5c0-3-5.9-4.5-9-4.5z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-lg">Sofía López</p>
                            <p className="text-gray-500 text-center">“Los libros de aquí me han inspirado a aprender y crecer en muchas áreas. Me encanta la selección.”</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white text-center">
                <h3 className="text-3xl font-semibold mb-4">Únete a nuestra comunidad de lectores</h3>
                <p className="text-gray-600 mb-8">Recibe recomendaciones exclusivas, eventos y promociones especiales directamente en tu bandeja de entrada.</p>
                <form className="flex justify-center items-center">
                    <input type="email" placeholder="Ingresa tu correo electrónico" className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none" />
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600 transition">Suscribirse</button>
                </form>
            </section>

            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Librería Alejandría. Todos los derechos reservados.</p>
                    <p className="mt-4">
                        <Link to="/" className="text-gray-400 hover:text-white">Política de Privacidad</Link> | <Link to="/terms" className="text-gray-400 hover:text-white">Términos y Condiciones</Link>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
