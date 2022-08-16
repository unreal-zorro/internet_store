import Container from "../../components/Container/Container";
import HomeLink from "../../components/HomeLink/HomeLink";
import Message from "../../components/Message/Message";

function AuthLayout(props) {
  return (
    <div>
      <Container>
        <HomeLink />

        {props.children}

      </Container>
      <Message />
    </div>
  )
}

export default AuthLayout
