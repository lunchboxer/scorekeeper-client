import React, { Component } from 'react'
import { Button, TextField } from 'material-ui'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import Header from '../components/Header'

const styles = theme => ({
  textField: {
    width: 300,
    margin: theme.spacing.unit
  },
  formControl: {
    width: 300,
    margin: theme.spacing.unit,
    padding: 0
  },
  passwordField: {
    width: 300,
    margin: 0
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    password: '',
    email: '',
    name: '',
    showPassword: false
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { classes } = this.props
    return (
      <div className="Login">
        <Header title={this.state.login ? 'Login' : 'Sign Up'} />
        <Card className={classes.card}>
          <CardContent>
            {!this.state.login && (
              <TextField
                className={classes.textField}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange('name')}
              />
            )}
            <TextField
              className={classes.textField}
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                className={classes.passwordField}
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button color="contrast" onClick={() => this._confirm()}>
              {this.state.login ? 'Log in' : 'Create account'}
            </Button>
            <Button
              onClick={() => this.setState({ login: !this.state.login })}
              color="contrast"
            >
              {this.state.login
                ? 'need to create an account?'
                : 'I have an account'}
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
  _confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.authenticateUserMutation({
        variables: {
          email,
          password
        }
      })
      const { id, token } = result.data.authenticateUser
      this._saveUserData(id, token)
    } else {
      const result = await this.props.signupUserMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const { id, token } = result.data.signupUser
      this._saveUserData(id, token)
    }
    this.props.history.push('/')
  }
  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
      id
    }
  }
`
Login = withStyles(styles)(Login)
export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)
