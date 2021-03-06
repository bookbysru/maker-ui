import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Layout as ThemeLayout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
} from 'maker-ui'

import { theme } from '../config/theme'
import { options } from '../config/options'
import { menu } from '../config/menu'

const Layout = ({ children }) => {
  const router = useRouter()

  // Convert Maker UI's anchor tags into NextJS Links
  useEffect(() => {
    const baseUrl = window.location.origin
    const makerLinks = document.querySelectorAll('#site-header a')

    makerLinks.forEach(link => {
      link.addEventListener('click', e => {
        const target = e.currentTarget as HTMLAnchorElement
        const path = target.closest('a').href

        if (path.includes(baseUrl)) {
          e.preventDefault()
          router.push(target.closest('a').pathname)
        }
      })
    })
  }, [router])
  return (
    <ThemeLayout theme={theme} options={options}>
      <Header>
        <Navbar menu={menu} />
        <MobileMenu menu={menu} />
      </Header>
      <Content>
        <Main>{children}</Main>
      </Content>
      <Footer>Footer</Footer>
    </ThemeLayout>
  )
}

export default Layout
