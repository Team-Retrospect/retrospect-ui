import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorCard from './ErrorCard';
import WebIcon from '@material-ui/icons/Web';

describe('Error Card component', () => {
  test('displays error information', () => {
    const errorType = 10;
    const title = 'Frontend Errors';
    const icon = <WebIcon />;
    const type = 'Events';

    render(<ErrorCard
      errors={errorType}
      title={title}
      Icon={icon}
      type={type}
    />)

    expect(screen.getByText('10 Frontend Errors')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
  });
})