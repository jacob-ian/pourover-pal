import HeaderLogo from './HeaderLogo'
import { cleanup, render } from '@testing-library/react'

afterEach(cleanup)
 
describe('HeaderLogo', () => {
  const src = "assets/images/fake"
  const { getByRole } = render(<HeaderLogo src={src} />)
  const img: HTMLImageElement = getByRole('img') as HTMLImageElement;

  it('Should render an image', () => {
    expect(img).toBeTruthy()
  })

  it('Image should have the right src', ()=> {
    expect(img.src).toBe(`http://localhost/${src}`);
  })
})