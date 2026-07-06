"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type DarkPassengerContext = {
  active: boolean;
  toggle: () => void;
};

const Context = createContext<DarkPassengerContext>({
  active: false,
  toggle: () => {},
});

export function DarkPassengerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-dark-passenger",
      active ? "true" : "false",
    );
  }, [active]);

  const toggle = useCallback(() => setActive((v) => !v), []);

  return (
    <Context.Provider value={{ active, toggle }}>{children}</Context.Provider>
  );
}

export const useDarkPassenger = () => useContext(Context);
