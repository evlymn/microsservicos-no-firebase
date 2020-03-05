document.addEventListener("DOMContentLoaded", async function() {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword("teste@emendes.com", "123456");

  if (user) {
    const idToken = await firebase.auth().currentUser.getIdToken();
    const xhttpFooter2 = new XMLHttpRequest();
    xhttpFooter2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("componente-footer").innerHTML =
          xhttpFooter2.responseText;
      }
    };
    xhttpFooter2.open("GET", "/render-footer", true);
    xhttpFooter2.setRequestHeader("idToken", idToken);
    xhttpFooter2.send();
  }
});
