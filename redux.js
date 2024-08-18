import { legacy_createStore } from 'redux';

const initialState = {
  tabungan: 0,
  hutang: 0,
  pin: '123456',
};

// reducers
// action : type & payload;
function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'DEPOSIT':
      console.log('Berhasil Nabung: ' + action.payload);
      return {
        ...state,
        tabungan: state.tabungan + action.payload,
      };
    case 'WITHDRAW':
      if (action.payload > state.tabungan) {
        console.log('Uang Tidak Cukup');
        return state;
      } else {
        console.log('Berhasil Tarik: ' + action.payload);
        return {
          ...state,
          tabungan: state.tabungan - action.payload,
        };
      }
    case 'CHANGE_PIN':
      if (action.payload.oldPIN === state.pin) {
        console.log('PIN Berhasil Diubah');
        return {
          ...state,
          pin: action.payload.newPIN,
        };
      } else {
        console.log('PIN Lama Salah');
        return state;
      }
  }
}

// store
const store = legacy_createStore(accountReducer);

// action
function deposit(payload) {
  store.dispatch({
    type: 'DEPOSIT',
    payload,
  });
}

function withdraw(payload) {
  store.dispatch({
    type: 'WITHDRAW',
    payload,
  });
}

function changePIN(oldPIN, newPIN) {
  store.dispatch({
    type: 'CHANGE_PIN',
    payload: {
      oldPIN,
      newPIN,
    },
  });
}

// dispatch
deposit(500000);
withdraw(1000000);
changePIN('123456', '654321');

console.log(store.getState());
