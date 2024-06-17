import { render, screen } from "@testing-library/react"
import Title from "../../../src/components/title/Title"
import '@testing-library/jest-dom/extend-expect';

describe('Title', () => {
  it('Renders the title correctly', () => {
    render(<Title/>)

    expect(screen.getByText(/MindMaze/i)).toBeInTheDocument()
  })
})