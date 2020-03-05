const xhttpTopo = new XMLHttpRequest();

xhttpTopo.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("componente-header").innerHTML = xhttpTopo.responseText;

  }
};

xhttpTopo.open("GET", "/render-topo", true);
xhttpTopo.send();
