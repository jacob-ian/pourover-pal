import { render } from '@testing-library/react'
import Header from './Header'


describe('Header', () => {
  const { container } = render(<Header/>)
  const header = container.firstChild

  it('Should render the header', () => {
    expect(header).toBeTruthy()
  })

  it('Should render the header logo', () => {
    const img = header?.firstChild;
    expect(img?.nodeName).toBe('IMG')
  })
})