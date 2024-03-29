var Department = require('../models/department');
var models = require('../models');

// Display department create form on GET.
exports.department_create_get =  (req, res, next) => {        
        // renders a department form
        res.render('forms/department_form', { title: 'Create Department',  layout: 'layouts/detail'});
};

// Handle department create on POST.
exports.department_create_post =  (req, res, next) => {
      // If a type gets created successfully, redirect to types list
     models.Department.create({
      name: req.body.name 
  }).then(() => {
    res.redirect('/departments');
  });
};

  // Handle department delete on POST.
exports.department_delete_post = (req, res, next) => {
   
  models.Department.destroy({
      // find the department_id to delete from database
      where: {
        id: req.params.department_id
      }
    }).then(() => {
     // If a department gets deleted successfully,redirect to departments list 
     res.redirect('/departments');
    });
};

// Display detail page for a specific category.
exports.department_detail = async function(req, res, next) {
  // find a category by ID
  models.Department.findById(
          req.params.department_id,
          {
              include: [
               {
                    model: models.Expense,
                    attributes: ['id', 'details', 'status','amount']
              }
          ]
        }
  ).then((department) => {
  // renders an inividual department details page
  res.render('pages/department_detail', { title: 'department Details', department, layout: 'layouts/detail'} );
  });
  
};
  
// Display list of all Types.
exports.department_list = (req, res, next) => {
  
  models.Department.findAll(
    {
      include: [
       {
            model: models.Expense,
            attributes: ['id', 'details']
        }
      ]
    }
  )
  .then((departments) => {
  // renders an department list page
  res.render('pages/department_list', { title: 'Department List', departments, layout: 'layouts/list'} );
  });
};