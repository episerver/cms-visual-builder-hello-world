import { CompositionDisplaySetting, ProductNameFragmentFragment } from "@graphql/graphql";
import { memo } from "react";

export interface ProductNameElementProps {
  element: ProductNameFragmentFragment;
  displaySettings?: CompositionDisplaySetting[];
  displayTemplateKey?: string | null;
}

export const ProductNameElementComponent: React.FC<ProductNameElementProps> = memo(
  ({ element }) => {
    if (!element) {
      return null;
    }

    const { ProductName, ProductNameIcon } = element;

    return (
      <>
        <div>{ProductNameIcon?.url?.default}</div>
        <h1 className="text-xl">{ProductName}</h1>
      </>
    );
  },
  (prevProps, nextProps) => {
    const prev = prevProps.element;
    const next = nextProps.element;
    return prev.ProductName === next.ProductName && prev.ProductNameIcon?.url?.default === next.ProductNameIcon?.url?.default;
  }
);
