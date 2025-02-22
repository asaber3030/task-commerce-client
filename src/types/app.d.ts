import {
  Project,
  Page,
  ProjectImage,
  ProjectTranslation,
  SectionTranslation,
  ProjectType,
  Section,
  Order,
  OrderItem,
  Product,
  User
} from "@prisma/client";

export type FullOrder = Order & {
  user: User;
  items: (OrderItem & {
    product: Product;
  })[];
};

export type FullProject = Project & {
  translations: ProjectTranslation[];
  images: ProjectImage[];
};

export type FilterParams = {
  search?: string;
  type?: string;
  status?: string;
};

export type FullPage = Page & {
  _count: {
    sections: number;
  };
};

export type SectionListItem = {
  title: string;
  description: string;
  icon: string;
  additionalTitle?: string;
};

export type SectionList = SectionListItem[];

export type DefaultSectionProps = {
  section: Section & {
    translations: SectionTranslation[];
  };
};
export type OGType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

type ProjectX = {
  title: string;
  description: string;
  subTitle: string;
  technologies: string;
  image: string;
  url: string;
  type: ProjectType;
};
