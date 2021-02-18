var Employee = require('../models/employee');
var models = require('../models');
var moment = require('moment');


// Display employee create form on GET.
exports.employee_create_get =  async (req, res, next) => {
        // establish connection between employee, role and deparment
        const departments = await models.Department.findAll();
         
        res.render('forms/employee_form', { title: 'Create Employee', departments:departments, layout: 'layouts/detail'});
};

// Handle employee create on Pmployee.
exports.employee_create_post = (req, res, next) => {
    
  models.Employee.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          role: req.body.role,
          DepartmentId: req.body.department_id
      }).then(function() {
        

        // check if there was an error during employee creation
          res.redirect('/employees');
        // res.redirect('/employee/' + amployee_id);
    });
};


// Display list of all employees.
exports.employee_list = (req, res, next) => {
  // GET controller logic to list all employees
  models.Employee.findAll(
  ).then(function(employees) {
  // renders an employee list page
  console.log("rendering employee list");
  res.render('pages/employee_list', { title: 'Employee List', employees: employees, layout: 'layouts/list'} );
  console.log("employee list renders successfully");
  });
};


// Display detail page for a specific employee.
exports.employee_detail = async function(req, res, next) {
  const departments = await models.Department.findAll();
  const categories = await models.Category.findAll();
  const types = await models.Type.findAll();
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
  res.render('pages/employee_detail', { title: 'Employee Details', categories:categories, departments:departments, employee: employee, moment: moment, types:types, layout: 'layouts/detail'} );
  //console.log("Employee details renders successfully" + res.json(req.aprover));
  });
};