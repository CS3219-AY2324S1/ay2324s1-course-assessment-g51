const thirtySecondsAgo = () => {
  const now = new Date();
  const validTimeWindow = 30000;
  return new Date(now.getTime() - validTimeWindow);
};

export { thirtySecondsAgo };
