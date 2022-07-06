import Auth from "../../../components/Auth/Auth";
import AuthLayout from "../../AuthLayout/AuthLayout";

function AuthPage() {
  return (
    <AuthLayout>
      <Auth
        login=''
        password=''
        onSubmit=''
      />
    </AuthLayout>
  )
}

export default AuthPage
