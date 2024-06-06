import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../../src/components/layout/Layout';
import { MemoryRouter } from 'react-router-dom';

describe('Layout component', () => {
  beforeEach(() => {
    render(
      (
        <Layout>
          <div>Content</div>
        </Layout>
      ), 
      {
        wrapper: ({children}) => (
          <MemoryRouter initialEntries={["/"]}>
            {children}
          </MemoryRouter>
     ),
   });
  });

  it('should render the Navbar component', () => {

    // Check if the Navbar is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render children within the main tag', () => {

    // Check if the content is rendered within the main tag
    const main = screen.getByText(/Content/i);
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent(/Content/i);
  });
});