import React, { useState, useEffect, useContext } from 'react'

const AccordionDataContext = React.createContext(null)
const AccordionUpdateContext = React.createContext(null)

interface AccordionContextProps {
  icon?: boolean
  customIcons?: {
    expand?: React.ReactElement | null
    collapse?: React.ReactElement | null
  }
  activeKey?: number | string
  showSingle?: boolean
  children: React.ReactElement
}

/**
 * Use the `Accordion` component to build and customize collapsible accordions.
 *
 * @internal use only
 */

export const AccordionContext = ({
  icon,
  customIcons,
  activeKey,
  showSingle,
  children,
}: AccordionContextProps) => {
  const [state, setState] = useState({
    activeKey,
    panelKeys: [],
    icon,
    customIcons,
    showSingle,
  })

  useEffect(() => {
    setState(state => ({ ...state, activeKey }))
  }, [activeKey])

  return (
    <AccordionDataContext.Provider value={state}>
      <AccordionUpdateContext.Provider value={setState}>
        {children}
      </AccordionUpdateContext.Provider>
    </AccordionDataContext.Provider>
  )
}

export function useAccordion() {
  const state = useContext(AccordionDataContext)
  const setState = useContext(AccordionUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Panel must be used within an Accordion component')
  }

  function registerPanel(id: string) {
    const exists = state.panelKeys ? state.panelKeys.find(t => t === id) : false

    if (!exists) {
      setState(s => ({
        ...s,
        panelKeys: [...s.panelKeys, id],
      }))
    }
  }

  function setActivePanel(id: string) {
    setState(s => ({ ...s, activeKey: id }))
  }

  return { state, registerPanel, setActivePanel }
}
