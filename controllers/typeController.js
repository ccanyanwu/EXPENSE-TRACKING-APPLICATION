var Type = require('../models/type');
var models = require('../models');

// Display type create form on GET.
exports.type_create_get = function(req, res, next) {
        // create ype GET controller logic here 
        
        // renders a type form
        res.render('forms/type_form', { title: 'Create Type',  layout: 'layouts/detail'});
};

// Handle type create on POST.
exports.type_create_post = function(req, res, next) {
     // create type POST controller logic here
     
     // If a type gets created successfully, we just redirect to categories list
     // no need to render a page
      models.Type.create({
            name: req.body.name 
        }).then(type => {
          res.json({
              success: 'Type Created Successfully',
              type: type
          });
      }).catch(error => {
          console.log("There was an error: " + error);
          res.status(404).send(error);
      })/*.then(function() {
            console.log(`Type created successfully`);
           // check if there was an error during type creation creation
            res.send('/blog/types');
      });*/
};

// Handle type delete on POST.
exports.type_delete_post = function(req, res, next) {
   
  models.Type.destroy({
      // find the category_id to delete from database
      where: {
        id: req.params.type_id
      }
    }).then(type => {
      res.json({
          success: 'type Deleted Successfully',
          type: type
      });
  }).catch(error => {
      console.log("There was an error: " + error);
      res.status(404).send(error);
  })/*.then(function() {
     // If an post gets deleted successfully, we just redirect to categories list
     // no need to render a page
     res.redirect('/types');
      
      
      console.log("Type deleted successfully");
    });*/
};

// Display category update form on GET.
exports.type_update_get = function(req, res, next) {
        
  models.Type.findById(
          req.params.type_id
  ).then(function(type) {
         // renders a type form
         res.render('forms/type_form', { title: 'Update Type', type: type, layout: 'layouts/detail'});
         console.log("type update get successful");
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
   ).then(type => {
    res.json({
        success: 'type updated Successfully',
        type: type
    });
}).catch(error => {
    console.log("There was an error: " + error);
    res.status(404).send(error);
})/*.then(function() { 
          // If a type gets updated successfully, we just redirect to types list
          res.redirect("/types");  
          console.log("type updated successfully");
    });*/
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
      ).then(type => {
        res.json({
            success: 'type list',
            type: type
        });
    }).catch(error => {
        console.log("There was an error: " + error);
        res.status(404).send(error);
    })/*.then(function(types) {
      // renders an employee list page
      let total = types.length;
      console.log("rendering type list");
      res.render('pages/type_list', { title: 'Type List', total:total, types: types, layout: 'layouts/list'} );
      console.log(" list renders successfully");
      });*/
    };

// Display detail page for a specific category.
exports.type_detail = async function(req, res, next) {
  //const expenses = await models.Expense.findAll();

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
        ).then(type => {
          res.json({
              success: 'type detail',
              type: type
          });
      }).catch(error => {
          console.log("There was an error: " + error);
          res.status(404).send(error);
      })/*.then(function(type) {
        // renders an inividual type details page
        res.render('pages/type_detail', { title: 'Type Details', type:type, layout: 'layouts/detail'} );
        console.log("Category deteials renders successfully");
        });*/
        
};