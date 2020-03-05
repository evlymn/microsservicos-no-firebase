import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

const corsHandler = cors({ origin: true });
 
admin.initializeApp(functions.config().firebase);

export const renderFooter = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {

    const idToken = request.query.idToken
      ? request.query.idToken
      : (request.header('idToken') as string);

    let decodedIdToken;
    try {
      decodedIdToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      response.status(400).send('idToken inválido');
    }
    if (decodedIdToken && decodedIdToken.exp < 3) {
      const docSnapshot = await admin
        .firestore()
        .collection('usuarios')
        .doc(decodedIdToken.uid)
        .get();

      const usuario = docSnapshot.data() as any;
      const html = `
      <img src="${usuario.avatar}" >
        <h1>Olá ${usuario.name}</h1>`;
      response.send(html);
    } else {
      response.status(400).send('Usuário inválido');
    }
  });
});
