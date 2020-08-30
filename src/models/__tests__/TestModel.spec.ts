import { testModel } from '../TestModel';

describe('# models/TestModel Spec Test', () => {

  beforeEach(() => {});

  it('# TestModel 는 function 이다.', () => {
    const type = typeof testModel === 'function';
    expect(type).toEqual(true);
  })

})
