import * as React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
  SideNav,
} from 'maker-ui'
import {
  Announcement,
  // PageTransition,
  // CookieNotice,
} from '@maker-ui/components'
// import { SEOProvider } from '@maker-ui/seo'
import { Fixed } from './Fixed'
import { options } from './options'
import { theme } from './theme'

const menu = [
  {
    label: 'Carousel',
    path: '/carousel',
    submenu: [
      { label: 'Tabs', path: '/tabs' },
      {
        label: 'Tabs',
        path: '/tabs',
        submenu: [
          { label: 'Tabs', path: '/tabs' },
          { label: 'Tabs', path: '/tabs' },
        ],
      },
    ],
  },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Accordion', path: '/accordion' },
  { label: 'Generative', path: '/generative' },
  { label: 'Tree Menu', path: '/tree-menu' },
  { label: 'Modal', path: '/modal' },
  { label: 'Lightbox', path: '/lightbox' },
  { label: 'Popover', path: '/popover' },
  { label: 'TableofContents', path: '/toc' },
]

// const seo = {
//   title: 'Components',
//   description: 'Check out the Maker UI component showcase.',
//   twitter: 'mkdarshay',
//   titleTemplate: ' | Maker UI',
//   siteUrl: 'http://localhost:8000',
// }

export default ({ children, location }) => (
  <Layout theme={theme} options={options}>
    {/* <Topbar>Topbar content</Topbar> */}
    <Announcement sx={{ p: 30 }}>This is an announcement</Announcement>
    <Header>
      <Navbar
        logo={'Components Demo'}
        menu={menu}
        colorButtonInner={<div>Test</div>}
        menuButtonInner="Menu!"
        customMenuButton={(isOpen, attributes) => (
          <button {...attributes}>{isOpen ? 'Close' : 'Open'}</button>
        )}
      />
      <MobileMenu menu={menu} />
      {/* <MobileMenu menu={menu} closeButton={<div>Close!</div>} /> */}
    </Header>
    <Content>
      <SideNav
        // customToggle={(isOpen, attributes) => (
        //   <button
        //     style={{ position: 'fixed', bottom: 100, left: 20 }}
        //     {...attributes}>
        //     {isOpen ? 'close' : 'open'}
        //   </button>
        // )}
        menu={menu}
      />
      <div>yes</div>
      <Main>
        {children}
        {/* <PageTransition>{children}</PageTransition> */}
      </Main>
    </Content>
    <Footer>Footer</Footer>
    {/* <CookieNotice /> */}
  </Layout>
)
