var Type = require('../models/type');
var models = require('../models');

// Display type create form on GET.
exports.type_create_get = function(req, res, next) {
        // renders a type form
        res.render('forms/type_form', { title: 'Create Type',  layout: 'layouts/detail'});
};

// Handle type create on POST.
exports.type_create_post = function(req, res, next) {
     // If a type gets created successfully, redirect to categories list
      models.Type.create({
            name: req.body.name 
        }).then(function() {
            res.redirect('/types');
      });
};

// Handle type delete on POST.
exports.type_delete_post = function(req, res, next) {
   
  models.Type.destroy({
      // find the category_id to delete from database
      where: {
        id: req.params.type_id
      }
    }).then(function() {
     // If an post gets deleted successfully, redirect to categories list
     res.redirect('/types');
    });
};

// Display category update form on GET.
exports.type_update_get = function(req, res, next) {
        
  models.Type.findById(
          req.params.type_id
  ).then(function(type) {
         // renders a type form
         res.render('forms/type_form', { title: 'Update Type', type: type, layout: 'layouts/detail'});
    });
};

// Handle type update on POST.
exports.type_update_post = function(req, res, next) {

  models.Type.update(
  // Values to update
      {
          name: req.body.name,
      },
    { // Clause
          where: 
          {
              id: req.params.type_id
          }
      } 
   ).then(function() { 
          // If a type gets updated successfully, redirect to types list
          res.redirect("/types");
    });
};

// Display list of all Types.
exports.type_list = (req, res, next) => {
  
      models.Type.findAll({
        include: [
          {
            model: models.Expense,
            attributes: ['id', 'details']
          }
        ]
      }
      ).then(function(types) {
      // renders an employee list page
      let total = types.length;
      res.render('pages/type_list', { title: 'Type List', total:total, types: types, layout: 'layouts/list'} );
      console.log(" list renders successfully");
      });
    };

// Display detail page for a specific category.
exports.type_detail = async function(req, res, next) {
        // find a type by ID
        models.Type.findById(
                req.params.type_id,
                {
                    include: [
                     {
                          model: models.Expense,
                          attributes: ['id', 'details', 'status','amount']
                    }
                ]
              }
        ).then(function(type) {
        // renders an inividual type details page
        res.render('pages/type_detail', { title: 'Type Details', type:type, layout: 'layouts/detail'} );
        });
        
};