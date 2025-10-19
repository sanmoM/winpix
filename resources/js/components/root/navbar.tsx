import { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import Container from "../shared/container";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDiscoverDropdownOpen, setIsDiscoverDropdownOpen] = useState(false);



    const toggleDropdown = (name) => {
        if (name === 'Discover') {
            setIsDiscoverDropdownOpen(prev => !prev);
        }
    };

    const NavItem = ({ name, href, isDropdown }) => {
        // Shared styling for nav links
        const linkClasses = "text-sm font-medium transition duration-150 ease-in-out hover:text-indigo-400";

        if (isDropdown) {
            return (
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown(name)}
                        className={`flex items-center ${linkClasses} focus:outline-none`}
                        aria-expanded={isDiscoverDropdownOpen}
                    >
                        {name}
                        <IoIosArrowDown className="ml-1 w-3 h-3 transition-transform duration-200" style={{ transform: isDiscoverDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    {isDiscoverDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl overflow-hidden md:min-w-[150px]">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Browse Games</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Partners</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Community Hub</a>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <a href={href} className={linkClasses}>
                {name}
            </a>
        );
    };
    const navLinks = [
        { name: 'Discover', isDropdown: true },
        { name: 'Quests', href: '#' },
        { name: 'Store', href: '#' },
        { name: 'Redeem', href: '#' },
    ];
    return (
        <div className='bg-gray-900/70'>
            <Container>
                <nav className="w-full backdrop-blur-lg  text-gray-200 z-50 shadow-lg">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">

                            {/* Left Section: Logo and Desktop Links */}
                            <div className="flex items-center">
                                <div className="flex items-center space-x-2">
                                    {/* Logo - Placeholder for the purple 'W' icon */}
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center p-1">
                                        <span className="text-white font-black text-xl leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>W</span>
                                    </div>
                                    <span className="text-xl font-bold tracking-wider text-gray-100 hidden sm:block">WULF.gg</span>
                                </div>
                                <div className="hidden md:block ml-10">
                                    <div className="flex items-baseline space-x-6">
                                        {navLinks.map(link => (
                                            <NavItem
                                                key={link.name}
                                                name={link.name}
                                                href={link.href}
                                                isDropdown={link.isDropdown}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Section: Auth Buttons (Desktop) */}
                            <div className="hidden md:flex items-center space-x-4">
                                <a href="#" className="text-sm font-medium hover:text-indigo-400 transition duration-150 ease-in-out">
                                    Login
                                </a>
                                <button className="px-4 py-2 text-sm font-semibold bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-100 transition duration-150 ease-in-out border-2 border-white">
                                    Sign up
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="-mr-2 flex md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
                                    aria-controls="mobile-menu"
                                    aria-expanded={isMenuOpen}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMenuOpen ? (
                                        <IoMdClose className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <FiMenu className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Content (conditionally rendered) */}
                    {isMenuOpen && (
                        <div className="md:hidden" id="mobile-menu">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/90">
                                {navLinks.map(link => (
                                    <div key={link.name} className="relative">
                                        {/* Mobile Nav Links and Dropdown Toggle */}
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${link.isDropdown ? 'flex justify-between items-center' : ''} text-gray-300 hover:bg-gray-700 hover:text-white`}
                                        >
                                            {link.name}
                                            {link.isDropdown && <IoIosArrowDown className="ml-1 w-4 h-4" />}
                                        </button>

                                        {/* Mobile Dropdown Menu (only for Discover) */}
                                        {link.isDropdown && isDiscoverDropdownOpen && (
                                            <div className="pl-6 pt-1 pb-1 space-y-1 bg-gray-900/90 rounded-b-md">
                                                <a href="#" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">Browse Games</a>
                                                <a href="#" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">Partners</a>
                                                <a href="#" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">Community Hub</a>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Mobile Auth Buttons */}
                                <div className="pt-4 border-t border-gray-700 flex flex-col space-y-3">
                                    <a href="#" className="text-center block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Login
                                    </a>
                                    <button className="w-full text-center px-4 py-2 text-base font-semibold bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-100 transition duration-150 ease-in-out border-2 border-white">
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </Container>
        </div>
    )
}
