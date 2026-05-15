import BookingPage from "@/components/booking/BookingPage";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !isPending) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#fdf6f5] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-brand-muted border-t-brand-dark animate-spin"></div>
      </div>
    );
  }

  return <BookingPage />;
}
