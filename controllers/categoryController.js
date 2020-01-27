var Category = require('../models/category');

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
     res.redirect("/categories");
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
        // GET logic to delete a category here
        
        // renders delete page
        res.render('pages/category_delete', { title: 'Delete Category',  layout: 'layouts/detail'} );
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
        // POST logic to delete a category here
        
        // If a category gets deleted successfully, we just redirect to categories list
        // no need to render a page
        res.redirect('/categories');
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        // GET logic to update a category here
        
        // renders a category form
        res.render('forms/category_form', { title: 'Update Category',  layout: 'layouts/detail' });
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        // POST logic to update a category here
       
        // If a category gets updated successfully, we just redirect to categories list
        // no need to render a page
        res.redirect("/categories");
};

// Display list of all categories.
exports.category_list = function(req, res, next) {
        // controller logic to display all categories
        
        // renders a category list page
        res.render('pages/category_list', { title: 'Category List',  layout: 'layouts/list'} );
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
        // constroller logic to display a single category
        
        // renders an inividual category details page
        res.render('pages/category_detail', { title: 'Category Details',  layout: 'layouts/detail'} );
};

 