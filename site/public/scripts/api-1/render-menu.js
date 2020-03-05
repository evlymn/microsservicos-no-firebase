const xhttpMenu = new XMLHttpRequest();

xhttpMenu.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("componente-menu").innerHTML = xhttpMenu.responseText;
  }
};

xhttpMenu.open("GET", "/render-menu", true);
xhttpMenu.send();
