import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [], totalAmount: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [], totalAmount: 0 };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch { 
    // Handle error (optional)
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalAmount += newItem.price;
      saveState(state);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount -= existingItem.price * existingItem.quantity;
        saveState(state);
      }
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalAmount += existingItem.price * existingItem.quantity;
        saveState(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      saveState(state);
    }
  }
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
