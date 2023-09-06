import { describe, expect, test } from 'vitest';
import { loginValidator } from '.'

describe('main', () => {
  test('test all empty', () => {
    const result = loginValidator({
      userEmail: '',
      password: '',
      confirmPassword: '',
      inputAnother: '',
    })
    expect(result).toBe(false);
  });
  
  test('test all object', () => {
    const result = loginValidator({
    })
    expect(result).toBe(false);
  });
  
  test('only user email but not email', () => {
    const result = loginValidator({
      userEmail: 'this is user name',
      password: '',
      confirmPassword: '',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });
  
  test('only user email but end with gmail', () => {
    const result = loginValidator({
      userEmail: '1234@hotmail.com',
      password: '',
      confirmPassword: '',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });
  
  
  test('no password only', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: '',
      confirmPassword: '',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });
  
  test('password too short', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'hello',
      confirmPassword: '',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });
  
  test('password only number', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: '123456824234',
      confirmPassword: '123456824234',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('password only lowercase', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'abcsdfadsfsafdasfaf',
      confirmPassword: 'abcsdfadsfsafdasfaf',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('password only uppercase', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'ABCSDFADSFSAFDASFAF',
      confirmPassword: 'ABCSDFADSFSAFDASFAF',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('password lack of uppercase', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'abcsdfadsfsafdasfaf12342412343124',
      confirmPassword: 'abcsdfadsfsafdasfaf12342412343124',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('password lack of lowercase', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'ABCSDFADSFSAFDASFAF12342412343124',
      confirmPassword: 'ABCSDFADSFSAFDASFAF12342412343124',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('password lack of number', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'ABCSDFADSFSAFDASFAFasdfadsfdkasfjadskfj',
      confirmPassword: 'ABCSDFADSFSAFDASFAFasdfadsfdkasfjadskfj',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });


  test('confirm password is empty', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'testingHellothisIsGood1234',
      confirmPassword: '',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('confirm password is not match', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'testingHellothisIsGood1234',
      confirmPassword: 'testingHellothisIsGood12345',
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });


  test('enum is not include', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'testingHellothisIsGood1234',
      confirmPassword: 'testingHellothisIsGood1234',
      inputAnother: 'cool',
    })
    expect(result).toBe(false);
  });

  test('test lack of email', () => {
    const result = loginValidator({
      password: 'testingHellothisIsGood1234',
      confirmPassword: 'testingHellothisIsGood1234',
      inputAnother: 'cool',
    })
    expect(result).toBe(false);
  });

  test('test lack of password', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      confirmPassword: 'testingHellothisIsGood1234',
      inputAnother: 'cool',
    })
    expect(result).toBe(false);
  });

  test('test lack of description', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'testingHellothisIsGood1234',
      confirmPassword: 'testingHellothisIsGood1234',
      inputAnother: 'foo',
    })
    expect(result).toBe(true);
  });

  test('test description type error', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'testingHellothisIsGood1234',
      confirmPassword: 'testingHellothisIsGood1234',
      description: 1234,
      inputAnother: 'foo',
    })
    expect(result).toBe(false);
  });

  test('all done', () => {
    const result = loginValidator({
      userEmail: '1234@gmail.com',
      password: 'testingHellothisIsGood1234',
      confirmPassword: 'testingHellothisIsGood1234',
      description: 'testing',
      inputAnother: 'foo',
    })
    expect(result).toBe(true);
  });
})

