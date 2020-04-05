import React from 'react'
import { Flex } from 'theme-ui'
import { animated as a, useTransition } from 'react-spring'

function getTransition(type, distance) {
  const format = value => (isNaN(value) ? value : `${value}px`)
  const sign = type.includes('right') || type.includes('down') ? '-' : ''

  switch (type) {
    case 'fade-right':
    case 'fade-left':
      return `translate3d(${sign}${format(distance)},0,0)`
    case 'fade-down':
    case 'fade-up':
      return `translate3d(0,${sign}${format(distance)},0)`
    default:
      return undefined
  }
}

const PageTransition = ({
  type = 'fade-up',
  distance = 20,
  config,
  children,
}) => {
  const transitions = useTransition(children, children => children.key, {
    from: {
      opacity: 0,
      transform: getTransition(type, distance),
      position: 'static',
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0 },
    config,
  })
  return transitions.map(({ item, key, props }) => (
    <Flex
      id="content-wrapper"
      sx={{ flexDirection: 'column', minHeight: '80vh' }}>
      <a.div key={key} style={{ ...props, flex: 1 }}>
        {item}
      </a.div>
    </Flex>
  ))
}

export default PageTransition