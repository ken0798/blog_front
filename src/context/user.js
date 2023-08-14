import { createContext, useState } from "react";

export const AuthContext = createContext({
  name: "",
  pic: "",
  token: "",
  loading: false,
  setCred: (data) => {},
  setLoad: (val) => {},
  clearCred: () => {},
});

export default function AuthProvider({ children }) {
  const [state, setState] = useState({
    name: "",
    pic: localStorage.getItem("pic") || "",
    loading: false,
    token: "",
  });

  function storeCred(data) {
    const { name, pic, token } = data;
    setState((pre) => ({
      ...pre,
      name,
      pic,
      token,
    }));
  }

  const credState = {
    ...state,
    setCred: storeCred,
    setLoad: (val) =>
      setState((pre) => ({
        ...pre,
        loading: val,
      })),
    clearCred: () => {
      setState({
        name: "",
        pic: "",
        loading: false,
        token: "",
      });
    },
  };

  return (
    <AuthContext.Provider value={credState}>{children}</AuthContext.Provider>
  );
}
