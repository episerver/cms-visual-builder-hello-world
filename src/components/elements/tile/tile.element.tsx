import { CompositionDisplaySetting, TileFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

interface TileElementProps {
  element?: TileFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const TileElementComponent: React.FC<TileElementProps> = memo(
  ({ element }) => {
    if (!element) {
      return null;
    }

    const {} = element;

    return <></>;
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;

    return (
      prev?.TileDescription === next?.TileDescription &&
      prev?.TileHighlight === next?.TileHighlight &&
      prev?.TileLogo?.url?.default === next?.TileLogo?.url?.default &&
      prev?.TileLink === next?.TileLink
    );
  }
);
