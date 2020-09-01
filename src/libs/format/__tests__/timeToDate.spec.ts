import { timeToDate } from '..';

describe('# libs/format/timeToDate Spec Test', () => {

  it('# timeToDate 는 function 이다.', () => {
    const type = typeof timeToDate === 'function';
    expect(type).toEqual(true);
  })

  it('# 시간 문자열을 입력하는 Date 객체로 반환한다.', () => {
    const time = '06:37'
    expect(timeToDate(time) instanceof Date).toEqual(true);
  })

  it('# demiter 기준으로 시간 문자열을 파싱하여 Date 객체로 반환한다.', () => {
    const time = '06^37'
    const delimiter = '^'
    expect(timeToDate(time, delimiter) instanceof Date).toEqual(true);
  })

  it('# 입력값이 올바르지 않으면, Invalid Date 에러가 발생한다.', () => {
    const time = '06:37'
    const delimiter = '^'
    try {
      timeToDate(time, delimiter)
    } catch (e) {
      expect(e.message).toEqual('Invalid Date');
    }
  })

})
