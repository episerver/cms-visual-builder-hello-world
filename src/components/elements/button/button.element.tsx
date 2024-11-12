import { ButtonFragmentFragment, CompositionDisplaySetting } from "@graphql/graphql";
import { memo } from "react";

export interface ButtonElementProps {
  element: ButtonFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const ButtonElementComponent: React.FC<ButtonElementProps> = memo(
  ({ element, displaySettings, displayTemplateKey }) => {
    if (!element) {
      return null;
    }

    const value = element.ButtonElementText ?? "";
    const link = element.ButtonElementLink?.default ?? "";

    // TODO: Implement display settings
    const small = false;
    const buttonType = "button";
    const buttonStyle = "primary";

    const buttonProps = {
      className: `button
                  button--${buttonStyle}
                  ${small ? "button--small" : ""}`,
    };

    return link ? (
      <a {...buttonProps} href={link}>
        <span className="button__content">{value}</span>
      </a>
    ) : (
      <button {...buttonProps} type="button">
        <span className="button__content">{value}</span>
      </button>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.element.ButtonElementText === nextProps.element.ButtonElementText &&
      prevProps.element.ButtonElementLink?.default === nextProps.element.ButtonElementLink?.default
    );
  }
);
