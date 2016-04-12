module.exports = () => async({ email, template, vars }, params) => {
  return { email, template, vars, params };
};
