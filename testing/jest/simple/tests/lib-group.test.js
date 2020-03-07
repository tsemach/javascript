const lib = require('../src/lib');
const db = require('../src/db');
const mail = require('../src/mail');

describe('Absulute', () => {
  it('check positive number', () => {
    const result = lib.absolute(1);
  
    expect(result).toBe(1);
  });
  
  it('check negative number', () => {
    const result = lib.absolute(-1);
  
    expect(result).toBe(1);
  });
  
  it('check zero number', () => {
    const result = lib.absolute(0);
  
    expect(result).toBe(0);
  });
});

describe('Greet', () => {
  it('return geerting message', () => {
    const result = lib.greet('Mosh');

    // this test is too specrific and changing in one
    // character may failed the test
    expect(result).toBe('Welcome Mosh');

    // using regular expression may mitigate this.
    // as long the output containe Mosh we fine
    expect(result).toMatch(/Mosh/);
  });
});

describe('Currencies', () => {
  it('check supported currencies', () => {
    const result = lib.getCurrencies();
    
    // test should not be too specific nor too general

    // too general
    expect(result).toBeDefined();

    // too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    // ideal way
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
  });
});

describe('Product', () => {
  it('return product by id', () => {
    const result = lib.getProduct(1);

    // toBe check by memory location, this is too specific
    expect(result).toEqual({ id: 1, price: 10 });

    // by toMatchObject, not forcing all properies to match
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1 });

    // by toHavePropery, type of values is important
    expect(result).toHaveProperty('id', 1);
  });  
});

describe('Users', () => {
  it('thow execption if user if falsy', () => {
    // need to call with null, undefined, nan, '', 0, false  
    expect(() => { lib.registerUser(null) }).toThrow();

    // to go over all falsy arguments
    const args = [null, undefined, NaN, '', 0, false];

    args.forEach(a => {
      expect(() => { lib.registerUser(a) }).toThrow();
    })
  });

  it('should return object', () => {
    const result = lib.registerUser('Mosh');

    expect(result).toMatchObject({ username: 'Mosh' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('Discount (Mocking)', () => {
  it('apply 10% discount', () => {
    const order = { customerId: 1, totalPrice: 10 };    
    lib.applyDiscount(order);

    expect(order.totalPrice).toBe(9);
  });
});

describe('Mocking Function', () => {
  it('mocking simple function', () => {
    const mockFunction = jest.fn();

    mockFunction.mockReturnValue(1);
    const result = mockFunction();

    expect(result).toBe(1);
  });

  it('mocking function with resolved promise', async () => {
    const mockFunction = jest.fn();

    mockFunction.mockResolvedValue(1);

    const result = await mockFunction();

    expect(result).toBe(1);
  });

  it('mocking function with rejected promise', async () => {
    const mockFunction = jest.fn();

    try {
      mockFunction.mockRejectedValue(1);      
    }
    catch {
      const result = await mockFunction();

      expect(result).toBe(1);
    }
  });

  it('using mock function to test notifyCustomer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a'});
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1});

    expect(mail.send).toHaveBeenCalled();

    // check the arguments called with mail.send    
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });

});

