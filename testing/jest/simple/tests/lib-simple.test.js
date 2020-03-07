const lib = require('../src/lib');

test('Absulute - check positive number', () => {
  const result = lib.absolute(1);

  expect(result).toBe(1);
});

test('Absulute - check negative number', () => {
  const result = lib.absolute(-1);

  expect(result).toBe(1);
});

test('Absulute - check zero number', () => {
  const result = lib.absolute(0);

  expect(result).toBe(0);
});