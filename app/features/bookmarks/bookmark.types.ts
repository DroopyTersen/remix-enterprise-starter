export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
}

export interface BookmarkFormValues {
  id: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
}
