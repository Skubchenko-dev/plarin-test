import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import userTypes from '../reducer';
import { errorHandle, validateEmail } from '../utils';

const Modal = (props) => {
  const { currentUser, editUser, deleteUser, close, changeCurrentUser } = props;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [isErrors, setIsErrors] = useState(false);

  useEffect(() => {
    setName(currentUser.first_name);
    setSurname(currentUser.last_name);
    setEmail(currentUser.email);
  }, [currentUser]);

  const cleanCurrentUser = () => {
    changeCurrentUser(null);
    close(false);
  }

  const removeUser = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${currentUser.id}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      deleteUser(id);
      close(false);
    } else {
      errorHandle(setIsErrors, 'Sorry, API error.');
    }
  }

  const editingUser = async (first_name, last_name, email) => {
    if (!first_name.trim() || !last_name.trim() || !validateEmail(email)) {
      errorHandle(setIsErrors, 'Check the fields and try again.');
    }
    const response = await fetch(`https://reqres.in/api/users/${currentUser.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
      })
    });
    if (response.status === 200) {
      editUser(first_name, last_name, email, currentUser.id);
      close(false);
    } else {
      errorHandle(setIsErrors, 'Sorry, API error.');
    }
    
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='modal'>
      <button type='button' className='close_button' onClick={() => cleanCurrentUser()}>x</button>
      <img
        alt={currentUser.avatar}
        src={currentUser.avatar}
      />
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
        <button disabled={isErrors} type='submit' onClick={() => editingUser(name, surname, email)}>Edit User</button>
        <button type='button' onClick={() => removeUser(currentUser.id)}>Delete User</button>
      </div>
    </form>
  )
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    editUser: (first_name, last_name, email, id) => dispatch(userTypes.editUser(first_name, last_name, email, id)),
    deleteUser: (id) => dispatch(userTypes.deleteUser(id)),
    changeCurrentUser: (id) => dispatch(userTypes.changeCurrentUser(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);