import { SignIn, useAuth } from "@clerk/clerk-react";

type Props = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20rem",
        }}
      >
        <SignIn />
      </div>
    );
  }

  return <>{children}</>;
};
