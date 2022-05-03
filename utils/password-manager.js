const PasswordManager = () => {
  const password = 'hello there';
  let isVerified = false;
  let redirectTo = '';

  return {
    isVerified: () => isVerified,
    setVerified: (flag) => {
      isVerified = flag;
    },
    check: (inputPassword) => inputPassword === password,
    setRedirectPath: (path) => {
      redirectTo = path;
    },
    getRedirectPath: () => redirectTo,
    reset: () => {
      redirectTo = '';
      isVerified = false;
    },
  };
};

module.exports = PasswordManager();
