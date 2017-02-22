import { AsyncStorage } from 'react-native';

let usersList;
let firebaseConfig;
let currentUser;

export const init = () => {

  // console.log('4. Init user-service...');

  // 1. ¿ Cuatos usuarios guardados ?
  AsyncStorage.getAllKeys().then((data) => {
    if (data) {
      AsyncStorage.getItem(data[0]).then((firebase) => {
        if (firebase) {
          firebaseConfig = JSON.parse(firebase);
          AsyncStorage.getItem('users').then((users) => {
            if (users) {
              usersList = JSON.parse(users);
              for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].uid === firebaseConfig.uid) {
                  currentUser = usersList[i];
                }
              }
              // 2. ¿ Que usario ha entrado y está en la lista ?
              if (findUser(firebaseConfig.uid, JSON.parse(users))) {
                // 3. Está en la lista. Establecer por como actual
                // console.log('3. Está en la lista. Establecer como actual');
                // currentUser = users[0];
                // console.log(users[0]);
              } else {
                // 4. No está registrado. Crear
                // console.log('4. No está registrado. Crear...');
                createUser(firebaseConfig);
              }
            } else {
              // console.log('No hay usuarios creados. Nuevo array');

              // init users array
              AsyncStorage.setItem('users', JSON.stringify([]));
              createUser(firebaseConfig);
            }
          });
        } else {
          // console.log('No existe configuración de Firebase');
        }
      });
    } else {
      // console.log('No hay datos');
    }
  });
}

export const createUser = (firebase) => {
  let user = {
    uid: firebase.uid,
    name: firebase.displayName,
    email: firebase.email,
    photoURL: null,
    movies: {},
    historial: [],
    lang: 'es',
    allowExitApp: true,
  };

  AsyncStorage.getItem('users').then(usersArray => {
    let users = JSON.parse(usersArray);

    users.push(user);

    AsyncStorage.setItem('users', JSON.stringify(users));
  });

  init();

}

export const findUser = (uid, users) => {

  for (let i = 0; i < users.length; i++) {
    if (users[i].uid === uid) {
      return true;
    }
  }

  return false;
}

export const updateUser = (data) => {
  AsyncStorage.getItem('users').then((usersList) => {
    let users = JSON.parse(usersList);

    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === currentUser.uid) {
        users[i] = null;
        users[i] = data;
      }
    }

    AsyncStorage.setItem('users', JSON.stringify(users));

  });

}

export const updateField = (field, data) => {
  AsyncStorage.getItem('users').then((usersList) => {
    let users = JSON.parse(usersList);

    for (let i = 0; i < users.length; i++) {
      if (users[i].uid === currentUser.uid) {
        users[i][field] = data;
      }
    }

    AsyncStorage.setItem('users', JSON.stringify(users));
  });

}

export const setCurrentUser = (user) => {
  currentUser = user;
}

export const getCurrentUser = () => {
  return currentUser;
}

export const getUsers = () => {
  return usersList;
}
