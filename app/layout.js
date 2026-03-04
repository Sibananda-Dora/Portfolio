import "./globals.css";

export const metadata = {
  title: "Sibananda Dora — CS Student & Builder",
  description:
    "Portfolio of Sibananda Dora — B.Tech 2nd year Computer Science student passionate about AI, Machine Learning, and building things with Python.",
  keywords: ["Sibananda Dora", "portfolio", "CS student", "AI", "Machine Learning", "Python", "software engineer"],
  authors: [{ name: "Sibananda Dora" }],
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
  openGraph: {
    title: "Sibananda Dora — CS Student & Builder",
    description: "B.Tech 2nd year CS student passionate about AI, ML, and building things with Python.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
