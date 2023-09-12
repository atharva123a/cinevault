const createTokenUser = (user) => {
  const { id, email } = user;
  return { id, email };
};

export { createTokenUser };
