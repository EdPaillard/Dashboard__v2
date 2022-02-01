import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Login() {
  return (
      <div>
        <Container>
            <Form action="http://localhost:8082/login" method="post">
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label htmlFor="email">Votre email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="jacques@gmail.com" />
                    </Form.Group>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label htmlFor="password">Votre mot de passe</Form.Label>
                        <Form.Control name="password" type="password" />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">Se connecter</Button>
            </Form>
        </Container>
      </div>
  )
}

export default Login;
