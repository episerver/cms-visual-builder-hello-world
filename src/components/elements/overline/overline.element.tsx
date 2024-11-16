import { CompositionDisplaySetting, OverlineFragmentFragment } from "@generated/graphql";
import { memo, useMemo } from "react";
import { GetOverlineStyles } from "./overline.style";
import { GetDisplaySetting } from "@helpers/style";
import { IconTemplate } from "@components/base/icon";
import { ElementProps } from "../element.types";

export interface OverlineElementProps extends ElementProps<OverlineFragmentFragment> {}

export const OverlineElementComponent: React.FC<OverlineElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const classes = useMemo(() => {
    return GetOverlineStyles(displaySettings);
  }, [displaySettings]);

  const icon = useMemo(() => {
    const _icon = GetDisplaySetting(displaySettings, "icon", "none");
    return _icon === "none" ? null : _icon;
  }, [displaySettings, displayTemplateKey]);

  const { OverlineText } = element;

  return (
    <>
      <span className={classes} data-epi-block-id={elementKey}>
        {icon && (
          <span className="mr-1">
            <IconTemplate icon={icon} />
          </span>
        )}
        {OverlineText}
      </span>
    </>
  );
};
