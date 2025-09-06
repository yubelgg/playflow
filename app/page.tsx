'use client'

import { Authenticated, Unauthenticated, useConvexAuth } from 'convex/react'
import { SignInButton } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Music, Headphones, Radio, Zap, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Home() {
  // Use Convex's auth hook for proper state handling
  const { isAuthenticated, isLoading } = useConvexAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section (formerly using Hero component) */}
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
          <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 flex flex-col items-center text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              PlayFlow
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground">
              Discover, curate, and enjoy music like never before. Your personalized music experience starts here.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <Authenticated>
                    <Button asChild size="lg">
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                  </Authenticated>
                  <Unauthenticated>
                    <SignInButton mode="modal">
                      <Button size="lg">
                        Get Started
                      </Button>
                    </SignInButton>
                    <Button asChild variant="outline" size="lg">
                      <Link href="#features">Learn More</Link>
                    </Button>
                  </Unauthenticated>
                </>
              )}
            </div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/40" id="features">
          <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Features</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                PlayFlow combines powerful music discovery with personalized curation to create your perfect listening experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Using standard Card components directly instead of FeatureCard */}
              {[
                {
                  title: "Smart Playlists",
                  description: "Create dynamic playlists that automatically update based on your listening habits and preferences.",
                  icon: <Music size={24} />
                },
                {
                  title: "Personalized Recommendations",
                  description: "Discover new music tailored to your unique taste with our advanced recommendation engine.",
                  icon: <Headphones size={24} />
                },
                {
                  title: "Radio Stations",
                  description: "Generate endless radio stations based on any song, artist, or mood you're into.",
                  icon: <Radio size={24} />
                },
                {
                  title: "Real-time Updates",
                  description: "Experience seamless real-time updates as your music collection grows and evolves.",
                  icon: <Zap size={24} />
                },
                {
                  title: "Curated Collections",
                  description: "Explore expertly curated collections designed for every mood, activity, and genre.",
                  icon: <Star size={24} />
                },
                {
                  title: "Social Discovery",
                  description: "Share your favorite tracks and discover what your friends are listening to.",
                  icon: <Users size={24} />
                }
              ].map((feature, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="text-primary">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16">
          <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ready to transform your music experience?</h2>
              <p className="text-muted-foreground mt-4">
                Join PlayFlow today and discover a new way to experience your favorite music.
              </p>
              <div className="mt-8">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <Authenticated>
                      <AuthenticatedContent />
                    </Authenticated>
                    <Unauthenticated>
                      <SignInButton mode="modal">
                        <Button size="lg">
                          Get Started Now
                        </Button>
                      </SignInButton>
                    </Unauthenticated>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="mx-auto w-full px-4 md:px-6 lg:px-8 max-w-screen-lg">
          <div className="text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} PlayFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AuthenticatedContent() {
  const messages = useQuery(api.messages.getForCurrentUser)
  
  return (
    <div className="text-center">
      <h3 className="text-lg font-medium">Welcome back!</h3>
      <p className="text-muted-foreground">
        You have {messages?.length || 0} messages in your inbox.
      </p>
      <Button asChild className="mt-4">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  )
}