export const adminRoutes = {
  projects: {
    root: "/admin/projects",
    create: "/admin/projects/create",
    update: (id: number) => `/admin/projects/${id}/update`,
    view: (id: number) => `/admin/projects/${id}`
  },
  admins: {
    root: "/admin/admins",
    create: "/admin/admins/create",
    update: (id: number) => `/admin/admins/${id}/update`,
    view: (id: number) => `/admin/admins/${id}`
  },
  stats: {
    root: "/admin/statistics"
  },
  users: {
    root: "/admin/users",
    create: "/admin/users/create",
    update: (id: number) => `/admin/users/${id}/update`,
    view: (id: number) => `/admin/users/${id}`
  },
  performanceLogs: {
    root: "/admin/performance-logs",
    create: "/admin/performance-logs/create",
    update: (id: number) => `/admin/performance-logs/${id}/update`,
    view: (id: number) => `/admin/performance-logs/${id}`
  },
  tasks: {
    root: "/admin/tasks",
    create: "/admin/tasks/create",
    update: (id: number) => `/admin/tasks/${id}/update`,
    view: (id: number) => `/admin/tasks/${id}`
  },
  employees: {
    root: "/admin/employees",
    create: "/admin/employees/create",
    update: (id: number) => `/admin/employees/${id}/update`,
    view: (id: number) => `/admin/employees/${id}`
  },

  suggestions: {
    root: "/admin/suggestions",
    create: "/admin/suggestions/create",
    update: (id: number) => `/admin/suggestions/${id}/update`,
    view: (id: number) => `/admin/suggestions/${id}`
  },

  products: {
    root: "/admin/products",
    create: "/admin/products/create",
    update: (id: number) => `/admin/products/${id}/update`,
    view: (id: number) => `/admin/products/${id}`
  },

  reviews: {
    root: "/admin/reviews",
    create: "/admin/reviews/create",
    update: (id: number) => `/admin/reviews/${id}/update`,
    view: (id: number) => `/admin/reviews/${id}`
  },

  partners: {
    root: "/admin/partners",
    create: "/admin/partners/create",
    update: (id: number) => `/admin/partners/${id}/update`,
    view: (id: number) => `/admin/partners/${id}`
  },

  blogs: {
    root: "/admin/blogs",
    create: "/admin/blogs/create",
    update: (id: number) => `/admin/blogs/${id}/update`,
    view: (id: number) => `/admin/blogs/${id}`
  },

  sections: {
    root: "/admin/sections",
    pageSections: (id: number) => `/admin/sections/${id}`,
    viewSection: (id: number, sectionId: number) => `/admin/sections/${id}/${sectionId}`
  },

  careers: {
    root: "/admin/careers",
    careerPositions: (id: number) => `/admin/careers/${id}`,
    viewPosition: (id: number, positionId: number) => `/admin/careers/${id}/${positionId}`,
    viewPositionApplicants: (id: number, positionId: number) => `/admin/careers/${id}/${positionId}`
  },

  settings: {
    root: "/admin/settings",
    select: (path: string) => `/admin/settings/${path}`
  }
};
