export const html = (template) => {
  const body = document.createElement('body');
  body.innerHTML = template;

  if (body.childNodes.length > 1) {
    console.warn('Wrapper 태그 필요!')
  }
  return body.childNodes[0];
};
