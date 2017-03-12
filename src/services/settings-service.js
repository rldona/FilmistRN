import * as firebase from 'firebase';

let options = {};

export const init = () => {
  options.lang = 'es';
  options.allowExitApp = false;
  options.avatar = null;
}

export const reset = () => {
  options = {};
}

export const getOptions = () => {
  return options;
}

export const setOption = (option, value) => {
  options[option] = value;
}

// Promise type

// export const promiseTest = () => {
//   let error = false;

//   return new Promise((resolve, reject) => {
//     if(error) {
//       reject({ error: 'error' });
//     }
//     resolve({ error: 'success' });
//   });
// }

// settingsService.promiseTest().then(() => {
//   alert('ok, redirect to home');
// }).catch(() => {
//   alert('error');
// });
