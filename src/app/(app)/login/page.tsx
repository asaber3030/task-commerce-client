import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getUser } from "@/server/users";

const LoginPage = async () => {
  const user = await getUser();
  if (user) return redirect(routes.home);

  return (
    <div className='container mx-auto my-10 h-screen flex flex-col items-center justify-center'>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
