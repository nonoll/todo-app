import { uuidv4 } from '..';

describe('# libs/functions/uuidv4 Spec Test', () => {

  it('# uuidv4 는 function 이다.', () => {
    const type = typeof uuidv4 === 'function';
    expect(type).toEqual(true);
  })

  it('# uuidv4 는 문자열을 반환한다.', () => {
    expect(typeof uuidv4()).toEqual(typeof 'string');
  })

  it('# 반환 결과는 length:36, - 문자열을 4개 포함한다.', () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    const length = pattern.length
    const delimiters = pattern.split('-').length
    const result = uuidv4()

    expect(result.length).toEqual(length);
    expect(result.split('-').length).toEqual(delimiters);
  })

})
