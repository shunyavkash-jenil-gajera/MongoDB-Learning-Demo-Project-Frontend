// Additional auth service functions if needed
export const getStoredToken = () => {
  const token = null; // Token retrieval handled by Redux
  if (token) {
    return token;
  }
  return null;
};

export const clearStoredToken = () => {
  // Token clearing handled by Redux
  return null;
};
