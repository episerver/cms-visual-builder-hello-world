import { RowNodeFragment, SectionNodeFragment } from "@graphql/graphql";
import { RowTemplate } from "../row/row.template";

export interface SectionTemplateProps {
  section: SectionNodeFragment;
}

export const SectionTemplate: React.FC<SectionTemplateProps> = ({ section }) => {
  if (!section) {
    return null;
  }

  return (
    <>
      <div className="border border-dashed border-dark-blue-60-tint container-fluid">
        {section.rows?.map((row) => row && <RowTemplate row={row as RowNodeFragment} key={row.key} />)}
      </div>
    </>
  );
};
