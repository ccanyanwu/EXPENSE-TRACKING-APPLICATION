var Category = require('../models/category');
var models = require('../models');

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
        // create category GET controller logic here 
        
        // renders a category form
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
     // create category POST controller logic here
     
     // If a category gets created successfully, we just redirect to categories list
     // no need to render a page
      models.Category.create({
            name: req.body.name 
        }).then(function() {
           // check if there was an error during post creation
            res.send('/categories');
      });
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
   
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to categories list
           // no need to render a page
            res.redirect('/categories');
            console.log("Category deleted successfully");
          });
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               // renders a category form
               res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail'});
               console.log("Category update get successful");
          });
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
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
         ).then(function() { 
                // If a category gets updated successfully, we just redirect to categories list
                res.redirect("/categories");  
                console.log("Post updated successfully");
          });
};


// Display category review form on GET.
exports.category_review_get = function(req, res, next) {
        
      models.Category.findById(
              req.params.category_id
      ).then(function(category) {
             // renders a category form
             res.render('forms/category_review_form', { title: 'Review Category', category: category, layout: 'layouts/detail'});
             console.log("Category update get successful");
        });
};

// Display detail page for a specific category.
exports.category_detail = async function(req, res, next) {
  //const expenses = await models.Expense.findAll();

        // find a category by ID
        models.Category.findById(
                req.params.category_id,
                {
                    include: [
                     {
                          model: models.Expense,
                          attributes: ['id', 'details', 'status','amount']
                    }
                ]
              }
        ).then(function(category) {
        // renders an inividual category details page
        res.render('pages/category_detail', { title: 'Category Details', category:category, layout: 'layouts/detail'} );
        console.log("Category deteials renders successfully");
        });
        
};

// Display list of all categories.
exports.category_list = function(req, res, next) {
        // controller logic to display all categories
        models.Category.findAll(
              {
                    include: [
                     {
                          model: models.Expense,
                          attributes: ['id', 'details']
                    }
                ]
              }
        ).then(function(categories) {
        // renders a post list page
        console.log("rendering category list");
        res.render('pages/category_list', { title: 'Category List', categories: categories, layout: 'layouts/list'} );
        console.log("Categories list renders successfully");
        });
};

 