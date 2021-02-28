var Category = require('../models/category');
var models = require('../models');

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false});

// Display category create form on GET.
exports.category_create_get = (req, res, next) => {
        // renders a category form
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
};

// Handle category create on POST.
exports.category_create_post = [ urlencodedParser,
  [
    check('name', 'Name field cannot be empty and must be at least 3 characters long').exists().isLength({min: 3})
  ],
    (req, res, next) => {
     //store errors here
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      //return res.status(422).jsonp(errors.array());
      const notice = errors.array();
      res.render('forms/category_form', { 
        title: 'Create Category',
        name: req.body.name, 
        notice, 
        layout: 'layouts/detail'});
    }else{
      models.Category.create({
        name: req.body.name 
        }).then(function() {
            res.redirect('/categories');
      });
    }  
  }
] 

// Handle category delete on POST.
exports.category_delete_post = (req, res, next) => {
   
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If an post gets deleted successfully, redirect to categories list
            res.redirect('/categories');
          });
};

// Display category update form on GET.
exports.category_update_get = (req, res, next) => {
        
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               // renders a category form
               res.render('forms/category_form', { title: 'Update Category', category, layout: 'layouts/detail'});
               console.log("Category update get successful");
          });
};

// Handle category update on POST.
exports.category_update_post = (req, res, next) => {
        models.Category.update(
        // Values to update
            {
                name: req.body.name,
            },
          { // Clause
                where: 
                {
                    id: req.params.category_id
                }
            } 
         ).then(() => { 
                // If a category gets updated successfully,redirect to categories list
                res.redirect("/categories");
          });
};

// Display detail page for a specific category.
exports.category_detail = async (req, res, next) => {
        // find a category by ID
        models.Category.findById(
                req.params.category_id,
                {
                    include: [
                      {
                        model: models.Expense,
                        as: 'expenses',
                        required: false,
                        // Pass in the Expense attributes that you want to retrieve
                        attributes: ['id', 'details', 'status', 'amount'],
                        through: {
                          // This block of code allows you to retrieve the properties of the join table ExpenseCategory
                          model: models.ExpenseCategory,
                          as: 'ExpenseCategory',
                          attributes: ['expense_id', 'category_id'],
                      }
                  }
                ]
              }
        ).then((category) => {
        // renders an inividual category details page
        res.render('pages/category_detail', { title: 'Category Details', category, layout: 'layouts/detail'} );
        });
        
};

// Display list of all categories.
exports.category_list = (req, res, next) => {
        // controller logic to display all categories
        models.Category.findAll(
              {
                    include: [
                     {
                          model: models.Expense,
                          attributes: ['id', 'details'],
                          as: "expenses"
                    }
                ]
              }
        ).then((categories) => {
        // renders a post list page
        res.render('pages/category_list', { title: 'Category List', categories, layout: 'layouts/list'} );
        });
};

 