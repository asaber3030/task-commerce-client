import { CreateUserModal } from "../../_components/users/create-modal";
import { PageTitle } from "../../_components/navbar/page-title";
import { getBlogs } from "@/server/blogs";
import { BlogsTable } from "../../_components/blogs/table";
import { CreateBlogModal } from "../../_components/blogs/create-modal";

export default async function AdminsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <PageTitle title='News'>
        <CreateBlogModal />
      </PageTitle>
      <BlogsTable blogs={blogs} />
    </div>
  );
}
