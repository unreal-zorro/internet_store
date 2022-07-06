import AuthLayout from "../../AuthLayout/AuthLayout";
import Register from "../../../components/Register/Register";

function RegisterPage() {
  return (
    <AuthLayout>
      <Register
        login=''
        password=''
        onSubmit=''
      />
    </AuthLayout>
  )
}

export default RegisterPage
