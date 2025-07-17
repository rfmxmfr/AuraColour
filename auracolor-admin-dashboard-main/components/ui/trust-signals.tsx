"use client"

import { cn } from "@/lib/utils"
import { Shield, Star, Clock, Award, CheckCircle } from "lucide-react"
import * as React from "react"

interface TrustSignalProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "inline" | "grid" | "banner"
  signals?: {
    icon: React.ReactNode
    title: string
    description?: string
  }[]
}

export function TrustSignals({
  variant = "inline",
  signals,
  className,
  ...props
}: TrustSignalProps) {
  const defaultSignals = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Payments",
      description: "Your data is protected with industry-standard encryption",
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Satisfaction Guaranteed",
      description: "Wee're committed to your complete satisfaction",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Fast Response",
      description: "We respond to all inquiries within 24 hours",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Professional Service",
      description: "Experienced professionals at your service",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Quality Guaranteed",
      description: "We stand behind the quality of our work",
    },
  ]

  const displaySignals = signals || defaultSignals

  const variantClasses = {
    inline: "flex flex-wrap items-center gap-6 justify-center",
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
    banner: "flex flex-col md:flex-row items-center justify-between gap-4 bg-muted p-4 rounded-lg",
  }

  const itemClasses = {
    inline: "flex items-center gap-2",
    grid: "flex flex-col items-center text-center p-4 bg-background rounded-lg shadow-sm",
    banner: "flex items-center gap-3",
  }

  return (
    <div
      className={ cn(
        variantClasses[variant],
        className
      ) }
      { ...props }
    >
      { displaySignals.map((signal, index) => (
        <div key={ index } className={ itemClasses[variant] }>
          <div className={ cn(
            "text-primary",
            variant === "grid" && "mb-3 p-2 bg-primary/10 rounded-full"
          ) }>
            { signal.icon }
          </div>
          <div className={ variant === "grid" ? "" : "flex flex-col" }>
            <h4 className="font-medium text-sm">{ signal.title }</h4>
            { signal.description && variant !== "inline" && (
              <p className="text-xs text-muted-foreground">{ signal.description }</p>
            ) }
          </div>
        </div>
      )) }
    </div>
  )
}