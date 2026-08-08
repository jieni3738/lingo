import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ClerkLoaded, ClerkLoading, Show, SignUpButton, SignInButton } from "@clerk/nextjs"
import { Loader } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return(
    <div className="max-w-249 mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative mb-8 h-55 w-55 lg:mb-0 lg:h-70 lg:w-70" >
        <Image src="/hero.png" alt="Hero" fill className="object-contain"/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-120 text-center ">
          Learn, practice and master new languages with Lingo.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-82 w-full"> 
           <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
           </ClerkLoading>
           <ClerkLoaded>
              <Show when="signed-out">
                <SignUpButton 
                  mode="modal" 
                  forceRedirectUrl="/learn"
                >
                  <Button size="lg" variant="secondary" className="w-full">
                    Get Started
                  </Button>
                </SignUpButton>
                 <SignInButton 
                  mode="modal" 
                  forceRedirectUrl="/learn"
                >
                  <Button size="lg" variant="primaryOutline" className="w-full">
                    I already have an account
                  </Button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <Button size="lg" variant="secondary" className="w-full asChild">
                  <Link href="/learn">
                    Continue Learning
                  </Link>
                </Button>
              </Show>
           </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}