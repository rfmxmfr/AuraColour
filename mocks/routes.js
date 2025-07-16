module.exports = [
  {
    id: "color-analysis",
    url: "/api/color-analysis",
    method: "POST",
    variants: [
      {
        id: "success",
        response: {
          status: 200,
          body: {
            success: true,
            season: "Autumn",
            confidence: 85,
            undertone: "warm",
            recommended_colors: ["#8B4513", "#CD853F", "#D2691E", "#A0522D", "#DEB887"]
          }
        }
      }
    ]
  },
  {
    id: "full-color-test",
    url: "/api/full-color-test",
    method: "POST",
    variants: [
      {
        id: "success",
        response: {
          status: 200,
          body: {
            success: true,
            message: "Full color analysis test sent to email successfully",
            results: {
              season: "Autumn",
              confidence: 85,
              undertone: "warm",
              recommended_colors: ["#8B4513", "#CD853F", "#D2691E", "#A0522D", "#DEB887"]
            }
          }
        }
      }
    ]
  }
]