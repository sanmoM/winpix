import { cn } from "@/lib/utils";
import { dashboard, login, register } from "@/routes";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Button from "../../shared/button";
import Container from "../../shared/container";
import Logo from "../../shared/logo";
import NavItem from "./components/nav-item";
import Modal from "@/components/shared/modal";
import StoreModalContents from "@/components/root/store-modal-contents";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [top, setTop] = useState(0);
  const { auth } = usePage<SharedData>().props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { url } = usePage(); 

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  // === Nav Links ===
  const navLinks = [
    {
      name: "Discover",
      isDropdown: true,
      dropdownItems: [
        { name: "Browse Games", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Community Hub", href: "#" },
      ],
    },
    { name: "Quests", href: "#" },
    { name: "Store", href: "/store" },
    { name: "Redeem", href: "#" },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-[20] w-full py-1.5 md:py-3",
        top <= 0 ? "bg-transparent text-white" : "bg-white dark:bg-black", url !== "/" && "sticky top-0 bg-white dark:bg-black text-black dark:text-white"
      )}
    >
      <Container>
        <nav className="w-full z-50">
          <div className="flex items-center justify-between h-16">

            {/* === Left Section === */}
            <div className="flex items-center">
              <Logo />

              {/* Desktop Navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-6">
                  {navLinks.map((link) => (
                    <NavItem
                      key={link.name}
                      name={link.name}
                      href={link.href}
                      isDropdown={link.isDropdown}
                      dropdownItems={link.dropdownItems}
                      variant="desktop"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* === Right Section (Desktop Auth) === */}
            <div className="hidden md:flex items-center space-x-4">
              {auth?.user ? (
                <Link href={dashboard()} className="font-medium hover:text-primary-color">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={login()}
                    className="text-center block rounded-md text-base font-medium "
                  >
                    {/* <Button text="Login" className="w-full" /> */}
                    <button className={cn("border border-white w-full rounded-full py-1 px-8 cursor-pointer", top > 0 && "border-black")}>Login</button>
                  </Link>
                  <Link href={register()}>
                    <Button text="Sign up" className="px-8" />
                  </Link>
                </>
              )}
            </div>

            {/* === Mobile Menu Button === */}
            <div className="-mr-2 flex md:hidden">
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none transition"
              >
                {isMenuOpen ? (
                  <IoMdClose className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* === Mobile Menu Content === */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden mt-2 !bg-white dark:!bg-black !text-black dark:!text-white rounded-lg"
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <NavItem
                    key={link.name}
                    name={link.name}
                    href={link.href}
                    isDropdown={link.isDropdown}
                    dropdownItems={link.dropdownItems}
                    variant="mobile"
                  />
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-700 text-black dark:text-white grid grid-cols-2 justify-center items-center gap-4">
                  {auth?.user ? (
                    <Link
                      href={dashboard()}
                      className="text-center block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={login()}
                        className="text-center block rounded-md text-base font-medium"
                      >
                        {/* <Button text="Login" className="w-full" /> */}
                        <button className="border border-black dark:border-white w-full rounded-full py-1">Login</button>
                      </Link>
                      <Link href={register()}>
                        <Button text="Sign up" className="w-full" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </Container>


      {/* modals */}
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} title="Store">
        <StoreModalContents />
      </Modal>
    </div>
  );
}
