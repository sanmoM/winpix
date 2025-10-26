import StoreModalContents from "@/components/root/store-modal-contents";
import BorderButton from "@/components/shared/buttons/border-button";
import Modal from "@/components/shared/modal";
import { cn } from "@/lib/utils";
import { dashboard, login, register } from "@/routes";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Button from "../../shared/buttons/button";
import Container from "../../shared/container";
import Logo from "../../shared/logo";
import CoinAndNotification from "./components/coin-and-notification";
import NavItem from "./components/nav-item";
import useLocales from "@/hooks/useLocales";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [top, setTop] = useState(0);
  const { auth } = usePage<SharedData>().props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { url } = usePage();
  const { t } = useLocales()

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
      name: t("root.navbar.navLinks.discover"),
      href: "/discover",
    },
    {
      name: t("root.navbar.navLinks.quests.title"),
      isDropdown: true,
      dropdownItems: [
        { name: t("root.navbar.navLinks.quests.submenu.activeQuests"), href: "/quests/active-quests" },
        { name: t("root.navbar.navLinks.quests.submenu.questSeries"), href: "/quests/quest-series" },
        { name: t("root.navbar.navLinks.quests.submenu.enteredQuests"), href: "/quests/entered-quests" },
        { name: t("root.navbar.navLinks.quests.submenu.endedQuests"), href: "/quests/ended-quests" },
      ],
    },
    { name: t("root.navbar.navLinks.store"), href: "/store" },
    { name: t("root.navbar.navLinks.redeem"), href: "/redeem" },
  ];

  const hasBackground = top > 0 || (url !== "/" && url !== "/quests/active");
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-[20] w-full py-1.5 md:py-3",
        !hasBackground ? "bg-transparent text-white" : "bg-bg-primary dark:bg-bg-primary", (url !== "/" && url !== "/quests/active") && "sticky top-0 bg-bg-primary dark:bg-bg-primary text-black dark:text-white"
      )}
    >
      <Container>
        <nav className="w-full z-50 relative">
          <div className="flex items-center justify-between h-16">

            {/* === Left Section === */}
            <div className="flex items-center space-x-10">
              <Logo
                hasBackground={hasBackground}
              />

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <div className="flex items-baseline space-x-6">
                  {navLinks.map((link) => (
                    <NavItem
                      hasBackground={hasBackground}
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
            <div className="hidden lg:flex items-center space-x-2 lg:space-x-4 relative">
              {auth?.user ? (
                <>
                  <CoinAndNotification hasBackground={hasBackground} />
                  <Link href={dashboard()} className={cn("font-medium", hasBackground ? "hover:text-primary-color" : "hover:opacity-70")}>
                    {t("root.navbar.navLinks.dashboard")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={login()}
                    className="text-center block rounded-md text-base font-medium "
                  >
                    {/* <Button text="Login" className="w-full" /> */}
                    {/* <button className={cn("border !border-white w-full rounded-full py-1 px-8 cursor-pointer", hasBackground && "!border-primary-color")}>Login</button> */}
                    <BorderButton className={hasBackground ? "!border-primary-color" : "!border-white"} text="Login" />
                  </Link>
                  <Link href={register()}>
                    <Button text="Sign up" className="px-8" />
                  </Link>
                </>
              )}
            </div>

            {/* mobile menu */}
            <div className="flex gap-2 lg:hidden">
              <div className="flex gap-2 items-center">
                <CoinAndNotification hasBackground={hasBackground} />
              </div>

              {/* === Mobile Menu Button === */}
              <div className="mr-2 flex">
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
          </div>

          {/* === Mobile Menu Content === */}

          <div
            ref={menuRef}
            className={cn("lg:hidden !bg-bg-primary dark:!bg-bg-primary !text-black dark:!text-white rounded-lg duration-300 transition ease-in-out absolute w-full md:w-1/2 right-0 top-[72px] md:top-[78px]", isMenuOpen ? "translate-x-0" : "translate-x-[120%]")}
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
              <div className=" border-gray-700 text-black dark:text-white grid grid-cols-2 justify-center items-center gap-4">
                {auth?.user ? (
                  <>
                    <Link
                      href={dashboard()}
                      className="px-3 block rounded-md text-base font-medium"
                    >
                      {t("root.navbar.navLinks.dashboard")}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={login()}
                      className="text-center block rounded-md text-base font-medium"
                    >
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
        </nav>
      </Container>


      {/* modals */}
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} title="Store">
        <StoreModalContents />
      </Modal>
    </div>
  );
}
