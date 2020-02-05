var Author = require('../models/author');
var models = require('../models');

// Display author create form on GET.
exports.author_create_get =  function(req, res, next) {
        // create author GET controller logic here 
        res.render('forms/author_form', { title: 'Create Author',    layout: 'layouts/detail'});
};

// Handle author create on POST.
exports.author_create_post = function(req, res, next) {
     // create author POST controller logic here
     // If an author gets created successfully, we just redirect to authors list
     // no need to render a page
      models.Author.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }).then(function() {
            console.log("Author created successfully");
           // check if there was an error during post creation
            res.redirect('/blog/authors');
      });
};

// Display author delete form on GET.
exports.author_delete_get = function(req, res, next) {
          models.Author.destroy({
             where: {
              id: req.params.author_id
            }
          }).then(function() {
          
            res.redirect('/blog/authors');
            console.log("Author deleted successfully");
          });
};

// Handle author delete on POST.
exports.author_delete_post = function(req, res, next) {
           models.Author.destroy({
             where: {
              id: req.params.author_id
            }
          }).then(function() {
 
            res.redirect('/blog/authors');
            console.log("Author deleted successfully");
          });
};

// Display author update form on GET.
exports.author_update_get = function(req, res, next) {
        // Find the post you want to update
        console.log("ID is " + req.params.author_id);
        models.Author.findById(
                req.params.author_id
        ).then(function(author) {
               // renders a post form
               res.render('forms/author_form', { title: 'Update Author', author: author, layout: 'layouts/detail'});
               console.log("Author update get successful");
          });
};

exports.author_update_post = function(req, res, next) {
        console.log("ID is " + req.params.author_id);
        models.Author.update(
        // Values to update
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            },
          { // Clause
                where: 
                {
                    id: req.params.author_id
                }
            }
          ).then(function() { 
                
                res.redirect("/blog/authors");  
                console.log("Author updated successfully");
          });
};

// Display list of all authors.
exports.author_list = function(req, res, next) {
      
        models.Author.findAll(
        ).then(function(authors) {
        console.log("rendering author list");
        res.render('pages/author_list', { title: 'Author List', authors: authors, layout: 'layouts/list'} );
        console.log("Authors list renders successfully");
        });
};

// Display detail page for a specific author.
exports.author_detail = async function(req, res, next) {
            
         const categories = await models.Category.findAll();
         
         models.Author.findById(
                req.params.author_id, {
                include: [
                    {
                      model: models.Post
                    }
                         ]
                }
        ).then(function(author) {
        console.log(author);
        res.render('pages/author_detail', { title: 'Author Details', categories: categories, author: author, layout: 'layouts/detail'} );
        console.log("Author deteials renders successfully");
        });
};

 