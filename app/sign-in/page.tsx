'use client'

import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Authenticated } from 'convex/react'

export default function SignInPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <Authenticated>
          <RedirectToDashboard />
        </Authenticated>
        <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-sm">
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <h1 className="text-4xl font-bold">Sign In to PlayFlow</h1>
              <p className="text-muted-foreground mt-4">
                Sign in to access your personal music collections and recommendations
              </p>
            </div>
            
            <div className="w-full">
              <SignInButton>
                <Button size="lg" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
          <div className="text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} PlayFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function RedirectToDashboard() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/dashboard')
  }, [router])
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p>Redirecting to dashboard...</p>
    </div>
  )
}