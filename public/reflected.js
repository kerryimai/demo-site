const [_, imgSource] = window.location.search.substring(1).split('=');

document.getElementById('img').innerHTML = `
  <img src="${decodeURIComponent(imgSource)}" />
`
