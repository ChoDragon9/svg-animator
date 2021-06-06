export const append = (parentNode, childNode) => {
  parentNode.appendChild(childNode)
};

export const query = (parentNode, selector) => {
  return parentNode.querySelector(selector)
};

export const events = (node, options) => {
  Object
    .entries(options)
    .forEach(([eventName, listener]) => {
      node.addEventListener(eventName, listener)
    })
};

export const replaceWith = (oldNode, newNode) => {
  oldNode.replaceWith(newNode)
};
