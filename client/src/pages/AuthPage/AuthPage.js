import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import {AuthOrRegister} from "../../components/AuthOrRegister/AuthOrRegister";

function AuthPage() {
  return (
    <AuthLayout
      type="auth"
    >
      <AuthOrRegister />
    </AuthLayout>
  )
}

export default AuthPage
