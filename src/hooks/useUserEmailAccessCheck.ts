import { UserApiService } from "@/api/services/UserApiService";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const useUserEmailAccessCheck = () => {
  const { user, isLoaded: clerkLoaded } = useUser();
  const [allowedEmails, setAllowedEmails] = useState<string[] | null>(null);
  const [apiLoaded, setApiLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllowedEmails = async () => {
      try {
        const emails = await UserApiService.getAllowedEmails();
        setAllowedEmails(emails);
      } catch {
        setAllowedEmails([]);
      } finally {
        setApiLoaded(true);
      }
    };
    fetchAllowedEmails();
  }, []);

  const currentUserEmail = user?.primaryEmailAddress?.emailAddress;
  const hasAccess = !!(
    clerkLoaded &&
    apiLoaded &&
    currentUserEmail &&
    allowedEmails?.includes(currentUserEmail)
  );

  const isLoaded = clerkLoaded && apiLoaded;

  return { isLoaded, hasAccess };
};

export default useUserEmailAccessCheck;
