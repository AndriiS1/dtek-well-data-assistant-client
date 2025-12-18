import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const ClerkThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#000000",
          colorPrimary: "#FDE047",
          colorText: "#FFFFFF",
          colorInputBackground: "#18181B",
          colorInputText: "#FFFFFF",
        },
        elements: {
          formButtonPrimary: {
            color: "#000000",
            fontWeight: "700",
            "&:hover": {
              backgroundColor: "#EAB308",
            },
          },
          card: {
            border: "1px solid #27272A",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};
