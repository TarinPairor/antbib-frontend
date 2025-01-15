import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export default function Login() {
  const { user } = useUser();
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        {user && (
          <div>
            <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
          </div>
        )}
      </SignedIn>
    </header>
  );
}
