import * as React from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps, useMeasure } from 'maker-ui'

import { Portal } from '../Portal'
import { getSign } from '../helper'
import { useFocus } from '../_hooks'

const AnimatedDiv = a(Div)

export interface Position {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}
export interface PopoverProps extends Omit<DivProps, 'children'> {
  show: boolean
  toggle(state?: boolean): void
  anchorRef?: React.MutableRefObject<any>
  anchorWidth?: boolean
  position?: Position
  gap?: { x: number; y: number }
  role?: string
  appendTo?: string | Element
  trapFocus?: boolean
  closeOnBlur?: boolean
  containerSx?: any
  config?: object
  _type?: 'popover' | 'dropdown' | 'tooltip' // internal usage only
  transition?:
    | 'fade'
    | 'fade-down'
    | 'fade-up'
    | 'fade-left'
    | 'fade-right'
    | 'scale' // Used for dropdown menu only
  children: React.ReactNode
}

const getTransform = (type: string) => {
  switch (type) {
    case 'fade-up':
    case 'fade-down':
      return `translate3d(0,${getSign(type)}10px,0)`
    case 'fade-left':
    case 'fade-right':
      return `translate3d(${getSign(type)}10px, 0, 0)`
    case 'scale':
    case 'fade':
    default:
      return `translate3d(0px,0px,0px)`
  }
}

/**
 * The `Popover` component lets you add supplemental views like a Tooltip or Dropdown
 * to a specified DOM node or the document body.
 *
 * Use the `Popover` to customize your own components, otherwise try out the pre-configured
 * `Tooltip` or `Dropdown` components.
 *
 * @see https://maker-ui.com/docs/components/popovers
 * @todo - refactor with useMeasure Resize Observer
 */

export const Popover = ({
  show,
  toggle,
  role = 'presentation',
  id,
  anchorRef,
  anchorWidth,
  position = { x: 'origin', y: 'bottom' },
  appendTo,
  trapFocus,
  gap = { x: 0, y: 0 },
  closeOnBlur = true,
  transition = 'fade',
  variant,
  config,
  containerSx,
  _type = 'popover',
  sx,
  children,
  ...rest
}: PopoverProps) => {
  const popoverRef = React.useRef(null)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const [initialRender, setInitialRender] = React.useState(true)
  const [, box] = useMeasure({
    externalRef: anchorRef,
  })

  const measuredRef = React.useCallback(
    node => {
      if (node !== null && height === 0) {
        setHeight(node.offsetHeight)
        setWidth(node.offsetWidth)
      }
    },
    [height]
  )

  useFocus({
    type: _type,
    containerRef: popoverRef,
    focusRef: anchorRef,
    show,
    toggle,
    closeOnBlur,
    trapFocus,
  })

  React.useEffect(() => {
    if (transition === 'scale') {
      setInitialRender(false)
      toggle(false)
    }
  }, [transition, toggle])

  React.useEffect(() => {
    if (!box) return
    if (anchorWidth) {
      setWidth(box.width)
    }
  }, [box, anchorWidth])

  // TODO refactor this into one ...getTransitions function
  const animate = useTransition(show ? [1] : [], {
    from: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition),
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0px,0px,0px)`,
      height: transition === 'scale' ? `${height}px` : undefined,
    },
    leave: {
      opacity: transition.includes('fade') ? 0 : 1,
      height: transition === 'scale' ? '0px' : undefined,
      transform: getTransform(transition),
    },
    config,
  })

  // TODO add and test gapX
  const getX = () => {
    if (!box) return
    return position.x === 'center'
      ? box.left + box.width / 2 - width / 2
      : position.x === 'left'
      ? box.left - width - gap.x
      : position.x === 'right'
      ? box.right + gap.x
      : box.left
  }

  const getY = () => {
    if (!box) return
    return position.y === 'top'
      ? box.documentTop - height - gap.y
      : position.y === 'bottom'
      ? box.documentTop + box.height + gap.y
      : position.y === 'center'
      ? box.documentTop + box.height / 2 - height / 2
      : 0
  }

  return (
    <Portal root={appendTo}>
      {animate(
        (props, item) =>
          item && (
            <AnimatedDiv
              id={id}
              role={role}
              ref={popoverRef}
              aria-hidden={show}
              // @ts-ignore
              style={props}
              sx={{
                variant,
                position: 'absolute',
                display: 'block',
                zIndex: 100,
                left: _type !== 'dropdown' && getX(),
                top: _type !== 'dropdown' && getY(),
                width: anchorWidth && width,
                overflow: transition.includes('scale') && 'hidden',
                ...sx,
              }}
              {...rest}>
              <Div
                ref={measuredRef}
                sx={{
                  ...containerSx,
                  opacity: transition === 'scale' && initialRender && [0],
                  visibility: transition === 'scale' &&
                    initialRender && ['hidden'],
                }}>
                {children}
              </Div>
            </AnimatedDiv>
          )
      )}
    </Portal>
  )
}

Popover.displayName = 'Popover'
