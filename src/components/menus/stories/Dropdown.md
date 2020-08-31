# Dropdown

- element-ui/dropdown 을 랩핑하여 구성

## props

### basic props

- trigger: dropdown 실행 이벤트
  - `valid options`: 'click' | 'hover'
  - `default`: 'click'

- iconClassName: 텍스트 앞에 노출되는 icons 설정
  - `default`: 'el-icon-s-flag'

- primaryLabel: 기본 텍스트 문구
  - `default`: ''

- menus: 노출 메뉴 항목 설정
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
