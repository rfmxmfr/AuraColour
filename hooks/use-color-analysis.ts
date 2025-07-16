"use client";

import { useMutation } from "@tanstack/react-query";

interface ColorAnalysisParams {
  imageUrl: string;
  userId?: string;
  email?: string;
  name?: string;
}

export function useColorAnalysis() {
  return useMutation({
    mutationFn: async (params: ColorAnalysisParams) => {
      const response = await fetch("/api/color-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) throw new Error("Color analysis failed");
      return response.json();
    },
  });
}