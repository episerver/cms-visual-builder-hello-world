import { ColumnNodeFragment, ElementNodeFragment } from "@graphql/graphql";
import { ElementTemplate } from "../element/element.template";

export interface ColumnTemplateProps {
  column: ColumnNodeFragment;
}

export const ColumnTemplate: React.FC<ColumnTemplateProps> = ({ column }) => {
  if (!column) {
    return null;
  }

  return (
    <>
      <div className="border border-dashed border-green col">
        {column.elements?.map((element) => element && <ElementTemplate element={element as ElementNodeFragment} key={element.key} />)}
      </div>
    </>
  );
};
