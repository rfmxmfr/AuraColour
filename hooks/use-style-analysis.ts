'use client'

import { useMutation } from '@tanstack/react-query'

interface AnalysisParams {
  imageUrl: string
  userId?: string
  email?: string
  name?: string
  serviceType?: string
}

export function useStyleAnalysis() {
  return useMutation({
    mutationFn: async (params: AnalysisParams) => {
      const response = await fetch('/api/style-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      return response.json()
    },
  })
}