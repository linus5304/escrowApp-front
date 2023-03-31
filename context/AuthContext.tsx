import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import axios from "../configs/apiConfig";
import authConfig from "../configs/authConfig";
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  RegisterParams,
  UserDataType,
} from "./types";

export function setAuthToken(token: string | null) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem(authConfig.storageTokenKeyName, token);
    //connectToSocket(token)
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem(authConfig.storageTokenKeyName);
    localStorage.removeItem("userData");
    //disconnectFromSocket()
  }
}

// Default

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: PropsWithChildren) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProvider.isInitialized
  );

  // ** Hooks
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    setIsInitialized(false);
    setAuthToken(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    document.addEventListener("AuthLogOut", handleLogout); // Typically because the API returned 401 - Unauthorized
    return () => {
      document.removeEventListener("AuthLogOut", handleLogout);
    };
  });

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true);
      const storedToken = localStorage.getItem(authConfig.storageTokenKeyName);
      if (storedToken) {
        setLoading(true);
        setAuthToken(storedToken);
        await axios
          .get(authConfig.meEndpoint)
          .then(response => {
            setLoading(false);
            setUser({ ...response.data });
          })
          .catch(() => {
            setLoading(false);
            handleLogout();
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async res => {
        setAuthToken(res.data.accessToken);
      })
      .then(() => {
        axios.get(authConfig.meEndpoint).then(async response => {
          const returnUrl = router.query.returnUrl;

          setUser({ ...response.data });
          localStorage.setItem("userData", JSON.stringify(response.data));

          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

          router.replace(redirectURL as string);
        });
      })
      .catch(err => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleRegister = (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => {
    console.log("Calling register ", params)
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err: { [key: string]: string }) =>
        errorCallback ? errorCallback(err) : null
      );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
