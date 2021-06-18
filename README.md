## 할 일
### 기존 작업 가져오기
1. ~~component 펫 프로젝트 클론~~
   - https://chodragon9.github.io/dragonjs/src/component/2020-08-component/
1. ~~eslint 설정~~
1. ~~sketchbook 펫 프로젝트 마이그레이션~~
   - https://github.com/ChoDragon9/component/tree/master/src/apps/sketchbook
1. ~~모양 컴포넌트 추가~~

### Phase 1 - Prototype
- 각 모듈 개발
  - SketchBook: 도형 그리는 스케치북
  - Timeline: 애니메이션 타임라인 설정
  - Playback: 상태 기반으로 애니메이션 렌더링
  - Animator Store: 상태 저장
- SketchBook
  - SketchBook<=>SketchBook Store 형태로 변경
  - x, y, ref 저장
- Timeline
  - Timeline<=>Timeline Store 형태로 변경
  - Time, Name 저장
- Playback
  - Playback<=>Playback Store 형태로 변경
  - currentTime 저장
- Animator Store
  - SketchBook Store, Timeline Store 조합 테이블 개발
    - {name, ref, snapshot: Map<Time, [x, y]>}

### Phase 2
1. Draggable 모듈 개발
   - SketchBook에 적용된 Draggable 기능 모듈화
1. SketchBook
   - Rotate / Scale 조정
1. Timeline
   - 드래그 UI 개선

## 목표
- SVG 애니메이션 제작 도구 만들기

### 진짜 목표
커피 레시피를 SVG 애니메이션으로 만들기

![](https://blog.kakaocdn.net/dn/cufi1T/btqJPBCIVbf/3XH4k5H4Eg37oZ5ygrvjmK/img.gif)

![](https://i.pinimg.com/originals/8f/ab/a0/8faba0c528abb711eca46a7e70674c97.gif)
