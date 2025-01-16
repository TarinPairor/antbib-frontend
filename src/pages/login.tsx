import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useCreateUser, useGetUserIdByEmail } from "@/apis/users";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const { isLoaded, user } = useUser();
  const [isUserCreated, setIsUserCreated] = useState(false);
  const queryClient = useQueryClient();

  const { data: userId } = useGetUserIdByEmail(
    user?.primaryEmailAddress?.emailAddress || ""
  );

  const createUserMutation = useCreateUser();

  useEffect(() => {
    if (isLoaded && user && !isUserCreated && !userId) {
      const newUser = {
        username: user.firstName || user.username || "Anonymous",
        user_email: user.primaryEmailAddress?.emailAddress || "",
      };

      createUserMutation.mutate(newUser, {
        onSuccess: () => {
          setIsUserCreated(true);
          // Invalidate and refetch user queries after creation
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
          console.error("Failed to create user:", error);
          setIsUserCreated(false);
        },
      });
    }
  }, [isLoaded, user, isUserCreated, userId, createUserMutation, queryClient]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 p-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        {user && (
          <div>
            <p>Hi {user.firstName}</p>
          </div>
        )}
      </SignedIn>
    </div>
  );
}
