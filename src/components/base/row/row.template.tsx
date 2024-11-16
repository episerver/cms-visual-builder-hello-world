import { ColumnNodeFragment, CompositionDisplaySetting, RowNodeFragment } from "@generated/graphql";
import { useMemo } from "react";
import { ColumnTemplate } from "../column/column.template";
import { GetRowStyles } from "./row.style";

export interface RowTemplateProps {
  row: RowNodeFragment;
}

export const RowTemplate: React.FC<RowTemplateProps> = ({ row }) => {
  if (!row) {
    return null;
  }

  const classes = useMemo(() => {
    return GetRowStyles(row.displaySettings as CompositionDisplaySetting[]);
  }, [row]);

  return (
    <div className={classes} data-epi-block-id={row.key}>
      {row.columns?.map((column, ind) => column && <ColumnTemplate column={column as ColumnNodeFragment} key={column.key} />)}
    </div>
  );
};
