module.exports = () => (id, data, params) => {
  console.log(id, data, params);
  return Promise.resolve({ data, params });
  
};
