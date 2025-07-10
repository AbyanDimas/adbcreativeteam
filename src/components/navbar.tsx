"use client";

import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  NewspaperIcon,
  XMarkIcon,
  Bars3Icon,
  BriefcaseIcon,
  HomeIcon,
  PhotoIcon,
  InformationCircleIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_MENU = [
  {
    name: "Beranda",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Artikel",
    icon: NewspaperIcon,
    href: "/artikel",
  },
  {
    name: "Divisi",
    icon: BriefcaseIcon,
    href: "/divisi",
  },
  {
    name: "Galeri",
    icon: PhotoIcon,
    href: "/galeri",
  },
  {
    name: "Kontak",
    icon: InformationCircleIcon,
    href: "/kontak",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}

function NavItem({ children, href, isActive }: NavItemProps) {
  return (
    <li>
      <Link href={href} passHref legacyBehavior>
        <Typography
          as="a"
          variant="paragraph"
          className={`flex items-center gap-2 font-medium px-4 py-2 rounded-full transition-all duration-300 ${
            isActive
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
          }`}
        >
          {children}
        </Typography>
      </Link>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => setOpen(false));
    };
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <MTNavbar
        fullWidth
        blurred={false}
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-gray-100 py-0"
            : "bg-white/90 backdrop-blur-sm border-transparent py-2"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Logo and mobile menu button */}
            <div className="w-full lg:w-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-20 w-20 p-1 overflow-hidden">
                  <Image
                    src="/logos/logo.png"
                    alt="ADB Creative Team Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <Typography
                  as="span"
                  variant="lead"
                  className="text-xl md:text-2xl lg:text-3xl font-black tracking-wide text-gray-900 transition-colors duration-300 hover:text-indigo-700"
                >
                  <span className="text-indigo-600">ADB</span> Creative
                </Typography>
              </Link>

              <IconButton
                variant="text"
                color="gray"
                onClick={handleOpen}
                className="lg:hidden p-2 hover:bg-indigo-50"
              >
                {open ? (
                  <XMarkIcon strokeWidth={2} className="h-6 w-6" />
                ) : (
                  <Bars3Icon strokeWidth={2} className="h-6 w-6" />
                )}
              </IconButton>
            </div>

            {/* Centered Navigation */}
            <div className="hidden lg:flex justify-center flex-1 mx-8">
              <ul className="flex items-center gap-1 bg-indigo-50/80 p-1 rounded-full backdrop-blur-sm">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href} isActive={pathname === href}>
                    <Icon className="h-5 w-5" />
                    <span>{name}</span>
                  </NavItem>
                ))}
              </ul>
            </div>

            {/* Right side - Auth buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" passHref legacyBehavior>
                <Button
                  variant="text"
                  className="flex items-center gap-1 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Masuk</span>
                </Button>
              </Link>
              <Link href="/daftar" passHref legacyBehavior>
                <Button
                  color="indigo"
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Daftar</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 pt-4 pb-2">
              <ul className="flex flex-col gap-2">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href} isActive={pathname === href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mt-6 mb-2 flex flex-col sm:flex-row gap-3">
                <Link href="/login" passHref legacyBehavior>
                  <Button
                    variant="outlined"
                    fullWidth
                    className="flex items-center justify-center gap-1 border-gray-300 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/daftar" passHref legacyBehavior>
                  <Button
                    color="indigo"
                    fullWidth
                    className="flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <UserPlusIcon className="h-5 w-5" />
                    Daftar
                  </Button>
                </Link>
              </div>
            </div>
          </Collapse>
        </div>
      </MTNavbar>
    </div>
  );
}

export default Navbar;