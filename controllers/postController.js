var models = require('../models');

var async = require('async');

// Display post create form on GET.
exports.post_create_get = function(req, res, next) {
        // renders a post form
        res.render('forms/post_form', { title: 'Create Post', layout: 'layouts/detail'});
        console.log("Post form renders successfully");
};

// Handle post create on POST.
exports.post_create_post = async function( req, res, next) {

     // create a new post based on the fields in our post model
     // I have create two fields, but it can be more for your model
     
     const post = await models.Post.create({
            post_title: req.body.post_title,
            post_body: req.body.post_body,
            AuthorId: req.body.author_id
     } 
     );
        
     console.log("The saved post " + post.id);
     
     const category = await models.Category.findById(req.body.category_id);
     
     if (!category) {
          return res.status(400);
     }

     // ok category exist
     console.log("This is the category name we entered in front end " + category.name)
    
    const post_category = {
      post_id: post.id,
      category_id: category.id
    };
    
     // Create and save a productOrder
    //  const ProductCategorySaved = await models.PostCategory.create(post_category);
     await post.addCategory(category);

     console.log("Post created successfully");
     // check if there was an error during post creation
     res.redirect('/blog/posts');
         
};

//  Promise.all([User.create(), City.create()])
//     .then(([user, city]) => UserCity.create({userId: user.id, cityId: city.id}))


// Display post delete form on GET.
exports.post_delete_get = function(req, res, next) {
       models.Post.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.post_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/blog/posts');
            console.log("Post deleted successfully");
          });
};

// Handle post delete on POST.
exports.post_delete_post = function(req, res, next) {
          models.Post.destroy({
            // find the post_id to delete from database
            where: {
              id: req.params.post_id
            }
          }).then(function() {
           // If an post gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/blog/posts');
            console.log("Post deleted successfully");
          });

 };

// Display post update form on GET.
exports.post_update_get = function(req, res, next) {
        // Find the post you want to update
        console.log("ID is " + req.params.post_id);
        models.Post.findById(
                req.params.post_id
        ).then(function(post) {
               // renders a post form
               res.render('forms/post_form', { title: 'Update Post', post: post, layout: 'layouts/detail'});
               console.log("Post update get successful");
          });
        
};

// Handle post update on POST.
exports.post_update_post = function(req, res, next) {
        console.log("ID is " + req.params.post_id);
        models.Post.update(
        // Values to update
            {
                post_title: req.body.post_title,
                post_body: req.body.post_body
            },
          { // Clause
                where: 
                {
                    id: req.params.post_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                // If an post gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/blog/posts");  
                console.log("Post updated successfully");
          });
};

// Display detail page for a specific post.
exports.post_detail = function(req, res, next) {
        // find a post by the primary key Pk
        models.Post.findById(
                req.params.post_id,
                {
                    include: models.Comment,
                    
                }
                
        ).then(function(post) {
        // renders an inividual post details page
        res.render('pages/post_detail', { title: 'Post Details', post: post, layout: 'layouts/detail'} );
        console.log("Post deteials renders successfully");
        });
};
 
// Display list of all posts.
exports.post_list = function(req, res, next) {
        // controller logic to display all posts
        models.Post.findAll({
              // Make sure to include the products
                include: [{
                  model: models.Category,
                  as: 'categories',
                  required: false,
                  // Pass in the Product attributes that you want to retrieve
                  attributes: ['id', 'name'],
                  through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: models.PostCategory 
                  }
                }]
        }).then(function(posts) {
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/post_list', { title: 'Post List', posts: posts, layout: 'layouts/list'} );
        console.log("Posts list renders successfully");
        });
        
};

// This is the blog homepage.
exports.index = function(req, res) {

      
   // find the count of posts in database
      models.Post.findAndCountAll(
      ).then(function(postCount)
      {
        models.Author.findAndCountAll(
      ).then(function(authorCount)
      {
        models.Comment.findAndCountAll(
      ).then(function(commentCount)
      {
        models.Category.findAndCountAll(
      ).then(function(categoryCount)
      {
       
        
 
        res.render('pages/index', {title: 'Homepage', postCount: postCount, authorCount: authorCount, commentCount: commentCount, categoryCount: categoryCount, layout: 'layouts/main'});
        
        // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
        // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});

      });
      });
      });
      });
       
      
    
    
    };


 