import Link from "next/link";
import { useState } from "react";
import { LogoTemplate } from "../../partials/logo/logo.template";
import { INavigationItem } from "./navigation.interface";

export interface MobileNavigationProps {
  items: INavigationItem[];
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="lg:hidden">
      <div className={`outer-padding relative z-50 ${isMenuOpen ? "bg-vulcan" : ""}`}>
        <div className="container-full">
          <div className="flex justify-between min-h-16 items-center">
            <a href="#skipNav" className="sr-only !absolute left-0 top-0 p-6 focus:not-sr-only">
              Skip to main content
            </a>
            <div className="flex">
              <LogoTemplate />
            </div>
            <div className="flex">
              <button className={`burger-menu`} onClick={handleMenuToggle}>
                <span className="sr-only">Open Menu</span>
                <svg width="12" height="14.37" className="burger-menu-icon">
                  <g className="burger-menu-icon__g-1">
                    <rect width="12" height="2.37" fill="currentColor" ry="1.5" className="burger-menu-icon__rect-1" />
                  </g>
                  <g className="burger-menu-icon__g-2">
                    <rect width="12" height="2.37" y="6" fill="currentColor" ry="1.5" className="burger-menu-icon__rect-2" />
                  </g>
                  <g className="burger-menu-icon__g-3">
                    <rect width="12" height="2.37" y="12" fill="currentColor" ry="1.5" className="burger-menu-icon__rect-3" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`mobile-nav ${isMenuOpen ? "mobile-nav__open" : "mobile-nav__closed"}`}>
          <nav className="flex flex-col">
            <ul className="overflow-auto outer-padding">
              {items.map((item, index) => (
                <li key={item.url ?? index} className="border-b border-santas-gray border-opacity-35">
                  <Link
                    href={item.url ?? "/"}
                    className="block w-full py-5 text-left text-lg font-semibold transition hover:text-light-blue focus:text-light-blue lg:flex lg:min-h-[81px] lg:w-auto lg:items-center lg:px-[10px] lg:py-0 lg:text-base lg:font-medium xl:px-[20px]"
                    onClick={handleMenuToggle}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};
