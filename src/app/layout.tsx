"use client";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const font = `${inter.className}`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 900000,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 3,
      staleTime: 900000,
      gcTime: 900000,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <title>Gatherly</title>
      </head>
      <body className={`${font} debug-screens`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
