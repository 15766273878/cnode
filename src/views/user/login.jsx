import React from 'react'

import {
  inject,
  observer,
} from 'mobx-react'
import {
  Redirect,
} from 'react-router-dom'
import queryString from 'query-string'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import UserWrapper from './user'
import loginStyles from './styles/login-style'


@inject(stores=>{
  return {
    appState:stores.appState,
    user:stores.appState.user
  }
}) @observer
class UserLogin extends React.Component {

  constructor() {
    super()
    this.state = {
      accesstoken: '',
      helpText: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentWillMount(){

  }

  handleLogin() {
    if(!this.state.accesstoken){
       return this.setState({
           helpText:"必须填写"
       })
    }
    this.setState({
        helpText:""
    })
    this.props.appState.login(this.state.accesstoken)
        .then(()=>{
            this.props.history.replace('/user/info')
        })
        .catch(err=>{
          console.log(err)
        })

  }

  handleInput(event) {
      this.setState({
          accesstoken:event.target.value.trim()
      })
  }

  render() {
    const classes = this.props.classes

    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="请输入Cnode AccessToken"
            placeholder="请输入Cnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            登 录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}


export default withStyles(loginStyles)(UserLogin)
