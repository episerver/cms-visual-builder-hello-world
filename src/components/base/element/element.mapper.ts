import {
  ButtonElementComponent,
  HeadingElementComponent,
  ImageElementComponent,
  ImpactHighlightElementComponent,
  ParagraphElementComponent,
  ProductNameElementComponent,
  QuoteElementComponent,
  TileElementComponent,
  VideoElementComponent,
} from "@components/elements";
import { CompositionDisplaySetting } from "@graphql/graphql";

export class ElementLocator {
  private static readonly components: Record<
    string,
    React.FC<{ element: any; displayTemplateKey?: string | null; displaySettings?: CompositionDisplaySetting[] }>
  > = {
    ButtonElement: ButtonElementComponent,
    HeadingElement: HeadingElementComponent,
    ImageElement: ImageElementComponent,
    ImpactHighlightElement: ImpactHighlightElementComponent,
    ParagraphElement: ParagraphElementComponent,
    ProductNameElement: ProductNameElementComponent,
    QuoteElement: QuoteElementComponent,
    TileElement: TileElementComponent,
    VideoElement: VideoElementComponent,
  };

  public static get(type?: string | null) {
    if (!type) {
      return;
    }

    return this.components[type];
  }
}
