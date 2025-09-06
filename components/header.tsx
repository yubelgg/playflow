import { UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";

export function Header() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <header className="border-b py-4">
      <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          PlayFlow
        </Link>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Authenticated>
                <UserButton afterSignOutUrl="/" />
              </Authenticated>
              <Unauthenticated>
                <SignInButton mode="modal">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </SignInButton>
              </Unauthenticated>
            </>
          )}
        </div>
      </div>
    </header>
  );
}