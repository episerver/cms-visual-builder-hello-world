import { IconTemplate } from "@components/base/icon";
import { TileFragmentFragment } from "@generated/graphql";
import { GetDisplaySetting } from "@helpers/style";
import { useMemo } from "react";
import { ElementProps } from "../element.types";
import { GetTileStyles } from "./tile.style";

interface TileElementProps extends ElementProps<TileFragmentFragment> {}

export const TileElementComponent: React.FC<TileElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const classes = useMemo(() => {
    return GetTileStyles(displaySettings);
  }, [displaySettings]);

  const icon = useMemo(() => {
    const _icon = GetDisplaySetting(displaySettings, "icon", "none");
    return _icon === "none" ? null : _icon;
  }, [displaySettings, displayTemplateKey]);

  const showArrow = useMemo(() => {
    return GetDisplaySetting(displaySettings, "arrow", "false") === "true";
  }, [displaySettings, displayTemplateKey]);

  const { TileHeading, TileDescription, TileLink } = element;

  const link = TileLink?.default;
  const Tag = link ? "a" : "article";

  const tagProps = link ? { href: link } : {};

  return (
    <Tag className={classes} {...tagProps} data-epi-block-id={elementKey}>
      <div className={"tile-content"}>
        <div className={"tile-content__innner"}>
          <header className={"tile-header"}>
            {icon && (
              <div className={"tile-icon"}>
                <IconTemplate icon={icon} />
              </div>
            )}

            <h4 className="tile-heading heading-4">{TileHeading}</h4>
          </header>
          <section className="tile-body">
            <p className="tile-description">{TileDescription}</p>
          </section>
          <footer className="tile-footer"></footer>
        </div>
        {showArrow && link && (
          <div className="tile-arrow">
            <IconTemplate icon="arrowRight" width={40} height={40} />
          </div>
        )}{" "}
      </div>
    </Tag>
  );
};
