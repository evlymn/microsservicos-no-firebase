const xhttpImagens = new XMLHttpRequest();

xhttpImagens.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const imagens = JSON.parse(xhttpImagens.responseText);
    imagens.forEach(element => {
      const span = document.createElement('span');
      span.innerHTML = element.titulo;
      const img = document.createElement('img');
      img.src = element.url;
      const div = document.createElement('div');
      div.appendChild(img);

      if (element.titulo) {
        div.appendChild(span);
      }
      document.getElementById('componente-imagens').appendChild(div);
    });
  }
};

xhttpImagens.open('GET', '/listar-imagens', true);
xhttpImagens.send();
