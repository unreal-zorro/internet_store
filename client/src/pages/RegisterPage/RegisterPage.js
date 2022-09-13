import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import {AuthOrRegister} from "../../components/AuthOrRegister/AuthOrRegister";

function RegisterPage() {
  return (
    <AuthLayout
      type="register"
    >
      <AuthOrRegister />
    </AuthLayout>
  )
}

export default RegisterPage
