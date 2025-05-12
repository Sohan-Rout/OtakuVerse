import "./globals.css";

// app/layout.js
export const metadata = {
  title: 'My Anime Site',
  description: 'Watch anime with style',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins">{children}</body>
    </html>
  );
}