let loadmorebutton = document.getElementById("loadmorebutton");
let n = 0;
let hasNextMark = true;
let loading = false
loadmorebutton.onclick = loadmore;
function loadmore() {
  if (!hasNextMark) {return}
  if (loading === true){return}
  let ul = document.querySelector("ul");
  let request = new XMLHttpRequest();

  request.open("GET", `./loadmore/page-${n + 1}.JSON`);
  request.onload = function() {
    loading = false
    n++;
    let response = request.responseText;
    let data = window.JSON.parse(response);
    for (var i = 0; i < data.content.length; i++) {
      let liString = `
                <li><img data-mark="${data.content[i].url}" alt="${data.content[i].alt}">
                <h3>${data.content[i].h3}</h3>
                <p>${data.content[i].p}</p>
                </li>
                `;
      ul.insertAdjacentHTML("beforeend", liString);
      if (data.hasNext === false) {
        hasNextMark = false;
        loadmorebutton.textContent = " 没有更多了";
      }
    }
  };
  request.send();
  loading = true
}

window.onscroll = function() {
  if (elementInviewport(loadmorebutton) === true) {
    if (hasNextMark) {
      loadmore();
    }
  }
  let images = document.querySelectorAll('img[data-mark]')
  console.log(images)
  for (let i = 0; i < images.length; i++) {
    if (elementInviewport(images[i]) === true) {
        images[i].src = images[i].getAttribute('data-mark');
        images[i].removeAttribute('data-mark');
    }
  }
};
function elementInviewport(element) {
  let elementTop = element.getBoundingClientRect().top;
  let clientheight = document.documentElement.clientHeight;
  if (elementTop < clientheight) {
    return true;
  } else {
    return false;
  }
}
