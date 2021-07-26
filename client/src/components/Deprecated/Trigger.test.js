import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Trigger from './Trigger'

test('renders content', () => {
  const url = "GET https://localhost:3001/dashboard";

  const component = render(
    <Trigger url={url} />
  )

  expect(component.container).toHaveTextContent(
    'trigger route:'
  )
  expect(component.container).toHaveTextContent(
    `${url}`
  )
})
