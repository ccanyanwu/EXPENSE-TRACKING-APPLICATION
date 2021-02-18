var Department = require('../models/department');
var models = require('../models');

// Display tepartment create form on GET.
exports.department_create_get =  (req, res, next) => { 
        
        // renders a department form
        res.render('forms/department_form', { title: 'Create Department',  layout: 'layouts/detail'});
};

// Handle department create on POST.
exports.department_create_post =  (req, res, next) => {
      // create type POST controller logic here
     
     // If a type gets created successfully, we just redirect to categories list
     // no need to render a page
     models.Department.create({
      name: req.body.name 
  }).then(function() {
      //console.log(`Type created successfully ${models.Type.id}`);
     // check if there was an error during type creation creation
      res.send('/department');
});
  };