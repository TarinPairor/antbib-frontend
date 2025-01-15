import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import "./App.css";

export default function App() {
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
            {/* Add other user data you want to display here */}
          </div>
        )}
      </SignedIn>
    </header>
  );
}
