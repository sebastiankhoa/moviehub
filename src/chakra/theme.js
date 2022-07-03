import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "Montserrat, sans-serif",
  },
  styles: {
    global: {
      body: {
        bgGradient: "linear(to-r,orange,blue)",
      },
    },
  },
});
