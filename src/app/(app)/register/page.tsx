import { RegisterForm } from "@/app/_components/user/auth/register-form"

import { getUser } from "@/actions/user"
import { routes } from "@/lib/routes"
import { redirect } from "next/navigation"
import { getGovernorates } from "@/actions/governorates"

const RegisterPage = async () => {
  const user = await getUser()
  const governorates = await getGovernorates()

  if (user) return redirect(routes.home())

  return (
    <div className="container mx-auto my-10">
      <RegisterForm governorates={governorates} />
    </div>
  )
}

export default RegisterPage
