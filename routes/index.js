var models  = require('../models');
var express = require('express');
var router  = express.Router();

// router.get('/', function(req, res) {
//   models.User.findAll({
//     include: [ models.Task ]
//   }).then(function(users) {
//     res.render('pages/index', {
//       title: 'Sequelize: Express Example',
//       users: users,
//       page: 'Home'
//     });
//   });
// });

router.get('/', function(req, res) {
   res.redirect("/blog");
});
 
module.exports = router;
