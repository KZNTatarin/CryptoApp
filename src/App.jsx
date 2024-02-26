import { useContext, createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layouts from "./components/Layouts";

function App() {
  const [balance, setBalance] = useState(0);

   const WalletContext = createContext({
    balance: balance,
    updateBalance: setBalance
  });

  return (
    <>
      <BrowserRouter>
      <WalletContext.Provider value={{balance: balance, updateBalance: setBalance}}>
        <Layouts />
        </WalletContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

// zustand (state manager)