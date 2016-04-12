module.exports = () => async({ message }, { recipientId }) => {
  return { recipientId, message };
};
