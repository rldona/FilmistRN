import { AsyncStorage } from 'react-native';

let users = [];
let firebaseConfig;
let currentUser;

export const init = () => {

  // 1. ¿ Cuatos usuarios guardados ?

  AsyncStorage.getAllKeys().then((data) => {

    // AsyncStorage.getItem('users').then((users) => {
    //   console.log(JSON.parse(users));
    // });

    if (data) {

      AsyncStorage.getItem(data[0]).then((firebase) => {


        if (firebase) {

          firebaseConfig = JSON.parse(firebase);

          AsyncStorage.getItem('users').then((users) => {

            console.log(users);

            if (users) {

              console.log(JSON.parse(users));

              // 2. ¿ Que usario ha entrado y está en la lista ?
              if (findUser(firebaseConfig.uid, JSON.parse(users))) {
                // 3. Está en la lista. Establecer por como actual
                console.log('3. Está en la lista. Establecer por como actual');
                currentUser = users[i];
              } else {
                // 4. No está registrado. Crear
                console.log('4. No está registrado. Crear...');
                createUser(firebaseConfig);
              }

            } else {

              console.log('No hay usuarios creados. Nuevo array');

              // init users array
              AsyncStorage.setItem('users', JSON.stringify([]));

            }

          });

        } else {

          console.log('No existe configuración de Firebase');

        }

      });

    } else {

      console.log('No hay datos');

    }

  });

}

export const createUser = (firebase) => {

  let user = {
    uid: firebase.uid,
    name: firebase.displayName,
    email: firebase.email,
    photoURL: null,
    lists: [
      {
        saved: []
      },
      {
        views: []
      },
      {
        favorite: []
      }
    ]
  };

  console.log('new user');

  AsyncStorage.getItem('users').then(usersArray => {
    let users = JSON.parse(usersArray);
    users.push(user);
    AsyncStorage.setItem('users', JSON.stringify(users));
  });

}

export const findUser = (uid, users) => {

  for (let i = 0; i < users.length; i++) {
    if (users[i].uid === uid) {
      return true;
    }
  }

  return false;

}

export const updateUser = (field, data) => {
  console.log(field);
  console.log(currentUser);
  // console.log(data);

  AsyncStorage.getItem('users').then((usersArray) => {

    let users = JSON.parse(usersArray);

    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === currentUser.uid) {
        users[i][field] = data;
      }
    }

    console.log(users);

    AsyncStorage.setItem('users', JSON.stringify(users));

  });

}

export const deleteUser = (uid) => {

}

/// ?? ///

export const setCurrentUser = (user) => {
  currentUser = user;
}

export const getCurrentUser = () => {
  return currentUser;
}

export const getUser = () => {
  return firebase.auth().currentUser;
}
