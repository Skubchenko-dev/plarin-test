import React from 'react';
import { connect } from 'react-redux';
import userTypes from '../reducer';

const Pagination = (props) => {
  const { pages, currentPage, changeCurrentPage } = props;

  const buttons = [];

  for (let i = 1; i <= pages; i++) {
    buttons.push(
      <button
        className={i === currentPage ? 'active' : ''}
        key={i}
        onClick={() => changeCurrentPage(i)}
      >
        {i}
      </button>
    );
  }
  
  return (
    <div className='pagination'>
      {buttons}
    </div>
  )
};

function mapStateToProps(state) {
  return {
    users: state.users,
    pages: state.pages,
    currentPage: state.currentPage, 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    fetchUsers: (data) => dispatch(userTypes.fetchUsers(data)),
    changeCurrentPage: (page) => dispatch(userTypes.changeCurrentPage(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);