import { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export function format(value: any): string | number {
  return isNaN(value) ? value : `${value}px`
}

export function getSign(type: string): string {
  return type.includes('right') || type.includes('down') ? '-' : ''
}

export function usePrevious(value: any): any {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState<any>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ro])
  return [{ ref }, bounds]
}

export function useTracker(type, key, toggle, expiration) {
  const [active, set] = useState(true)
  const delay = () => {
    setTimeout(() => {
      set(false)
    }, 1000)
  }

  useEffect((): void => {
    // Use session storage

    if (type === 'session') {
      const sessionCheck = sessionStorage.getItem(key)

      if (toggle && sessionCheck) {
        return set(false)
      }
      if (!toggle && !sessionCheck) {
        delay()
        return sessionStorage.setItem(key, 'true')
      }
    }

    // Use cookie storage

    if (type === 'cookie') {
      const cookieCheck = document.cookie
        .split(';')
        .some(i => i.trim().startsWith(key))

      if (toggle && cookieCheck) {
        return set(false)
      }
      if (!toggle && !cookieCheck) {
        delay()
        document.cookie = `${key}=true;expires=${expiration};path=/`
      }
    }
  }, [toggle, type, expiration, key])

  return active
}
