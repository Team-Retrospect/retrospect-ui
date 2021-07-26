import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Triggers from '../Triggers'

test('renders content', () => {
  const url = "GET https://localhost:3001/dashboard";

  const component = render(
    <Triggers />
  )

  expect(component.container).toHaveTextContent(
    'Trigger Route'
  )
  expect(component.container).toHaveTextContent(
    'Id'
  )
})
