import React, { Component } from 'react';
import LoginForm from './LoginFrom';
import RegisterForm from './RegisterFrom';
import login from '../img/login.svg';
import register from '../img/register.svg';
import avatar_log from '../img/avatar_log.svg';
import avatar_reg from '../img/avatar_reg.svg';
import wave_log from '../img/wave_log.png';
import wave_reg from '../img/wave_reg.png';

export class UserForm extends Component {
  state = {
    isLogin: true,
  };

  toRegister = () => {
    const { isLogin } = this.state;
    this.setState({
      isLogin: false,
    });
  };

  toLogin = () => {
    const { isLogin } = this.state;
    this.setState({
      isLogin: true,
    });
  };
  render() {
    const { isLogin } = this.state;

    return (
      <div className='page'>
        <img src={isLogin ? wave_log : wave_reg} alt='wave' className='wave' />
        <div className='container'>
          <div className='img'>
            <img src={isLogin ? login : register} alt='main image' />
          </div>

          <div className='form-container'>
            <form>
              <img
                className='avatar'
                src={isLogin ? avatar_log : avatar_reg}
                alt='avatar'
              />
              <h2>Welcome</h2>
              {isLogin ? (
                <LoginForm toRegister={this.toRegister} />
              ) : (
                <RegisterForm toLogin={this.toLogin} />
              )}
            </form>
          </div>
        </div>
      </div>
    );
    //  isLogin ? (
    //   <LoginForm toRegister={this.toRegister} />
    // ) : (
    //   <RegisterForm toLogin={this.toLogin} />
    // );
  }
}

export default UserForm;
