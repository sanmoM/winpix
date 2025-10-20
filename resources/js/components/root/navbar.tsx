
import { useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import Container from "../shared/container";
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiscoverDropdownOpen, setIsDiscoverDropdownOpen] = useState(false);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setTop(offset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const toggleDropdown = () => {
    setIsDiscoverDropdownOpen(prev => !prev);
  };

  const navLinks: { name: string, href?: string, isDropdown?: boolean }[] = [
    { name: 'Discover', isDropdown: true },
    { name: 'Quests', href: '#' },
    { name: 'Store', href: '#' },
    { name: 'Redeem', href: '#' },
  ];

  const NavItem = ({ name, href, isDropdown }: { name: string, href?: string, isDropdown?: boolean }) => {
    const linkClasses = "text-sm font-medium transition duration-150 ease-in-out hover:text-gray-300";

    if (isDropdown) {
      return (
        <div className="relative group">
          {/* Desktop */}
          <button className="hidden md:flex items-center cursor-pointer focus:outline-none font-medium">
            {name}
            <IoIosArrowDown className="ml-1 w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
          </button>

          {/* Desktop Dropdown */}
          <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl overflow-hidden md:min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Browse Games</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Partners</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Community Hub</a>
          </div>
        </div>
      );
    }

    return <a href={href} className={linkClasses}>{name}</a>;
  };

  return (
    <div className={cn(' left-0 fixed top-0 z-[20] w-full', top <= 0 ? 'bg-transparent text-white' : 'bg-white text-black')}>
      <Container>
        <nav className="w-full z-50">
          <div className="">
            <div className="flex items-center justify-between h-16">

              {/* Left Section: Logo and Desktop Links */}
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center p-1">
                    <span className=" font-black text-xl leading-none text-white" style={{ fontFamily: 'Inter, sans-serif' }}>W</span>
                  </div>
                  <span className="text-xl font-bold tracking-wider  hidden sm:block">WULF.gg</span>
                </div>

                <div className="hidden md:block ml-10">
                  <div className="flex items-baseline space-x-6">
                    {navLinks.map(link => (
                      <NavItem
                        key={link.name}
                        name={link.name}
                        href={link.href || '#'}
                        isDropdown={link.isDropdown}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section: Auth Buttons (Desktop) */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-sm font-medium hover:text-indigo-400 transition duration-150 ease-in-out">Login</a>
                <button className={cn("px-4 py-2 text-sm font-semibold bg-white text-gray-900 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out border-2 border-white", top <= 0 ? 'text-black bg-white' : 'text-white bg-blue-500')}>Sign up</button>
              </div>

              {/* Mobile Menu Button */}
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
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

          {/* Mobile Menu Content */}
          {isMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/90">
                {navLinks.map(link => (
                  <div key={link.name} className="relative">
                    {/* Mobile Nav Links */}
                    <button
                      onClick={() => link.isDropdown && toggleDropdown()}
                      className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${link.isDropdown ? 'flex justify-between items-center' : ''} text-gray-300 hover:bg-gray-700 hover:text-white`}
                    >
                      {link.name}
                      {link.isDropdown && <IoIosArrowDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDiscoverDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />}
                    </button>

                    {/* Mobile Dropdown */}
                    {link.isDropdown && isDiscoverDropdownOpen && (
                      <div className="lg:pl-6 pt-1 pb-1 space-y-1 bg-gray-900/90 rounded-md">
                        <a href="#" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">Browse Games</a>
                        <a href="#" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">Partners</a>
                        <a href="#" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">Community Hub</a>
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-700 flex flex-col space-y-3">
                  <a href="#" className="text-center block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</a>
                  <button className="w-full text-center px-4 py-2 text-base font-semibold bg-white text-gray-900 rounded-full shadow-md hover:bg-gray-100 transition duration-150 ease-in-out border-2 border-white">Sign up</button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </div>
  );
}
