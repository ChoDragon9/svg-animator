export const patch = (fragmentDOM, actualDOM) => {
  const fragmentDOMChildren = toChildren(fragmentDOM);
  const actualDOMChildren = toChildren(actualDOM);

  const childrenLength = Math.max(fragmentDOMChildren.length, actualDOMChildren.length);

  range(childrenLength)
    .forEach((index) => {
      const fragment = fragmentDOMChildren[index];
      const actual = actualDOMChildren[index];

      if(isNodeRemoved(fragment)) {
        actualDOM.removeChild(actual);
      } else if (isNodeChanged(fragment, actual)) {
        actualDOM.replaceChild(fragment, actual);
      } else if (isTextChanged(fragment, actual)) {
        actualDOM.replaceChild(fragment, actual);
      } else {
        if (isAttributeChanged(fragment, actual)) {
          patchAttributes(fragment, actual);
        }
        patch(fragment, actual);
      }
    });
};

const isNodeChanged = (fragmentDOM, actualDOM) => {
  const fragmentDOMChildren = toChildren(fragmentDOM);
  const actualDOMChildren = toChildren(actualDOM);
  return fragmentDOM.nodeName !== actualDOM.nodeName ||
    fragmentDOMChildren.length !== actualDOMChildren.length;
};
const isNodeRemoved = (fragmentDOM) => fragmentDOM === undefined;
const isTextChanged = (fragmentDOM, actualDOM) => {
  if (isTextNode(fragmentDOM.nodeName) && isTextNode(actualDOM.nodeName)) {
    return fragmentDOM.textContent !== actualDOM.textContent;
  } else {
    return false;
  }
};

const isAttributeChanged = (fragmentDOM, actualDOM) => {
  if (isTextNode(fragmentDOM) || isTextNode(actualDOM)) {
    return false;
  }

  const {attributes: fragAttrs} = fragmentDOM;
  const {attributes: actualAttrs} = actualDOM;

  if (fragAttrs.length !== actualAttrs.length) {
    return true;
  }
  return from(fragAttrs).some((fragAttr, index) => {
    const actualAttr = actualAttrs[index];
    return fragAttr.nodeName !== actualAttr.nodeName ||
      fragAttr.textContent !== actualAttr.textContent;
  });
};

const patchAttributes = (fragmentDOM, actualDOM) => {
  from(actualDOM.attributes)
    .forEach((attr) => {
      actualDOM.removeAttributeNode(attr);
    });
  from(fragmentDOM.attributes)
    .forEach((attr) => {
      if (attr.nodeName === 'value') {
        actualDOM.value = attr.textContent;
      } else {
        actualDOM.setAttributeNode(attr.cloneNode());
      }
    });
};

const toChildren = node => from(node.childNodes);
const isTextNode = node => node.nodeName === '#text';

const from = (...args) => Array.from(...args);
const range = (length) => from({length}, (_, index) => index);
