import Link from "next/link";
import { LogoTemplate } from "../../partials/logo/logo.template";
import { INavigationItem } from "./navigation.interface";

export interface DesktopNavigationProps {
  items: INavigationItem[];
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ items }) => {
  return (
    <nav className="hidden lg:block absolute w-full top-0">
      <div className={`outer-padding relative z-10 hidden lg:block`}>
        <div className="container">
          <div className="flex justify-between min-h-12 items-center">
            <div className="grid grid-flow-col gap-8 items-center min-h-20">
              <LogoTemplate />
              <ul className="flex w-full items-center justify-end">
                {items.map((item, index) => (
                  <li key={item.url ?? index}>
                    <Link
                      href={item.url ?? ""}
                      className="reset-link block w-full py-5 text-left text-lg font-semibold transition hover:text-light-blue focus:text-light-blue lg:flex lg:min-h-[81px] lg:w-auto lg:items-center lg:px-[10px] lg:py-0 lg:text-base lg:font-medium xl:px-[20px] "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </nav>
  );
};
