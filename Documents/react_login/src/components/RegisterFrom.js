import React, { Component } from 'react';

export class LoginFrom extends Component {
  login = (e) => {
    e.preventDefault();
    this.props.toLogin();
  };

  componentDidMount() {
    const inputs = document.querySelectorAll('.input');

    function focusFunc() {
      let parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function blurFunc() {
      let parent = this.parentNode.parentNode;
      if (this.value == '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', focusFunc);
      input.addEventListener('blur', blurFunc);
    });
  }
  render() {
    return (
      <div>
        <div className='input-div one'>
          <div className='i'>
            <i className='fas fa-user'></i>
          </div>
          <div>
            <h5>Username</h5>
            <input type='text' className='input' />
          </div>
        </div>
        <div className='input-div two'>
          <div className='i'>
            <i className='fas fa-lock'></i>
          </div>
          <div>
            <h5>Password</h5>
            <input type='password' className='input' />
          </div>
        </div>
        <div className='input-div two'>
          <div className='i'>
            <i className='fas fa-check'></i>
          </div>
          <div>
            <h5>Confirm Password</h5>
            <input type='password' className='input' />
          </div>
        </div>
        <a href='#'>Forgot Password</a>
        <div className='buttons'>
          <button style={{ backgroundColor: '#d35400' }} className='btn'>
            Register
          </button>
          <button className='btn-alt' onClick={this.login}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginFrom;
