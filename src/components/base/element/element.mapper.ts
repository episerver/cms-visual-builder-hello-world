import {
  ButtonElementComponent,
  HeadingElementComponent,
  ImageElementComponent,
  ListItemElementComponent,
  OverlineElementComponent,
  ParagraphElementComponent,
  QuoteElementComponent,
  StatsElementComponent,
  TileElementComponent,
  VideoElementComponent,
} from "@components/elements";
import { ElementProps } from "@components/elements/element.types";

export class ElementLocator {
  private static readonly components: Record<string, React.FC<ElementProps<any>>> = {
    ButtonElement: ButtonElementComponent,
    HeadingElement: HeadingElementComponent,
    ImageElement: ImageElementComponent,
    StatsElement: StatsElementComponent,
    ParagraphElement: ParagraphElementComponent,
    OverlineElement: OverlineElementComponent,
    QuoteElement: QuoteElementComponent,
    TileElement: TileElementComponent,
    VideoElement: VideoElementComponent,
    ListItemElement: ListItemElementComponent,
  };

  public static get(type?: string | null) {
    if (!type) {
      return;
    }

    return this.components[type];
  }
}
