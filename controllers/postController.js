var Post = require('../models/post');

// Display post create form on GET.
exports.post_create_get = function(req, res, next) {
        // create post GET controller logic here 
        
        // renders a post form
        res.render('forms/post_form', { title: 'Create Post', layout: 'layouts/detail'});
};

// Handle post create on POST.
exports.post_create_post = function(req, res, next) {
     // create post POST controller logic here
     
     // If an post gets created successfully, we just redirect to posts list
     // no need to render a page
     res.redirect("/posts");
};

// Display post delete form on GET.
exports.post_delete_get = function(req, res, next) {
        // GET logic to delete a post here
        
        // renders delete page
        res.render('pages/post_delete', { title: 'Delete Post', layout: 'layouts/detail'} );
};

// Handle post delete on POST.
exports.post_delete_post = function(req, res, next) {
        // POST logic to delete a post here
        
        // If an post gets deleted successfully, we just redirect to posts list
        // no need to render a page
        res.redirect('/posts');
};

// Display post update form on GET.
exports.post_update_get = function(req, res, next) {
        // GET logic to update a post here
        
        // renders a post form
        res.render('forms/post_form', { title: 'Update Post', layout: 'layouts/detail'});
};

// Handle post update on POST.
exports.post_update_post = function(req, res, next) {
        // POST logic to update a post here
       
        // If an post gets updated successfully, we just redirect to posts list
        // no need to render a page
        res.redirect("/posts");
};

// Display list of all posts.
exports.post_list = function(req, res, next) {
        // controller logic to display all posts
        
        // renders a post list page
        res.render('pages/post_list', { title: 'Post List', layout: 'layouts/list'} );
};

// Display detail page for a specific post.
exports.post_detail = function(req, res, next) {
        // constroller logic to display a single post
        
        // renders an inividual post details page
        res.render('pages/post_detail', { title: 'Post Details', layout: 'layouts/detail'} );
};

// This is the blog homepage.
exports.index = function(req, res) {
    // controller logic for index
    res.render('pages/index', {title: 'Post Details', layout: 'layouts/main'});
    // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
    // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});
};


 