import Container from "../../components/Container/Container";
import HomeLink from "../../components/HomeLink/HomeLink";

function AuthLayout(props) {
  return (
    <div>
      <Container>
        <HomeLink />

        {props.children}

      </Container>
    </div>
  )
}

export default AuthLayout
