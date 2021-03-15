import React, { useState } from 'react';
import { connect } from 'react-redux';
import userTypes from '../reducer';
import { errorHandle, validateEmail } from '../utils';

const Modal = (props) => {
  const { postUser, close } = props;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [isErrors, setIsErrors] = useState(false);

  const addUser = async (first_name, last_name, email) => {
    if (!first_name.trim() || !last_name.trim() || !validateEmail(email)) {
      errorHandle(setIsErrors, 'Check the fields and try again.');
    }
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
      })
    });
    if (response.status === 201) {
      const data = await response.json();
      const avatar = await fetch('https://picsum.photos/128');
      postUser(first_name, last_name, email, avatar.url, data.id);
      close(false);
    } else {
      errorHandle(setIsErrors, 'Sorry, API error.');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='modal'>
      <div className='input'>
        <label>Name</label>
        <input placeholder='Input your name' onChange={(e) => setName(e.target.value)} value={name}/>
      </div>
      <div className='input'>
        <label>Surname</label>
        <input placeholder='Input your surname' onChange={(e) => setSurname(e.target.value)} value={surname}/>
      </div>
      <div className='input'>
        <label>Email</label>
        <input placeholder='Input valid email' onChange={(e) => setEmail(e.target.value)} value={email}/>
      </div>
      <span style={{visibility: isErrors ? 'visible' : 'hidden'}}>{isErrors}</span>
      <div className='actions'>
        <button disabled={isErrors} type='submit' onClick={() => addUser(name, surname, email)}>Add User</button>
        <button type='button' onClick={() => close(false)}>Close</button>
      </div>
    </form>
  )
};


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    postUser: (first_name, last_name, email, avatar, id) => dispatch(userTypes.postUser(first_name, last_name, email, avatar, id)),
  }
}

export default connect(null, mapDispatchToProps)(Modal);