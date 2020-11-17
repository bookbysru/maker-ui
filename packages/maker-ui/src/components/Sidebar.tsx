/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef } from 'react'

import { MakerProps } from './types'
import { ErrorBoundary } from './ErrorBoundary'

interface SidebarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
}

/**
 * Use the `Sidebar` component for `content-sidebar` or `sidebar-content` layouts.
 * Add it inside the `Content` component and alongside the `Main` component.
 *
 * @see https://maker-ui.com/docs/sidebar
 */

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      id = 'primary-sidebar',
      bg,
      background,
      variant = 'sidebar',
      sx,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id={id}
        className="sidebar"
        role="complementary"
        sx={{ bg, background, variant, ...sx }}
        {...props}>
        <ErrorBoundary errorKey="sidebar">{children}</ErrorBoundary>
      </div>
    )
  }
)

Sidebar.displayName = 'Sidebar'
