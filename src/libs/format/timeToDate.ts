/**
 * 시간 문자열을 date 객체로 변환
 * @memberof module:format
 * @function
 * @param {String} time 시간 문자열
 * @param {String} [delimiter=":"] 구분자
 * @returns {Date}
 * @example
import { timeToDate } from '@/libs/format';
console.log(timeToDate('06:37')); // Tue Sep 01 2020 06:37:01 GMT+0900 (대한민국 표준시)
 */
export const timeToDate = (time: string, delimiter: string = ':'): Date => {
  const date = new Date()
  const [hh, mm] = time.split(delimiter)
  date.setHours(parseInt(hh, 10))
  date.setMinutes(parseInt(mm, 10))
  return date
}
