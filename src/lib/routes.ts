export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
  projects: "/projects",
  clients: "/clients",
  careers: "/careers",
  faq: "/faq",
  adminDashboard: "/admin/",
  adminLogin: "/admin/login",
  login: "/login",
  register: "/register",
  blogs: "/blogs",
  blog: (id: number) => `/blogs/${id}`,
  viewOrder: (id: number) => `/profile/orders/${id}`,
  profile: (section: string) => `/profile/${section}`,
  completeOrder: "/complete-order"

  // Admin routes
};
