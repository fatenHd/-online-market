const functions = require('firebase-functions');

exports.sendOffer  = functions.database .ref(`/offers/{item.id}`) .onWrite(event => {
	const itemId = event.data.val().itam.id;
	const itemName = event.data.val().item.name;
}); 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
