const createTokenUser = (user) => {
  const tokenUser = { id: user.id, email: user.email, role: user.role };
  return tokenUser;
};

module.exports = {
    createTokenUser
}
