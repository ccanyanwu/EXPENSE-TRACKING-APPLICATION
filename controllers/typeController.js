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
        }).then(function() {
            console.log(`Type created successfully ${models.Type.id}`);
           // check if there was an error during type creation creation
            res.send('/blog/types');
      });
};