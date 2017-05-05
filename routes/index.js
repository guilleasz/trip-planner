const router = require('express').Router();
const Promise = require('sequelize').Promise;
const { Hotel, Activity, Restaurant } = require('../models');

router.get('/', (req, res) => {
  Promise.all([Hotel.findAll(), Activity.findAll(), Restaurant.findAll()])
  .then(([hotels, activities, restaurants]) => {
    res.render('index', { hotels, activities, restaurants });
  });
});

module.exports = router;
