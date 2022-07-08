import Auth from "../../../components/Auth/Auth";
import AuthLayout from "../../AuthLayout/AuthLayout";

function AuthPage() {
  function inputLoginChangeHandler () {

  }

  function inputPasswordChangeHandler () {

  }

  function onSubmitClickHandler () {

  }

  return (
    <AuthLayout>
      <Auth
        login=''
        loginError=''
        password=''
        passwordError=''
        passwordLength='6'
        onChangeLogin={inputLoginChangeHandler}
        onChangePassword={inputPasswordChangeHandler}
        onSubmit={onSubmitClickHandler}
      />
    </AuthLayout>
  )
}

export default AuthPage
