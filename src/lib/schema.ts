import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" })
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" })
});

export const AdminSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().min(1, { message: "Email is required" }).optional()
  })
};

export const SuggestionSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    message: z.string().min(1, { message: "Message is required" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().min(1, { message: "Email is required" }).optional(),
    message: z.string().min(1, { message: "Message is required" }).optional()
  })
};

export const EmployeeSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Email is required" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().min(1, { message: "Email is required" }).optional()
  })
};

export const UserSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    email: z.string().email().min(1, { message: "Email is required" }).optional()
  })
};

export const BlogSchema = {
  Create: z.object({
    title: z.string().min(1, { message: "title is required" }),
    description: z.string().min(1, { message: "description is required" }),
    content: z.string().min(1, { message: "content is required" }),
    tags: z.string().min(1, { message: "tags is required" }),
    keywords: z.string().min(1, { message: "keywords is required" })
  }),
  Update: z.object({
    title: z.string().min(1, { message: "title is required" }).optional(),
    description: z.string().min(1, { message: "description is required" }).optional(),
    content: z.string().min(1, { message: "content is required" }).optional(),
    tags: z.string().min(1, { message: "tags is required" }).optional(),
    keywords: z.string().min(1, { message: "keywords is required" }).optional()
  })
};

export const ProductSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(1, { message: "Price is required" }),
    categoryId: z.number()
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    price: z.number().min(1, { message: "Price is required" }).optional(),
    categoryId: z.number().optional()
  })
};

export const PerformanceLogSchema = {
  Create: z.object({
    activity: z.string().min(1, { message: "Activity is required" }),
    duration: z.number().min(1, { message: "Duration is required" }),
    rating: z.number().min(1, { message: "Rating is required" }),
    responseTime: z.number().min(1, { message: "Response Time is required" })
  }),
  Update: z.object({
    activity: z.string().min(1, { message: "Activity is required" }).optional(),
    duration: z.number().min(1, { message: "Duration is required" }).optional(),
    rating: z.number().min(1, { message: "Rating is required" }).optional(),
    responseTime: z.number().min(1, { message: "Response Time is required" }).optional()
  })
};

export const TaskSchema = {
  Create: z.object({
    title: z.string().min(1, { message: "Activity is required" }),
    description: z.string().min(1, { message: "Activity is required" }),
    status: z.string().min(1, { message: "Activity is required" })
  }),
  Update: z.object({
    title: z.string().min(1, { message: "Activity is required" }).optional(),
    description: z.string().min(1, { message: "Activity is required" }).optional(),
    status: z.string().min(1, { message: "Activity is required" }).optional()
  })
};

export const ReviewSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    rating: z
      .number()
      .min(1, { message: "Rating is required" })
      .max(5, { message: "Max Rating is 5" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    rating: z
      .number()
      .min(1, { message: "Rating is required" })
      .max(5, { message: "Max Rating is 5" })
      .optional()
  })
};

export const PartnerSchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional()
  })
};

export const CategorySchema = {
  Create: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" })
  }),
  Update: z.object({
    name: z.string().min(1, { message: "Name is required" }).optional(),
    description: z.string().min(1, { message: "Description is required" }).optional()
  })
};

export const SectionTranslationSchema = z.object({
  en: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" })
  }),
  ar: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" })
  })
});

export const SettingsSchema = {
  app: z.object({
    name: z.string().min(1, { message: "Application name is required" }),
    defaultLocale: z.string().min(1, { message: "Application name is required" })
  }),

  social: z.object({
    facebook: z.string().url().min(1, { message: "facebook is required" }),
    linkedin: z.string().url().min(1, { message: "linkedin is required" }),
    instagram: z.string().url().min(1, { message: "instagram is required" }),
    whatsapp: z.string().url().min(1, { message: "whatsapp is required" })
  }),

  contact: z.object({
    mobile: z.string().min(1, { message: "Phone Number is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    email: z.string().email({ message: "E-mail is required" })
  }),

  footer: z.object({
    en: z.object({
      address: z.string().min(1, { message: "Address is required" }),
      description: z.string().min(1, { message: "Description is required" })
    }),
    ar: z.object({
      address: z.string().min(1, { message: "Address is required" }),
      description: z.string().min(1, { message: "Description is required" })
    }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.string().email().min(1, { message: "Email is required" })
  })
};
