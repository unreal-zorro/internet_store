import AuthLayout from "../../AuthLayout/AuthLayout";
import {AuthOrRegister} from "../../../components/AuthOrRegister/AuthOrRegister";

function RegisterPage() {
  return (
    <AuthLayout>
      <AuthOrRegister
        type="register"
      />
    </AuthLayout>
  )
}

export default RegisterPage
