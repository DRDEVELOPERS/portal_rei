//file: app/layout.js
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/user";
import CartProvider from "./context/cart";
import ErrorBoundary from "./components/ErrorBoundary";

export const metadata = {
  title: "Portal Ferragem",
  description: "Onde você encontra tudo o que precisa!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <div>
          <ErrorBoundary>
            <UserProvider>
              <CartProvider>{children}</CartProvider>
            </UserProvider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
