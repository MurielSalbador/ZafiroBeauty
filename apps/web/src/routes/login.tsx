import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdf6f5] to-[#fadcd9] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px]">
        {showSignIn ? (
          <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
        )}
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-[13px] text-brand-muted hover:text-brand-dark transition-colors flex items-center justify-center gap-2">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
