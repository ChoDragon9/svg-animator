export const html = (template) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.innerHTML = template;

  if (svg.childNodes.length > 1) {
    console.warn('Wrapper 태그 필요!');
  }
  return svg.childNodes[0];
};
