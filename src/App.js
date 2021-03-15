import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import userTypes from './reducer';
import User from './Components/User';
import Pagination from './Components/Pagination';
import Modal from './Components/Modal';
import EditModal from './Components/EditModal';

function App(props) {
  const { users, fetchUsers, currentPage } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'GET', 
      });
      const result = await response.json();
      fetchUsers(result.data);
    };
    getUsers();
  }, [fetchUsers]);

  const usersToRender = useMemo(() => {
    return users.slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)
  }, [users, currentPage]);
  
  return (
    <div className='root'>
      <div className='list'>
        {usersToRender.map((item) => (
          <User
            first_name={item.first_name}
            last_name={item.last_name}
            avatar={item.avatar}
            key={item.id}
            id={item.id}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        ))}
      </div>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>+</button>
      {isModalOpen && <div className='modalBackground'>
        <Modal close={setIsModalOpen}/>
      </div>}
      {isEditModalOpen && <div className='modalBackground'>
        <EditModal close={setIsEditModalOpen}/>
      </div>}
      <Pagination />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users, 
    currentPage: state.currentPage,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchUsers: (data) => dispatch(userTypes.fetchUsers(data)),
    postUser: (first_name, last_name, email, avatar) => dispatch(userTypes.postUser(first_name, last_name, email, avatar)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
