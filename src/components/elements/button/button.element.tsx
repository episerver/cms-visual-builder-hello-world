import { IconTemplate } from "@components/base/icon";
import { ButtonFragmentFragment, CompositionDisplaySetting } from "@generated/graphql";
import { GetDisplaySetting } from "@helpers/style";
import { useCallback, useMemo } from "react";
import { GetButtonStyles } from "./button.style";
import { ElementProps } from "../element.types";

export interface ButtonElementProps extends ElementProps<ButtonFragmentFragment> {}

export const ButtonElementComponent: React.FC<ButtonElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const classes = useMemo(() => {
    return GetButtonStyles(displaySettings);
  }, [displaySettings]);

  const icon = useMemo(() => {
    const location = GetDisplaySetting(displaySettings, "iconPosition", "left");
    const iconName = GetDisplaySetting(displaySettings, "icon", "none");

    return { location, icon: iconName === "none" ? null : iconName };
  }, [displaySettings, displayTemplateKey]);

  const { ButtonElementText, ButtonElementLink } = element;

  const ButtonContent = useCallback(() => {
    return (
      <span className="button__content">
        {icon.location === "left" && icon.icon && <IconTemplate icon={icon.icon} />}
        <span>{ButtonElementText}</span>
        {icon.location === "right" && icon.icon && <IconTemplate icon={icon.icon} />}
      </span>
    );
  }, [icon, ButtonElementText]);

  return ButtonElementLink?.default ? (
    <a className={classes} href={ButtonElementLink?.default} data-epi-block-id={elementKey}>
      <ButtonContent />
    </a>
  ) : (
    <button className={classes} type="button" data-epi-block-id={elementKey}>
      <ButtonContent />
    </button>
  );
};
