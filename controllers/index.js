const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./html/home-routes');
// const dashboardRoutes = require('./html/dashboard-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
