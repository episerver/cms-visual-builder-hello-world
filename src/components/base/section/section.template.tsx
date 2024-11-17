import { CompositionDisplaySetting, RowNodeFragment, SectionNodeFragment } from "@generated/graphql";
import { useMemo } from "react";
import { RowTemplate } from "../row/row.template";
import { GetSectionStyles } from "./section.style";

export interface SectionTemplateProps {
  section: SectionNodeFragment;
}

export const SectionTemplate: React.FC<SectionTemplateProps> = ({ section }) => {
  if (!section) {
    return null;
  }

  const classes = useMemo(() => {
    return GetSectionStyles(section.displaySettings as CompositionDisplaySetting[]);
  }, [section]);

  return (
    <section className={classes.wrapperClasses} data-epi-block-id={section.key}>
      <div className="opti-container__background"></div>
      <div className={classes.contentClasses}>
        {section.rows?.map((row) => {
          return row && <RowTemplate row={row as RowNodeFragment} key={row.key} />;
        })}
      </div>
    </section>
  );
};
