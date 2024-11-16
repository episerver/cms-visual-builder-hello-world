import { ListItemFragmentFragment } from "@generated/graphql";
import { ElementProps } from "../element.types";

export interface ListItemElementProps extends ElementProps<ListItemFragmentFragment> {}

export const ListItemElementComponent: React.FC<ListItemElementProps> = ({ element, elementKey }) => {
  if (!element) {
    return null;
  }

  const { ListItemText, ListItemLink } = element;
  const link = ListItemLink?.default;

  return (
    <>
      <div className="list-arrow-item" data-epi-block-id={elementKey}>
        {link ? (
          <a href={link} className="list-item__link">
            {ListItemText}
          </a>
        ) : (
          <span>{ListItemText}</span>
        )}
      </div>
    </>
  );
};
