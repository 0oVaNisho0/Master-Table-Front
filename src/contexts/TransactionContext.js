import { createContext, useEffect, useReducer } from 'react';
import {
  transactionReducer,
  FETCH_TRANSACTION,
} from '../reducers/transactionReducer';
import axios from 'axios';

const TransactionContext = createContext();

function TransactionContextProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await axios.get('http://localhost:8009/users/getUser').then((res) => {
          dispatch({
            type: FETCH_TRANSACTION,
            value: { transactions: res.data.users },
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ users: state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionContextProvider };
