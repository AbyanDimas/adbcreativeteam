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
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    name: "Galeri Karya",
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
          color="gray"
          className={`flex items-center gap-2 font-medium ${
            isActive
              ? "bg-gray-900 text-white rounded-xl px-3 py-2"
              : "text-gray-700 hover:text-gray-900"
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
  const pathname = usePathname();

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className="px-10 sticky top-4 z-50">
      <div className="mx-auto container">
        <MTNavbar
          blurred
          color="white"
          className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6"
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Typography color="blue-gray" className="text-lg font-bold cursor-pointer">
                ADB Creative Team
              </Typography>
            </Link>
            <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href} isActive={pathname === href}>
                  <Icon className="h-5 w-5" />
                  {name}
                </NavItem>
              ))}
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              <Link href="/login" passHref legacyBehavior>
                <Button variant="text" as="a">
                  Masuk
                </Button>
              </Link>
              <Link href="/daftar" passHref legacyBehavior>
                <Button color="gray" as="a">
                  Daftar
                </Button>
              </Link>
            </div>
            <IconButton
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-2">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href} isActive={pathname === href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mt-6 mb-4 flex items-center gap-4">
                <Link href="/login" passHref legacyBehavior>
                  <Button variant="text" as="a">
                    Masuk
                  </Button>
                </Link>
                <Link href="/daftar" passHref legacyBehavior>
                  <Button color="gray" as="a">
                    Daftar
                  </Button>
                </Link>
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;