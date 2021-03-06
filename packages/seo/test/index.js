import React from 'react'
import { render, wait, cleanup } from '@testing-library/react'

import { SEO, SEOProvider } from '../src'

afterEach(cleanup)

const meta = {
  title: 'SEO Test',
  titleTemplate: ' | Maker UI',
  description: 'Testing the Maker UI SEO components',
}

test('SEOProvider uses default values', async () => {
  render(
    <SEOProvider base={meta}>
      <SEO />
      <h1>Hello</h1>
    </SEOProvider>
  )
  await wait(() => expect(document.title).toBe('SEO Test | Maker UI'))
})

test('SEO component overrides provider defaults', async () => {
  render(
    <SEOProvider base={meta}>
      <SEO title="New Title" description="Test description" noTemplate />
      <h1>Hello</h1>
    </SEOProvider>
  )
  await wait(() => {
    expect(document.title).toBe('New Title')
    expect(
      document.querySelector('meta[name="description"]').getAttribute('content')
    ).toBe('Test description')
  })
})
