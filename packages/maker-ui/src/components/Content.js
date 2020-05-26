import React, { useEffect } from 'react'
import { Box } from 'theme-ui'

import { useOptions, useLayout } from '../context/OptionContext'
import { setBreakpoint } from '../utils/helper'

const format = value => (isNaN(value) ? value : `${value}px`)

const Content = React.forwardRef(({ layout, ...props }, ref) => {
  const { content } = useOptions()
  const [baseLayout, setLayout] = useLayout()

  useEffect(() => {
    if (layout !== undefined && layout !== baseLayout) {
      setLayout(layout)
    }
  }, [layout, baseLayout, setLayout])

  const sidebarPartial =
    baseLayout === 'sidebar-content'
      ? {
          gridTemplateColumns: t =>
            setBreakpoint(content.breakIndex, [
              `1fr`,
              `${format(t.sizes.width_sidebar)} 1fr`,
            ]),
        }
      : baseLayout === 'content-sidebar'
      ? {
          gridTemplateColumns: t =>
            setBreakpoint(content.breakIndex, [
              `1fr`,
              `1fr ${format(t.sizes.width_sidebar)}`,
            ]),
        }
      : null

  return (
    <Box
      ref={ref}
      id="site-inner"
      {...props}
      __css={{
        variant: `eui_layout.${baseLayout}`,
        ...sidebarPartial,
        minHeight: '80vh',
      }}
    />
  )
})

export default Content
