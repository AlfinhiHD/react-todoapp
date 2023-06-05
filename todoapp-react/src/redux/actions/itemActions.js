import api from '../api/api';

// Create
export const createItem = (item) => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_ITEM_REQUEST' });

    api.post('/products', item)
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

    api.get('/products')
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

    api.put(`/items/${itemId}`, updatedItem)
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

    api.delete(`/products/${itemId}`)
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