// import '../styles/globals.css'
import { Spin } from "antd";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import AuthGuard from "../auth/AuthGaurd";
import GuestGuard from "../auth/GeustGaurd";
import AppLayout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { store } from "../store";

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

type GuardProps = {
  guestGuard: boolean;
  authGuard: boolean;
  children: ReactNode;
};

const Guard = ({ guestGuard, authGuard, children }: GuardProps) => {
  if (guestGuard) {
    return (
      <GuestGuard fallback={<Spin tip="Loading" />}>{children}</GuestGuard>
    );
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spin tip="Loading" />}>{children}</AuthGuard>;
  }
};

export default function App({ Component, pageProps }: ExtendedAppProps) {
  // Variables
  const getLayout =
    Component.getLayout ?? (page => <AppLayout>{page}</AppLayout>);

  const setConfig = Component.setConfig ?? undefined;

  const guestGuard = Component.guestGuard ?? false;

  const authGuard = Component.authGuard ?? true;

  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
        {/* <Guard guestGuard={guestGuard} authGuard={authGuard}> */}
          {getLayout(<Component {...pageProps} />)}
        {/* </Guard> */}
      {/* </AuthProvider> */}
    </Provider>
  );
}
