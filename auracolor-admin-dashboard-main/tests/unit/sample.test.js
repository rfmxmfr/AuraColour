// Sample unit tests
describe('Basic Math Operations', () => {
  test('addition works correctly', () => {
    expect(2 + 2).toBe(4);
  });

  test('subtraction works correctly', () => {
    expect(5 - 3).toBe(2);
  });
});

describe('String Operations', () => {
  test('string concatenation', () => {
    expect('hello' + ' world').toBe('hello world');
  });

  test('string length', () => {
    expect('test'.length).toBe(4);
  });
});

describe('Array Operations', () => {
  test('array equality', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  test('array length', () => {
    expect([1, 2, 3, 4].length).toBe(4);
  });
});