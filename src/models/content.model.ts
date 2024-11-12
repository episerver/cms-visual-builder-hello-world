export interface PropertySaved {
  name: string;
  successful: boolean;
}

export interface ContentSavedEventArgs {
  parentId?: string;
  previewUrl: string;
  isIndexed: boolean;
  sectionId?: string;
  contentLink: string;
  previewToken: string;
  properties: PropertySaved[];
}
