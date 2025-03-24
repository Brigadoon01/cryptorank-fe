export const theme = {
    colors: {
      primary: "#3861FB",
      secondary: "#6C7284",
      success: "#16C784",
      danger: "#EA3943",
      warning: "#F7931A",
      background: "#FFFFFF",
      backgroundSecondary: "#F8FAFD",
      text: "#222531",
      textSecondary: "#616E85",
      border: "#EFF2F5",
    },
    breakpoints: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
    },
    fontSizes: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
    },
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "16px",
      round: "50%",
    },
  }
  
  export type Theme = typeof theme
  
  