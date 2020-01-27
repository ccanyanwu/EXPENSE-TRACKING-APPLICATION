var Author = require('../models/author');

// Display author create form on GET.
exports.author_create_get = function(req, res, next) {
        // create author GET controller logic here 
        res.render('forms/author_form', { title: 'Create Author',  layout: 'layouts/detail'});
};

// Handle author create on POST.
exports.author_create_post = function(req, res, next) {
     // create author POST controller logic here
     // If an author gets created successfully, we just redirect to authors list
     // no need to render a page
     res.redirect("/authors");
};

// Display author delete form on GET.
exports.author_delete_get = function(req, res, next) {
        // GET logic to delete an author here
        
        // renders author delete page
        res.render('pages/author_delete', { title: 'Delete Author',  layout: 'layouts/detail'} );
};

// Handle author delete on POST.
exports.author_delete_post = function(req, res, next) {
        // POST logic to delete an author here
        // If an author gets deleted successfully, we just redirect to authors list
        // no need to render a page
        res.redirect('/authors');
};

// Display author update form on GET.
exports.author_update_get = function(req, res, next) {
        // GET logic to update an author here
        
        // renders author form
        res.render('forms/author_form', { title: 'Update Author',  layout: 'layouts/detail'});
};

// Handle post update on POST.
exports.author_update_post = function(req, res, next) {
        // POST logic to update an author here
        // If an author gets updated successfully, we just redirect to authors list
        // no need to render a page
        res.redirect("/authors");
};

// Display list of all authors.
exports.author_list = function(req, res, next) {
        // GET controller logic to list all authors
        
        // renders all authors list
        res.render('pages/author_list', { title: 'Author List',  layout: 'layouts/list'} );
};

// Display detail page for a specific author.
exports.author_detail = function(req, res, next) {
        // GET controller logic to display just one author
        
        // renders an individual author details page
        res.render('pages/author_detail', { title: 'Author Details',  layout: 'layouts/detail'} );
};

 