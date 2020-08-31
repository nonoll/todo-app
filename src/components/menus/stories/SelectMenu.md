# SelectMenu

- element-ui/select 을 랩핑하여 구성

## props

### basic props

- options: option 항목 설정
  - `default`: []
  - 데이터 규격
  
  ```javascript
  {
    label: string | unknown,
    value: unknown
  }
  ```

## events

- change: 선택 변경 시점
  - 선택된 menu 값 전달
