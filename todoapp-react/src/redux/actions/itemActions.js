import axios from 'axios';

// Create
export const createItem = (item) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ITEM_REQUEST' });

    axios.post('/api/items', item)
      .then(response => {
        dispatch({
          type: 'CREATE_ITEM_SUCCESS',
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: 'CREATE_ITEM_FAILURE',
          payload: error.message
        });
      });
  };
};

// Read
export const fetchItems = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_ITEMS_REQUEST' });

    axios.get('/api/items')
      .then(response => {
        dispatch({
          type: 'FETCH_ITEMS_SUCCESS',
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_ITEMS_FAILURE',
          payload: error.message
        });
      });
  };
};

// Update
export const updateItem = (itemId, updatedItem) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_ITEM_REQUEST' });

    axios.put(`/api/items/${itemId}`, updatedItem)
      .then(response => {
        dispatch({
          type: 'UPDATE_ITEM_SUCCESS',
          payload: { itemId, updatedItem: response.data }
        });
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_ITEM_FAILURE',
          payload: error.message
        });
      });
  };
};

// Delete
export const deleteItem = (itemId) => {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ITEM_REQUEST' });

    axios.delete(`/api/items/${itemId}`)
      .then(() => {
        dispatch({
          type: 'DELETE_ITEM_SUCCESS',
          payload: itemId
        });
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_ITEM_FAILURE',
          payload: error.message
        });
      });
  };
};