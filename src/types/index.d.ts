export type Language = "en" | "ar";

export type ProjectType = "website" | "mobile-app";

export interface Technology {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  url?: string;
  type: ProjectType;
  title: string;
  arTitle?: string;
  subtitle: string;
  arSubtitle?: string;
  description: string;
  arDescription?: string;
  technologies: Technology[];
  imageUrl: string;
}

export interface MobileProject extends Project {
  images: string[];
  beside: boolean;
}

export type APIResponse<T, D> = {
  message: string;
  status: number;
  data?: T;
  error?: D;
};

export type LoginData = {
  data: z.infer<typeof GlobalLoginSchema>;
  rememberMe?: boolean;
};

export type CartItem = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
