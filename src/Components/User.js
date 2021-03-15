import React from 'react';
import { connect } from 'react-redux';
import userTypes from '../reducer';
import '../styles.scss';

const User = (props) => {
  const { first_name, last_name, avatar, setIsEditModalOpen, id, changeCurrentUser } = props;

  const openModal = (id) => {
    changeCurrentUser(id);
    setIsEditModalOpen(true);
  };

  return (
    <div onClick={() => openModal(id)} className='user'>
      <img
        alt={avatar}
        src={avatar}
      />
      <span>{first_name + ' ' + last_name}</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    changeCurrentUser: (id) => dispatch(userTypes.changeCurrentUser(id)),
  }
}


export default connect(null, mapDispatchToProps)(User);
