import { createContext, useContext } from 'react'

import WithChildren from '../types/WithChildren'

// eslint-disable-next-line @typescript-eslint/ban-types
type AppContextProps = {}

export const AppContext = createContext<Partial<AppContextProps>>({})

export const AppProvider = ({ children }: WithChildren) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
