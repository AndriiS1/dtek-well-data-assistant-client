import { UserApiService } from "@/api/services/UserApiService";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const useUserEmailAccessCheck = () => {
  const { user, isLoaded: clerkLoaded } = useUser();
  const [allowedEmails, setAllowedEmails] = useState<string[] | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [apiLoaded, setApiLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllowedEmails = async () => {
      try {
        const emails = await UserApiService.getAllowedEmails();
        setAllowedEmails(emails);
      } catch (error) {
        console.error("Failed to fetch allowed emails:", error);
        setAllowedEmails([]);
      } finally {
        setApiLoaded(true);
      }
    };

    fetchAllowedEmails();
  }, []);

  useEffect(() => {
    if (clerkLoaded && apiLoaded && allowedEmails) {
      const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

      const isAllowed =
        !!currentUserEmail && allowedEmails.includes(currentUserEmail);
      setHasAccess(isAllowed);
    }
  }, [clerkLoaded, apiLoaded, allowedEmails, user]);

  const isFullyLoaded = clerkLoaded && apiLoaded;

  return { isLoaded: isFullyLoaded, hasAccess };
};

export default useUserEmailAccessCheck;
