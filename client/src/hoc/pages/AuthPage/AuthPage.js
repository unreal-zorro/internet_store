import AuthLayout from "../../AuthLayout/AuthLayout";
import AuthOrRegister from "../../../components/AuthOrRegister/AuthOrRegister";

function AuthPage() {
  return (
    <AuthLayout>
      <AuthOrRegister
        type="auth"
      />
    </AuthLayout>
  )
}

export default AuthPage
