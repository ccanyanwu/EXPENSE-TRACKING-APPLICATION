var Employee = require('../models/employee');
var models = require('../models');
var moment = require('moment');

// Display employee create form on GET.
exports.employee_create_get =  async (req, res, next) => {
        // find all departments associated with employee
        const departments = await models.Department.findAll();
         
        res.render('forms/employee_form', { title: 'Create Employee', departments:departments, layout: 'layouts/detail'});
};

// Handle employee create on POST.
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
          res.redirect('/employees');
    });
};


// Display Employee delete  GET.
exports.employee_delete_post = function(req, res, next) {
  models.Employee.destroy({
     where: {
      id: req.params.employee_id
    }
  }).then(function() {
  
    res.redirect('/employees');
  });
};

// Display employee update form on GET.
exports.employee_update_get = function(req, res, next) {
  models.Employee.findById(
          req.params.employee_id
  ).then((employee) => {
         // renders an employee form
         res.render('forms/employee_form', { title: 'Update Employee', employee: employee, layout: 'layouts/detail'});
         console.log("employee update get successful");
    });
};

// Handle employee update on POST.
exports.employee_update_post = (req, res, next) => {
  // POST logic to update an employee
  models.Employee.update(
  // Values to update
      {
          username: req.body.username,
          role: req.body.role,
          mobile: req.body.mobile
      },
    { // Clause
          where: 
          {
              id: req.params.employee_id
          }
      }
   
   ).then(function() { 
          // If an employee gets updated successfully,redirect to employees list
          res.redirect("/employees");
    });
};

// Display list of all employees.
exports.employee_list = (req, res, next) => {
  // GET controller logic to list all employees
  models.Employee.findAll(
  ).then(function(employees) {
  // renders an employee list page
  res.render('pages/employee_list', { title: 'Employee List', employees: employees, layout: 'layouts/list'} );
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
  res.render('pages/employee_detail', { title: 'Employee Details', categories:categories, departments:departments, employee: employee, moment: moment, types:types, layout: 'layouts/detail'} );
  });
};


// This is the Maninest expense tracker  homepage.
exports.index = async function(req, res) {
  //sum of all the amount in expense model
  let amountSum = await models.Expense.sum('amount');

  //the most recent expense based on time
  let latest = await models.Expense.findOne({
    //based on time added
    order: [
      ['time', 'DESC']
    ],
    include:[
      {
        model:models.Employee,
        attributes: ['id', 'first_name', 'last_name']
      }
    ]
  });
  
  //top five expenses based on amount
  let topExpenses = await models.Expense.findAll({
    include: [
      {
        model: models.Category,
        attributes: ['id' ,'name']
      }
    ],
    order: [
      ['amount', 'DESC']
    ],
    limit:5
    }
  );

  //placing expenses under category
  let expenseCats = await models.Category.findAll({
    include: [
      {
        model: models.Expense,
        attributes: ['details']
      }
    ],
    group: ['Category.id','Expenses.id']
    }
  );

  //placing expenses under type
  let expenseTypes = await models.Type.findAll({
    include: [
      {
        model: models.Expense,
        attributes: ['details']
      }
    ],
    group: ['Type.id','Expenses.id']
    }
  );
  


  // find the count of Employees,expenses,categories and types in database
  models.Employee.findAndCountAll(
  ).then(function(employeeCount)
  {
    models.Expense.findAndCountAll(
  ).then(function(expenseCount)
  {
    models.Category.findAndCountAll(
  ).then(function(categoryCount)
  {
    models.Type.findAndCountAll(
  ).then(function(typeCount)
  
  {
    res.render('pages/index', {
        title: 'DASHBOARD',
        amountSum:amountSum,
        topExpenses:topExpenses,
        employeeCount: employeeCount,
        expenseCats:expenseCats, 
        expenseCount: expenseCount,
        expenseTypes:expenseTypes,
        categoryCount: categoryCount,
        latest:latest,
        moment:moment,
        typeCount: typeCount,
        layout: 'layouts/main'
        
    });
  });
  });
  });
  });
  console.log('I AM THE ONE OOO'+ latest); 
}