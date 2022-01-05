export const getUser = (state) => {
  if (state && state.user && state.user.user) {
    return Object.keys(state.user.user).length > 0 ? state.user.user : null;
  }
  return null;
};
