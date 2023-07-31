import './matchMedia.mock';
import { render, screen, waitFor, waitForElementToBeRemoved  } from '@testing-library/react';
import Home from '@/pages/index';

const checkElementIds = [
  'product_name',
  'product_image',
  'product_description',
  'S_btn',
  'M_btn',
  'L_btn',
  'addToCart',
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({"id": 1, "title": "Classic Tee", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "price": 75.0, "imageURL": "https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg", "sizeOptions": [{"id": 1, "label": "S"}, {"id": 2, "label": "M"}, {"id": 3, "label": "L"}]}),
  })
);

describe('Home', () => {
  beforeEach(async () => {
    fetch()
  });
  checkElementIds.forEach(id => {
    it(`renders a ${id}`, async () => {
      render(<Home />)
      
      await waitFor(() => {
        const title = screen.getByTestId(id);
        expect(title).toBeInTheDocument();
      })
    })
  })
})
