import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";

import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AuthProvider from "src/lib/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
