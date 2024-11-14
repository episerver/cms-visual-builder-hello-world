import { ColumnNodeFragment, CompositionDisplaySetting, ElementNodeFragment } from "@graphql/graphql";
import { useMemo } from "react";
import { ElementTemplate } from "../element/element.template";
import { GetColumnStyles } from "./column.style";

export interface ColumnTemplateProps {
  column: ColumnNodeFragment;
}


export const ColumnTemplate: React.FC<ColumnTemplateProps> = ({ column }) => {
  if (!column) {
    return null;
  }

  const classes = useMemo(() => {
    return GetColumnStyles(column.displaySettings as CompositionDisplaySetting[]);
  }, [column]);

  return (
    <>
      <div className={classes}>
        {column.elements?.map((element) => element && <ElementTemplate element={element as ElementNodeFragment} key={element.key} />)}
      </div>
    </>
  );
};
