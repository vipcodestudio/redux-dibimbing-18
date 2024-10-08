import { configureStore, createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    tabungan: 0,
    pin: '123456',
  },
  reducers: {
    deposit(state, action) {
      state.tabungan += action.payload;
    },
    withdraw(state, action) {
      if (action.payload > state.tabungan) {
        console.log('Uang Tidak Cukup');
      } else {
        state.tabungan -= action.payload;
      }
    },
    changePIN(state, action) {
      if (state.pin === action.payload.oldPIN) {
        console.log('Berhasil Ubah PIN');
        state.pin = action.payload.newPIN;
      } else {
        console.log('PIN Lama Salah');
      }
    },
  },
});

const darkmodeSlice = createSlice({
  name: 'darkmode',
  initialState: false,
  reducers: {
    toggle(state) {
      return !state;
    },
  },
});

const cartsSlice = createSlice({
  name: 'carts',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      const totalPriceCurrent = state.items.reduce(
        (total, item) => total + item.price * item.qty,
        0,
      );
      state.totalPrice = totalPriceCurrent;
    },
    deleteFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totalPriceCurrent = state.items.reduce(
        (total, item) => total + item.price * item.qty,
        0,
      );
      state.totalPrice = totalPriceCurrent;
    },
  },
});

const { deposit, withdraw, changePIN } = accountSlice.actions;
const { toggle } = darkmodeSlice.actions;
const { addToCart, deleteFromCart } = cartsSlice.actions;

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    darkmode: darkmodeSlice.reducer,
    carts: cartsSlice.reducer,
  },
});

const handleDeposit = (payload) => {
  store.dispatch(deposit(payload));
};

const handleWithdraw = (payload) => {
  store.dispatch(withdraw(payload));
};

const handleChangePIN = (oldPIN, newPIN) => {
  store.dispatch(changePIN({ oldPIN, newPIN }));
};

const handleDarkmode = () => {
  store.dispatch(toggle());
};

const handleAddToCart = (payload) => {
  store.dispatch(addToCart(payload));
};

const handleDeleteFromCart = (payload) => {
  store.dispatch(deleteFromCart(payload));
};

handleDeposit(500000);
handleDeposit(1000000);
handleWithdraw(100000);
handleChangePIN('123456', '654321');
handleDarkmode();
handleDarkmode();
handleAddToCart({
  id: 1,
  name: 'Baju Batik',
  price: 50000,
  qty: 1,
});
handleAddToCart({
  id: 2,
  name: 'Baju Bola',
  price: 100000,
  qty: 2,
});
console.log(store.getState().carts);
handleDeleteFromCart(1);
console.log(store.getState().carts);
