import React, { createContext, useContext, useState, useEffect } from "react";

const RouterContext = createContext(null);

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Route = ({ path, element }) => {
  const { currentPath } = useContext(RouterContext);
  return currentPath === path ? element : null;
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};
