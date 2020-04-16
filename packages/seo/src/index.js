import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'

const SEOContext = React.createContext()
const SEOUpdateContext = React.createContext()

const SEOProvider = ({
  base: {
    title = '',
    titleTemplate = '',
    description = '',
    siteUrl = '',
    image,
    twitter = '',
    lang = 'en',
  },
  children,
}) => {
  const [state, setState] = useState({
    title,
    titleTemplate,
    description,
    siteUrl,
    image,
    twitter,
    lang,
  })

  return (
    <SEOContext.Provider value={state}>
      <SEOUpdateContext.Provider value={setState}>
        {children}
      </SEOUpdateContext.Provider>
    </SEOContext.Provider>
  )
}

function useSEO() {
  const state = useContext(SEOContext)
  const setState = useContext(SEOUpdateContext)

  if (typeof state === undefined) {
    throw new Error('SEO component must be used within an SEOProvider')
  }

  return [state, setState]
}

const SEO = props => {
  const [state] = useSEO()

  const {
    title = state.title,
    description = state.description,
    image = state.image,
    lang = state.lang,
    twitter = state.twitter,
    titleTemplate = state.titleTemplate,
    siteUrl = state.siteUrl,
    noTemplate = false,
    meta = [],
  } = props

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={noTemplate ? title : `${title}${titleTemplate}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]
        .concat(
          image
            ? [
                {
                  property: 'og:image',
                  content: siteUrl + image,
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
              ]
        )
        .concat(meta)}
    />
  )
}

export { SEOProvider, SEO, useSEO }
