import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../../../src/components/layout/Layout';
import { MemoryRouter } from 'react-router-dom';

describe('Layout component', () => {
  it('should render the Navbar component', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </MemoryRouter>
    );

    // Check if the Navbar is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render children within the main tag', () => {
    const contentText = 'Test Content';

    render(
      <MemoryRouter>
        <Layout>
          <div>{contentText}</div>
        </Layout>
      </MemoryRouter>
    );

    // Check if the content is rendered within the main tag
    const main = screen.getByText(/Test Content/i);
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent(contentText);
  });
});