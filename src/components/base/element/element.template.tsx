import { CompositionDisplaySetting, ElementNodeFragment } from "@generated/graphql";
import { ElementLocator } from "./element.mapper";

export interface ElementTemplateProps {
  element?: ElementNodeFragment;
}

export const ElementTemplate: React.FC<ElementTemplateProps> = ({ element }) => {
  if (!element) {
    return null;
  }

  const ElementComponent = ElementLocator.get(element.type);

  if (!ElementComponent) {
    return null;
  }

  return (
    <ElementComponent
      element={element.component}
      elementKey={element.key}
      displayTemplateKey={element.displayTemplateKey}
      displaySettings={element.displaySettings as CompositionDisplaySetting[]}
    />
  );
};
