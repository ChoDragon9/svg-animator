import {component} from '../../dragonjs-component/core/component.js';
import {events, query, replaceWith} from '../../dragonjs-component/core/helper/dom.js';
import {clear, createNewKey} from '../shared/helper.js';
import {createGeometry} from '../store/mutation.js';
import {SketchbookComponent} from './SketchbookComponent.js';

export const MainComponent = component(({html}) => {
  const actions = {
    addRect: () => {
      createGeometry(
        createNewKey(),
        [
          [100, 100],
          [100, 200],
          [200, 200],
          [200, 100]
        ]
      );
    },
    addTriangle: () => {
      createGeometry(
        createNewKey(),
        [
          [150, 100],
          [100, 200],
          [200, 200]
        ]
      );
    },
    clearAll: () => {
      clear();
      location.reload();
    },
  };
  const render = () => {
    const dom = html(`<div class="container">
      <div class="panel">
        <button class="rect">사각형 추가</button>
        <button class="triangle">삼각형 추가</button>
        <button class="clear">브라우저 저장소 모두 삭제</button>
        <ul class="guide">
          <li>모양 추가 후 드래그 가능</li>
          <li>라인 클릭 시 포인트 추가</li>
          <li>배경 클릭 4번으로 사각형 추가</li>
          <li>배경 클릭으로 사각형 추가시, ESC로 생성 취소</li>        
        </ul>
      </div>
      <sketchbook></sketchbook>
    </div>`);

    events(query(dom, '.rect'), {
      click: actions.addRect,
    });

    events(query(dom, '.triangle'), {
      click: actions.addTriangle,
    });

    events(query(dom, '.clear'), {
      click: actions.clearAll,
    });

    replaceWith(
      query(dom, 'sketchbook'),
      SketchbookComponent()
    );

    return dom;
  };

  return render;
});
