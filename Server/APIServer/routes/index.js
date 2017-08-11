module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'hello index!'});
  });

  app.use('/datas', require('./data')); // 在所有data路由前加/datas
  app.use('/users', require('./user'))
};