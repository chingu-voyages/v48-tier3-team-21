"use client";

import { createContext, ReactNode, useMemo, useState } from "react";

export const AppContext = createContext({
  refreshSearchHistoryView: true || false,
  setRefreshSearchHistoryView: (val: boolean) => {},
});

export default function AppContextProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [refreshSearchHistoryView, setRefreshSearchHistoryView] =
    useState(false);

  const contextValues = useMemo(() => {
    return {
      refreshSearchHistoryView,
      setRefreshSearchHistoryView,
    };
  }, [refreshSearchHistoryView]);

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
