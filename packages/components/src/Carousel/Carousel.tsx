import React, { useReducer, useEffect } from 'react'
import { Div, BasicBoxProps } from 'maker-ui'
import { animated as a } from 'react-spring'

import { Canvas } from './Canvas'
import Navigation from './Navigation'
import { Pagination } from './Pagination'
import { ProgressBar } from './ProgressBar'

export interface CarouselProps extends BasicBoxProps {
  data: Object[]
  template: React.ReactElement
  nav?: boolean
  pageIndicator?: boolean
  progressBar?: boolean
  barReverse?: boolean
  autoPlay?: boolean
  hoverPause?: boolean
  hideControls?: boolean
  pause?: boolean
  arrow?: React.ReactElement
  transition?: string
  duration?: number
  config?: Object
}

function reducer(state, { type, value }) {
  switch (type) {
    case 'set': {
      return { ...state, index: value }
    }
    case 'next': {
      return {
        ...state,
        index: (state.index + 1) % state.count,
        nextSlide: true,
      }
    }
    case 'previous': {
      return {
        ...state,
        index: state.index === 0 ? state.count - 1 : state.index - 1,
        nextSlide: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

/**
 * Use the `Carousel` component to iterate over an array of data objects or React components
 * to show an animated carousel.
 *
 * @todo - add drag and swipe gesture
 * @todo - revisit accessibile controls: https://www.w3.org/WAI/tutorials/carousels/full-code/
 * @todo - rebuild next() and prev() functions with useCallback hooks
 *
 * @see https://maker-ui.com/docs/components/carousel
 */

export const Carousel = React.forwardRef(
  (
    {
      data = [],
      template,
      nav = true,
      pageIndicator = false,
      progressBar = false,
      barReverse = false,
      autoPlay = false,
      hoverPause = false, // TODO
      hideControls = false, // TODO
      pause = false,
      arrow,
      transition,
      duration = 6500,
      variant = 'carousel',
      config = { mass: 1, tension: 160, friction: 28 },
      sx,
      ...props
    }: CarouselProps,
    ref
  ) => {
    const [state, dispatch] = useReducer(reducer, {
      index: 0,
      count: data.length,
      nextSlide: false,
    })

    // @ts-ignore
    const next = () => dispatch({ type: 'next' })
    // @ts-ignore
    const prev = () => dispatch({ type: 'previous' })

    useEffect(() => {
      if (autoPlay && !pause) {
        const auto = setTimeout(() => {
          next()
        }, duration)

        return () => clearTimeout(auto)
      }
    }, [state, autoPlay, pause, next, duration])

    const slides = data.map(item => ({ style }, i) => (
      <a.div key={i} style={{ ...style }} className="slide">
        {React.cloneElement(template, item)}
      </a.div>
    ))

    return (
      <Div
        // @ts-ignore
        ref={ref}
        variant={variant}
        className="carousel"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          ...sx,
        }}
        {...props}>
        <Canvas
          currentIndex={state.index}
          slides={slides}
          transition={transition}
          next={state.nextSlide}
          config={config}
        />
        {nav ? (
          <Navigation
            controls={{ prev, next }}
            arrow={arrow}
            variant={variant}
          />
        ) : null}
        {pageIndicator ? (
          <Pagination
            current={state.index}
            set={dispatch}
            count={state.count}
            variant={variant}
          />
        ) : null}
        {progressBar && autoPlay ? (
          <ProgressBar
            duration={duration}
            variant={variant}
            reverse={barReverse}
          />
        ) : null}
      </Div>
    )
  }
)
