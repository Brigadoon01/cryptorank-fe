"use client"

import type React from "react"
import styled from "styled-components"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Container = styled.div`
  max-width: full;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.primary};
`

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const NavLink = styled.a<{ $active: boolean }>`
 padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
 border-radius: ${({ theme }) => theme.borderRadius.md};
 font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
 color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
 background-color: ${({ theme, $active }) => ($active ? `${theme.colors.primary}10` : "transparent")};
 
 &:hover {
   background-color: ${({ theme }) => `${theme.colors.primary}10`};
 }
`

const Footer = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <Container>
      <Header>
        <Logo>CryptoTracker</Logo>
        <Nav>
          <Link href="/" passHref legacyBehavior>
            <NavLink $active={pathname === "/"}>Rates</NavLink>
          </Link>
          <Link href="/converter" passHref legacyBehavior>
            <NavLink $active={pathname === "/converter"}>Converter</NavLink>
          </Link>
        </Nav>
      </Header>
      <main>{children}</main>
      <Footer>© {new Date().getFullYear()} CryptoTracker</Footer>
    </Container>
  )
}

