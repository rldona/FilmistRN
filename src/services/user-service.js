let currentUser;

export const setCurrentUser = (user) => {
  currentUser = user;
}

export const getCurrentUser = () => {
  return currentUser;
}
