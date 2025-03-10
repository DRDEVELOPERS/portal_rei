//file: app/layout.js
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/user";

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
          <UserProvider>{children}</UserProvider>
        </div>
      </body>
    </html>
  );
}
