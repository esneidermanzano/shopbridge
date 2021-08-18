import firebase from 'firebase';

/*  =============== Firebase API
To make the test more realistic, firebase api is 
implemented in this project searching, saving and 
deleting data is handled with functions that interact with firebase
*/

var firebaseConfig = {
   apiKey: 'AIzaSyBBiUABv8ZOPk9r9TuGtByQtEexHJ8lHhk',
   authDomain: 'shopbapi-2cbf8.firebaseapp.com',
   databaseURL: 'https://shopbapi-2cbf8-default-rtdb.firebaseio.com',
   projectId: 'shopbapi-2cbf8',
   storageBucket: 'shopbapi-2cbf8.appspot.com',
   messagingSenderId: '1088906630142',
   appId: '1:1088906630142:web:c92ba724acb3c5d211a6af',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig);
}

export const firebaseApi =
   'https://shopbapi-2cbf8-default-rtdb.firebaseio.com/items.json';

export async function saveProduct(data) {
   const result = await fetch(
      'https://shopbapi-2cbf8-default-rtdb.firebaseio.com/items.json',
      {
         method: 'POST',
         body: JSON.stringify(data),
      }
   );
   return result;
}

export async function uploadImage(image) {
   try {
      var storage = firebase.storage();
      const storageRef = await storage.ref();
      const fileRef = storageRef.child(
         `/images/${new Date().getTime() + image.name}`
      );

      const uploadTaskSnapshot = await fileRef.put(image);
      const imageUrl = await uploadTaskSnapshot.ref.getDownloadURL();
      return imageUrl;
   } catch (err) {
      console.log(err.message);
      return null;
   }
}

export async function updateItem(data, key) {
   try {
      await firebase.database().ref('items').child(key).update(data);
      return true;
   } catch (err) {
      console.log('Error with firebase: ' + err.message);
      return false;
   }
}

export async function deleteItem(key) {
   try {
      await firebase.database().ref('items').child(key).remove();
      return true;
   } catch (err) {
      console.log(err.message);
      return false;
   }
}
