const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_ITEM_REQUEST':
      case 'FETCH_ITEMS_REQUEST':
      case 'UPDATE_ITEM_REQUEST':
      case 'DELETE_ITEM_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'CREATE_ITEM_SUCCESS':
        return {
          ...state,
          items: [...state.items, action.payload],
          loading: false,
          error: null
        };
      case 'FETCH_ITEMS_SUCCESS':
        return {
          ...state,
          items: action.payload,
          loading: false,
          error: null
        };
      case 'UPDATE_ITEM_SUCCESS':
        const updatedItems = state.items.map(item => {
          if (item.id === action.payload.itemId) {
            return action.payload.updatedItem;
          }
          return item;
        });
        return {
          ...state,
          items: updatedItems,
          loading: false,
          error: null
        };
      case 'DELETE_ITEM_SUCCESS':
        const filteredItems = state.items.filter(item => item.id !== action.payload);
        return {
          ...state,
          items: filteredItems,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };