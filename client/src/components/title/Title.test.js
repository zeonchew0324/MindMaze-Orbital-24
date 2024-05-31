import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Title from './Title';

describe('Title', () => {
  test('renders the title with the correct text and class', () => {
    render(<Title />);
    
    const logoElement = screen.getByText('MindMaze');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('logo');
  });
});
