//file: app/layout.js
import "./globals.css";

export const metadata = {
  title: "Portal Ferragem",
  description: "Onde você encontra tudo o que precisa!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
