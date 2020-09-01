[![Build Status](https://travis-ci.org/nonoll/todo-app.svg?branch=main)](https://travis-ci.org/nonoll/todo-app)
[![Heroku](https://heroku-badge.herokuapp.com/?app=nonoll-todo-app&style=flat)](https://nonoll-todo-app.herokuapp.com)

# Todo App

- 할일을 등록 관리하는 웹 어플리케이션 구현

* * *

## 1. 개발 전략

### 1.1. 구현 요건 판단

- 진행 목표
  - git issue / milestone / project 활용할 것
  - 레퍼런스 분석 > 구현 요건 개발 > Application 개발

### 1.2. 레퍼런스 분석

- [관련 레퍼런스 분석 #3](https://github.com/nonoll/todo-app/issues/3)
- 단순한 형태의 리스트 처리와 모달 형태의 할일을 확인 / 추가하는 형태로 구성하기로 결정

### 1.3. 프레임워크 선정

- 다양한 프레임워크가 있으나 실무에서는 vue 로 주로 사용하여, Vue(composition api) + Typescript 기반으로 구성하기로 결정

### 1.4. 구현 단계

- 유닛 테스트
  - ui component 의 경우 unit test 를 storybook 으로 구현하며 갈음

- 컴포넌트 구현
  - element-ui 를 베이스로 하여, 기능 단위로 분리하여 구현 진행

- 상수 정의
  - 되도록 데이터와 물리는 값들은 상수로 정의하여, 코드 구현시 안정성을 높이려 노력함

* * *

## 2. 결과물

### 2.1. 폴더 구조

```bash
├── .dev-tools                                            # 개발용 리소스 관리
│
├── .storybook                                            # storybook config
│
├── docs                                                  # storybook build
│
├── public                                                # public
│
├── src
│   ├── @types                                            # 프로젝트내 공용 *.d.ts 관리
│   │
│   ├── assets                                            # assets - styles 만 활용
│   │
│   ├── components                                        # components
│   │
│   ├── composables                                       # 별도 구성한 composables 관리
│   │
│   ├── constants                                         # 상수 관리
│   │
│   ├── libs                                              # 별도 구성한 library 코드 관리
│   │   ├── format                                        ## 마감일 표현을 위한 format 메소드 구성
│   │   ├── functions                                     ## model 에 사용할 uuidv4 메소드 구성
│   │   └── web                                           ## localStorage 처리용 class - 개인적으로 구성해두었던 코드 활용
│   │
│   ├── models                                            # backend <-> data <-> ui component 간 데이터 처리 코드 관리 용도
│   │   ├── core                                          ## 기본 Model 규격 구성
│   │   ├── storage                                       ## localStorage 저장, 파싱을 목적으로 구성하였으나 불필요하게 느껴져 타입만 정의
│   │   └── todo                                          ## todoItem 처리용 model 구성
│   │
│   ├── router                                            # router
│   │
│   ├── services                                          # service 개념의 기능들을 관리할 용도
│   │
│   ├── store                                             # store - store 활용의 필요성은 느끼지 못하여 기본만 구성
│   │
│   └── views                                             # views
│       ├── error                                         ## 정의되지 않은 url 진입시 에러화면 처리
│       └── main                                          ## todo app 화면
│
├── .eslintrc.js                                          # eslint - typescript interface ' I ' prefix 허용 처리, 개인적인 습관으로 허용
│
├── .travis.yml                                           # travis 를 이용한, build 스크립트 구성 / 배포 처리
│
└── server.js                                             # express - heroku 배포용
```

* * *

### 2.2. Storybook

- [https://nonoll.github.io/todo-app](https://nonoll.github.io/todo-app)

### 2.3. Heroku

- [https://nonoll-todo-app.herokuapp.com](https://nonoll-todo-app.herokuapp.com)

### 2.4. 실행 방법

- 기본 Vue CLI 를 활용하여 환경 구성, Vue(composition api) + Typescript

- install

```bash
$ npm i
```

- 실행

```bash
$ npm run serve
```

- **실행 script**
  - `postinstall`: npm install 후, git-hooks 설정 처리
  - `dev:git-hooks`: git-hooks 설정 처리, 커밋시 브랜치명을 지정 하도록 구성
  - `storybook`: storybook 실행
  - `build:storybook`: storybook build - github page 에 등록하기 위해 편의상 `-o /docs` 로 처리
  - `deploy:test`: 배포전 test 실행
  - `deploy:build`: 배포용 build 실행
  - `deploy:start`, `start`: 배포후 node server 실행

* * *

## 3. 배포

- travis 를 활용하여 main branch 를 타깃으로 배포 되도록 구성
- storybook 은 github page 에 추가하여 확인 할 수 있게 구성
- todo app 은 heroku 에 배포 되도록 구성

## 4. 미비한 사항

- unit test 코드
- storybook doc 작성
