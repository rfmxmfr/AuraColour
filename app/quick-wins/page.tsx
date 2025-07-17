"use client"

import React, { useState } from "react"

import ProgressIndicator from "@/app/components/ProgressIndicator"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner, LoadingState, ErrorMessage, TrustSignals } from "@/components/ui/quick-wins"
import { showNotification } from "@/lib/notifications"

export default function QuickWinsDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showError, setShowError] = useState(false)
  
  const handleLoadingDemo = () => {
    setIsLoading(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-6">Quick Wins Demo</h1>
        <p className="text-muted-foreground mb-8">
          This page demonstrates the quick win components: progress indicators, loading states, error messages, and trust signals.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Progress Indicators</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Simple Progress Bar</h3>
            <Progress value={ progress } className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">{ progress }% Complete</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Step Progress Indicator</h3>
            <ProgressIndicator 
              currentStep={ Math.floor(progress / 25) } 
              totalSteps={ 4 } 
              stepLabels={ ["Details", "Upload", "Review", "Submit"] } 
            />
          </div>
          
          <div className="flex gap-4">
            <Button onClick={ handleLoadingDemo } disabled={ isLoading }>
              Start Progress Demo
            </Button>
            <Button variant="outline" onClick={ () => setProgress(0) } disabled={ isLoading }>
              Reset
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Loading States</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Loading Spinners</h3>
            <div className="flex items-center gap-4">
              <LoadingSpinner size="sm" />
              <LoadingSpinner size="md" />
              <LoadingSpinner size="lg" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Loading Buttons</h3>
            <div className="flex flex-col gap-4">
              <Button isLoading={ true } loadingText="Loading...">
                Submit
              </Button>
              <Button variant="outline" isLoading={ true }>
                Processing
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Loading States</h3>
            <div className="flex flex-col gap-4">
              <div className="relative h-32 border rounded-md">
                <LoadingState variant="overlay" text="Loading content..." />
                <div className="p-4">Content here will be blurred</div>
              </div>
              <LoadingState variant="inline" text="Fetching data..." />
              <LoadingState variant="skeleton" className="h-20" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Error Messages</h2>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              onClick={ () => setShowError(!showError) }
            >
              { showError ? "Hide" : "Show" } Error Message
            </Button>
            
            <Button
              variant="destructive"
              onClick={ () => showNotification("error", "Something went wrong", {
                title: "Error",
                description: "Unable to process your request. Please try again later.",
                action: {
                  label: "Retry",
                  onClick: () => showNotification("info", "Retrying..."),
                },
              }) }
            >
              Show Error Toast
            </Button>
            
            <Button
              variant="outline"
              onClick={ () => showNotification("warning", "Warning", {
                description: "Your session will expire soon. Please save your work.",
              }) }
            >
              Show Warning Toast
            </Button>
            
            <Button
              variant="secondary"
              onClick={ () => showNotification("success", "Success", {
                description: "Your changes have been saved successfully.",
              }) }
            >
              Show Success Toast
            </Button>
          </div>
          
          { showError && (
            <div className="space-y-4">
              <ErrorMessage 
                title="Connection Error" 
                message="Unable to connect to the server. Please check your internet connection and try again."
                onDismiss={ () => setShowError(false) }
              />
              
              <ErrorMessage 
                title="Warning" 
                message="Your session will expire in 5 minutes. Please save your work."
                variant="warning"
                dismissable={ false }
              />
            </div>
          ) }
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Trust Signals</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Inline Trust Signals</h3>
            <TrustSignals variant="inline" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Grid Trust Signals</h3>
            <TrustSignals variant="grid" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Banner Trust Signals</h3>
            <TrustSignals 
              variant="banner" 
              signals={ [
                {
                  icon: <span className="text-xl">🔒</span>,
                  title: "Secure Checkout",
                  description: "Your payment information is encrypted",
                },
                {
                  icon: <span className="text-xl">⭐</span>,
                  title: "Trusted by 1000+ Clients",
                  description: "Join our satisfied customers",
                },
                {
                  icon: <span className="text-xl">🛡️</span>,
                  title: "Money-Back Guarantee",
                  description: "30-day satisfaction guarantee",
                },
              ] }
            />
          </div>
        </div>
      </section>
    </div>
  )
}