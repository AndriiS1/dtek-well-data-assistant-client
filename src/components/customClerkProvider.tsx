import { ClerkProvider } from "@clerk/clerk-react";

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
        variables: {
          colorBackground: "#FFFFFF",
          colorPrimary: "#2563EB",
          colorText: "#1F2937",
          colorInputBackground: "#F9FAFB",
          colorInputText: "#111827",
        },
        elements: {
          formButtonPrimary: {
            color: "#FFFFFF",
            fontWeight: "600",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1D4ED8",
            },
          },
          card: {
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          },
          footer: {
            display: "none",
          },
        },
      }}
      localization={{
        socialButtonsBlockButton: "Продовжіть з {{provider|titleize}}",
        signIn: {
          start: {
            title: "Вітаємо!",
            subtitle: "Ввійдіть, щоб отримати доступ до ",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};
