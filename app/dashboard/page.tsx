'use client'

import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Authenticated, Unauthenticated, useConvexAuth } from 'convex/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        {isLoading ? (
          <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            <Authenticated>
              <DashboardContent />
            </Authenticated>
            <Unauthenticated>
              <RedirectToSignIn />
            </Unauthenticated>
          </>
        )}
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

function RedirectToSignIn() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/sign-in')
  }, [router])
  
  return (
    <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <p className="text-lg">You need to sign in to access this page</p>
        <p>Redirecting to sign-in page...</p>
      </div>
    </div>
  )
}

function DashboardContent() {
  const messages = useQuery(api.messages.getForCurrentUser)
  
  return (
    <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your personal dashboard
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>Recent activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You have {messages?.length || 0} messages.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Music Collections</CardTitle>
              <CardDescription>Your personal music collections</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Coming soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}