var Comment = require('../models/category');
var models = require('../models');

// Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
        // create comment GET controller logic here 
        
        // renders a comment form
        res.render('forms/comment_form', { title: 'Create Comment', layout: 'layouts/detail'});
};

// Handle comment create on POST.
exports.comment_create_post = function(req, res, next) {
     // create comment POST controller logic here
     let post_id = req.body.post_id
     models.Comment.create({
            comment_title: req.body.comment_title,
            comment_body: req.body.comment_body,
            PostId: req.body.post_id
        }).then(function() {
            console.log("Comment created successfully");
           // check if there was an error during post creation
            res.redirect('/blog/post/' + post_id);
      });
};

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res, next) {
        models.Comment.destroy({
            // find the comment_id to delete from database
            where: {
              id: req.params.comment_id
            }
          }).then(function() {
           // If an comment gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/blog/comments');
            console.log("Comment deleted successfully");
          });};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res, next) {
          models.Comment.destroy({
            // find the comment_id to delete from database
            where: {
              id: req.params.comment_id
            }
          }).then(function() {
           // If an comment gets deleted successfully, we just redirect to comments list
           // no need to render a page
            res.redirect('/blog/comments');
            console.log("Comment deleted successfully");
          });
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res, next) {
        // Find the comment you want to update
        console.log("ID is " + req.params.comment_id);
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
               // renders a comment form
               res.render('forms/comment_form', { title: 'Update Comment', comment: comment, layout: 'layouts/detail'});
               console.log("Comment update get successful");
          });
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res, next) {
    console.log("ID is " + req.params.comment_id);
        models.Comment.update(
        // Values to update
            {
                comment_title: req.body.comment_title,
                comment_body: req.body.comment_body
            },
          { // Clause
                where: 
                {
                    id: req.params.comment_id
                }
            }
        //   returning: true, where: {id: req.params.comment_id} 
         ).then(function() { 
                // If an comment gets updated successfully, we just redirect to comments list
                // no need to render a page
                res.redirect("/blog/comments");  
                console.log("Comment updated successfully");
          });
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res, next) {
        // find a comment by the primary key Pk
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
        // renders an inividual comment details page
        res.render('pages/comment_detail', { title: 'Comment Details', comment: comment, layout: 'layouts/detail'} );
        console.log("Comment deteials renders successfully");
        });
};

// Display list of all comments.
exports.comment_list = function(req, res, next) {
        // controller logic to display all comments
        models.Comment.findAll(
        ).then(function(comments) {
        // renders a comment list page
        console.log("rendering comment list");
        res.render('pages/comment_list', { title: 'Comment List', comments: comments, layout: 'layouts/list'} );
        console.log("Comments list renders successfully");
        });
};



 