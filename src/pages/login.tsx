import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser as useClerkUser,
} from "@clerk/clerk-react";
import { useEffect, useState, useContext } from "react";
import { useCreateUser, useGetUserIdByEmail } from "@/apis/users";
import { UserContext } from "@/contexts/user-context";

export default function Login() {
  const { user: clerkUser } = useClerkUser();
  const { user, setUser } = useContext(UserContext);
  const createUserMutation = useCreateUser();
  const [isUserCreated, setIsUserCreated] = useState(false);

  const { data: userId } = useGetUserIdByEmail(
    clerkUser?.primaryEmailAddress?.emailAddress || ""
  );

  useEffect(() => {
    if (clerkUser && !isUserCreated && !userId) {
      const newUser = {
        username: clerkUser.firstName || clerkUser.username || "Anonymous",
        user_email: clerkUser.primaryEmailAddress?.emailAddress || "",
      };

      createUserMutation.mutate(newUser, {
        onSuccess: () => {
          setIsUserCreated(true);
          setUser({ ...newUser, user_id: userId || 0 });
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  return (
    <div className="absolute top-0 right-0 p-4">
      <SignedOut>
        <SignInButton>
          <div className=" bg-black border-2 p-2 text-white hover:bg-gray-700 rounded-md hover:cursor-pointer">
            Sign in
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
        {user && (
          <div>
            <p>Hi {user?.username}</p>
            {/* <p>Email: {user.user_email}</p> */}
          </div>
        )}
      </SignedIn>
    </div>
  );
}
