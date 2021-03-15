import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchUsers: ['result'],
  postUser: ['first_name', 'last_name', 'email', 'avatar', 'id'],
  editUser: ['first_name', 'last_name', 'email', 'id'],
  deleteUser: ['id'],
  changeCurrentPage: ['number'],
  changeCurrentUser: ['id'],
});

export const userTypes = Types;
export default Creators;

const initialState = {
  users: [],
  pages: 0,
  currentPage: 0,
  currentUser: null,
};

const fetchUsers = (state, { result }) => {
  return {
    ...state,
    users: result,
    pages: Math.ceil(result.length / 6),
    currentPage: 1,
  };
}

const postUser = (state, { first_name, last_name, email, avatar, id }) => {
  return {
    ...state,
    users: [...state.users, {
      id,
      first_name,
      last_name,
      email,
      avatar,
    }],
    pages: Math.ceil((state.users.length + 1) / 6),
    currentPage: Math.ceil((state.users.length + 1) / 6),
  }
}

const editUser = (state, { first_name, last_name, email, id }) => {
  return {
    ...state,
    users: state.users.map(item => {
      if (item.id === id) {
        return {
          ...item,
          first_name,
          last_name,
          email,
        };
      } else {
        return item;
      }
    })
  }
};

const deleteUser = (state, { id }) => {
  const newArray = state.users.filter(item => item.id !== id);
  return {
    ...state,
    users:  newArray,
    pages: Math.ceil(newArray.length / 6),
    currentPage: 
      (!(newArray.length % 6)
      && state.currentPage !== Math.ceil(newArray.length / 6))
        ? state.currentPage - 1 
        : state.currentPage
  }
};

const changeCurrentPage = (state, { number }) => {
  return {
    ...state,
    currentPage: number,
  }
};

const changeCurrentUser = (state, { id }) => {
  return {
    ...state,
    currentUser: state.users.find(item => item.id === id),
  }
}

export const reducer = createReducer(initialState, {
  [Types.FETCH_USERS]: fetchUsers,
  [Types.POST_USER]: postUser,
  [Types.EDIT_USER]: editUser,
  [Types.DELETE_USER]: deleteUser,
  [Types.CHANGE_CURRENT_PAGE]: changeCurrentPage,
  [Types.CHANGE_CURRENT_USER]: changeCurrentUser,
});
