var Type = require('../models/type');
var models = require('../models');

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false});
// Display type create form on GET.
exports.type_create_get = (req, res, next) => {
        // renders a type form
        res.render('forms/type_form', { title: 'Create Type',  layout: 'layouts/detail'});
};

// Handle type create on POST.
exports.type_create_post = [ urlencodedParser,
  [
    check('name', 'Name field cannot be empty and must be at least 3 characters long').exists().isLength({min: 3})
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      //return res.status(422).jsonp(errors.array());
      const notice = errors.array();
      res.render('forms/type_form', { title: 'Create Type', notice, layout: 'layouts/detail'});
    }else{
    // If a type gets created successfully, redirect to categories list
     models.Type.create({
           name: req.body.name 
       }).then(() => {
           res.redirect('/types');
     });
    }
  }
];

// Handle type delete on POST.
exports.type_delete_post = (req, res, next) => {
   
  models.Type.destroy({
      // find the category_id to delete from database
      where: {
        id: req.params.type_id
      }
    }).then(() => {
     // If an post gets deleted successfully, redirect to categories list
     res.redirect('/types');
    });
};

// Display category update form on GET.
exports.type_update_get = (req, res, next) => {
        
  models.Type.findById(
          req.params.type_id
  ).then((type) => {
         // renders a type form
         res.render('forms/type_form', { title: 'Update Type', type, layout: 'layouts/detail'});
    });
};

// Handle type update on POST.
exports.type_update_post = (req, res, next) => {

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
   ).then(() => { 
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
      ).then((types) => {
      // renders an employee list page
      res.render('pages/type_list', { title: 'Type List', types, layout: 'layouts/list'} );
      });
    };

// Display detail page for a specific category.
exports.type_detail = async(req, res, next) => {
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
        ).then((type) => {
        // renders an inividual type details page
        res.render('pages/type_detail', { title: 'Type Details', type, layout: 'layouts/detail'} );
        });
        
};