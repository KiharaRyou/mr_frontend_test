import { createContext, useState } from "react";

export interface CartItemType {
  product_id: number,
  title: string,
  imageUrl: string,
  unit_price: number,
  size: string,
  qty: number
}

export interface GlobalStateType {
  cartItems: CartItemType[]
}

export const GlobalContext = createContext({cartItems: []});

function GlobalContextProvider({children}: { children?: React.ReactNode }) {
  const [globalState, setGlobalState] = useState({cartItems: []});

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;