var Expense = require('../models/expense');
var models = require('../models');
var moment = require('moment');


// Display expense create form on GET.
exports.expense_create_get =  async (req, res, next) => {
        // connect with employee, type and categories
       
        const types = await models.Type.findAll();
        const categories = await models.Category.findAll();

        models.Employee.findById(
          req.params.employee_id, {
          include: [
            {
              model: models.Expense
            },
            {
              model: models.Department,
              attributes: ['id', 'name']
            }
          ]
          }
  ).then(function(employee) {
    // renders an inividual employee details page
    //console.log(department_id.name)
    res.render('forms/expense_form', { title: 'Create Expense', categories:categories, employee: employee, types:types, layout: 'layouts/detail'} );
    //console.log("Employee details renders successfully" + res.json(req.aprover));
    });
        
        //res.render('forms/expense_form', { title: 'Create Expense', categories:categories, employees:employees, types:types, layout: 'layouts/detail'});
};

// Handle expense create on POST.
exports.expense_create_post = function(req, res, next) {
  let employee_id = req.body.employee_id;
    // If an expense gets created successfully, we just redirect to expenses list
    // no need to render a page
     models.Expense.create({
        //    createdAt: req.body.createdAt,
        //    time: req.body.time,
           details: req.body.details,
           amount: req.body.amount,
           EmployeeId: req.body.employee_id,
           TypeId: req.body.type_id,
           CategoryId: req.body.category_id,
           status: req.body.status,

       }).then(function() {
          
        //console.log("For the expense we have: " + moment(models.Expense.time).format('hh:mm A'), req.body.details, req.body.amount );
           res.redirect('/employee/' + employee_id);
     });
};