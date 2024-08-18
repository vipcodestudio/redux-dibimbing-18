import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
  tabungan: 0,
  hutang: 0,
  pin: '123456',
};

// action
const deposit = createAction('DEPOSIT');
const withdraw = createAction('WITHDRAW');
const changePIN = createAction('CHANGE_PIN');

// reducers
// action: type & payload
const accountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deposit, (state, action) => {
      console.log('Nabung: ' + action.payload);
      state.tabungan = state.tabungan + action.payload;
    })
    .addCase(withdraw, (state, action) => {
      if (action.payload > state.tabungan) {
        console.log('Uang Tidak Cukup');
      } else {
        console.log('Tarik: ' + action.payload);
        state.tabungan = state.tabungan - action.payload;
      }
    })
    .addCase(changePIN, (state, action) => {
      if (state.pin === action.payload.oldPIN) {
        console.log('Berhasil Ubah PIN');
        state.pin = action.payload.newPIN;
      } else {
        console.log('PIN Lama Salah');
      }
    });
});

// store
const store = configureStore({
  reducer: accountReducer,
});

// handler
const handleChangePIN = (oldPIN, newPIN) => {
  store.dispatch(changePIN({ oldPIN, newPIN }));
};

const handleWithdraw = (payload) => {
  store.dispatch(withdraw(payload));
};

const handleDeposit = (payload) => {
  store.dispatch(deposit(payload));
};

// dispatch
handleDeposit(50000);
handleWithdraw(10000);
handleWithdraw(20000);
handleChangePIN('123456', '654321');
console.log(store.getState());
