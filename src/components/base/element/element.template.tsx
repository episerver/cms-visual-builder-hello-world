import { CompositionDisplaySetting, ElementNodeFragment } from "@graphql/graphql";
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
      element={element.element}
      elementKey={element.key}
      displayTemplateKey={element.displayTemplateKey}
      displaySettings={element.displaySettings as CompositionDisplaySetting[]}
    />
  );
};
