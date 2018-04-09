import React, {PureComponent} from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
} from 'reactstrap';
import pick from 'lodash/pick';

import * as actions from '../redux/actions';
import config from '../../config.json';

class Login extends PureComponent {
  state = {
    ...config.test.account,
    loading: false,
  };
  render = () => (
    <div className="app flex-row align-items-center">
      <Container>
        <Form>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <InputGroup className="mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-user"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      disabled={this.state.loading}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-lock"></i>
                      </span>
                    </div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      disabled={this.state.loading}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="6">
                      <Button
                        color="primary"
                        className="px-4"
                        onClick={this.onSubmit}
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
  onChangeEmail = event => this.setState({email: event.target.value});
  onChangePassword = event => this.setState({password: event.target.value});
  onSubmit = () => this.setState({loading: true}, () => {
    actions.login(pick(this.state, ['email', 'password']));
  });
}

export default Login;
