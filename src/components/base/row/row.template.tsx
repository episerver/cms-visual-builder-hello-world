import { ColumnNodeFragment, RowNodeFragment } from "@graphql/graphql";
import { ColumnTemplate } from "../column/column.template";

export interface RowTemplateProps {
  row: RowNodeFragment;
}

export const RowTemplate: React.FC<RowTemplateProps> = ({ row }) => {
  if (!row) {
    return null;
  }

  return (
    <>
      <div className="row border border-dashed border-optimizely-blue g-1">
        {row.columns?.map((column) => column && <ColumnTemplate column={column as ColumnNodeFragment} key={column.key} />)}
      </div>
    </>
  );
};
