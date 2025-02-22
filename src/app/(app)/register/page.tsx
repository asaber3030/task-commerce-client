import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { getUser } from "@/server/users";
import { RegisterForm } from "@/components/auth/register-form";

const LoginPage = async () => {
  const user = await getUser();
  if (user) return redirect(routes.home);

  return (
    <div className='container mx-auto my-10 h-screen flex flex-col items-center justify-center'>
      <RegisterForm />
    </div>
  );
};

export default LoginPage;
