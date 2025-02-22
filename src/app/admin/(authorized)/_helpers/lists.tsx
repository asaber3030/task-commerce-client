import { adminRoutes } from "./routes";

export const shortcuts = [
  {
    title: "Content Management",
    url: adminRoutes.sections.root,
    description: "Manage your page sections"
  },
  {
    title: "Users Management",
    url: adminRoutes.users.root,
    description: "View and manage all products"
  },
  {
    title: "Logs & Statistics",
    url: adminRoutes.stats.root,
    description: "View and manage all products"
  },
  {
    title: "Create Product",
    url: adminRoutes.products.create,
    description: "Create a new product"
  },
  {
    title: "Products",
    url: adminRoutes.products.root,
    description: "View and manage all products"
  },
  {
    title: "Admins",
    url: adminRoutes.admins.root,
    description: "View and manage administrators"
  }
];

export const ICONS_LIST = [
  "phone",
  "briefcase",
  "coffee",
  "code",
  "home",
  "laptop",
  "mobile",
  "palette",
  "pen",
  "rocket",
  "server",
  "sitemap",
  "user",
  "cogs",
  "cog",
  "users",
  "archive",
  "asterisk",
  "barcode",
  "bars",
  "bell",
  "book",
  "bookmark",
  "box",
  "bullhorn",
  "bullseye",
  "certificate",
  "circle",
  "clipboard",
  "comments",
  "compass"
];
