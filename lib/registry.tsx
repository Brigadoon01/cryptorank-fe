"use client"

import type React from "react"
import { useState } from "react"
import { useServerInsertedHTML } from "next/navigation"
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components"
import { theme } from "@/styles/theme"
import { GlobalStyle } from "@/styles/global"

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    if (typeof window === "undefined") {
      const styles = styledComponentsStyleSheet.getStyleElement()
      styledComponentsStyleSheet.instance.clearTag()
      return <>{styles}</>
    }
    return null
  })

  if (typeof window !== "undefined")
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        {children}
      </ThemeProvider>
    )

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}

