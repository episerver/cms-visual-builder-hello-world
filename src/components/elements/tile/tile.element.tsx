import { TileFragmentFragment } from "@graphql/graphql";
import { ElementProps } from "../element.types";

interface TileElementProps extends ElementProps<TileFragmentFragment> {}

export const TileElementComponent: React.FC<TileElementProps> = ({ element, elementKey, displaySettings, displayTemplateKey }) => {
  if (!element) {
    return null;
  }

  const { TileHeading, TileDescription, TileLink } = element;

  return <></>;
};
