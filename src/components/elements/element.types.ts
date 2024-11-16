import { CompositionDisplaySetting } from "@generated/graphql";

export interface ElementProps<T> {
  element?: T;
  elementKey?: string | null;
  displayTemplateKey?: string | null;
  displaySettings?: CompositionDisplaySetting[];
}
