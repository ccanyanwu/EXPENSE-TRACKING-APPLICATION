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

  // Handle department delete on POST.
exports.department_delete_post = function(req, res, next) {
   
  models.Department.destroy({
      // find the department_id to delete from database
      where: {
        id: req.params.department_id
      }
    }).then(function() {
     // If a department gets deleted successfully, we just redirect to departments list
     
     res.redirect('/departments');
      
      
      console.log("Type deleted successfully");
    });
};

  
// Display list of all Types.
exports.department_list = (req, res, next) => {
  
  models.Department.findAll()
  .then(function(departments) {
  // renders an department list page
  let total = departments.length;
  console.log("rendering department list");
  res.render('pages/department_list', { title: 'Department List', departments: departments, layout: 'layouts/list'} );
  console.log(" list renders successfully");
  });
};