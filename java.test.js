const test = require('./java.test');

test('myFunction should return the sum of two numbers', () => {
  expect(testing(1, 2)).toBe(3);
});

test('fetches data from /api', async () => {
  const mockData = [{ text: 'example', other: 'other', price: '100' }];
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));

  await show();

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/api');

  delete global.fetch;
});
