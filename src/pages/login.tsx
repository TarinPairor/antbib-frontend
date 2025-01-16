import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useCreateUser, useGetUserIdByEmail } from "@/apis/users";

export default function Login() {
  const { user } = useUser();
  const createUserMutation = useCreateUser();
  const [isUserCreated, setIsUserCreated] = useState(false);

  const { data: userId } = useGetUserIdByEmail(
    user?.primaryEmailAddress?.emailAddress || ""
  );

  useEffect(() => {
    if (user && !isUserCreated && !userId) {
      const newUser = {
        username: user.firstName || user.username || "Anonymous",
        user_email: user.primaryEmailAddress?.emailAddress || "",
      };

      createUserMutation.mutate(newUser, {
        onSuccess: () => {
          setIsUserCreated(true);
          // Crash the server after creating the user
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="absolute top-0 right-0 p-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        {user && (
          <div>
            <p>Hi {user.firstName}</p>
            {/* <p>Email: {user.primaryEmailAddress?.emailAddress}</p> */}
          </div>
        )}
      </SignedIn>
    </div>
  );
}
