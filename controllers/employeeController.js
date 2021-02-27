var Employee = require('../models/employee');
var models = require('../models');

var moment = require('moment');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false});

// Display employee create form on GET.
exports.employee_create_get =  async (req, res, next) => {
        // find all departments associated with employee
        const departments = await models.Department.findAll();
         
        res.render('forms/employee_form', { title: 'Create Employee', departments, layout: 'layouts/detail'});
};

// Handle employee create on POST.
exports.employee_create_post =  [ urlencodedParser, 
  [
    check('first_name', 'First name must be valid and not less than 3 characters').exists().isLength({min: 3}),
    check('last_name', 'Last name must be valid and not less than 3 characters').exists().isLength({min: 3}),
    check('username', 'Username must be valid and not less than 3 characters').exists().isLength({min: 3}),
    check('email', 'email is not valid').isEmail().normalizeEmail(),
    check('password', 'password must be between 7 and 20 characters').isLength({min: 7, max:42}),
    check('role', 'please input a valid role not less than 3 characters').exists().isLength({min: 3}),
    check('mobile', 'please input a valid mobile number').exists().isNumeric(),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);

    // find all departments associated with employee
    const departments = await models.Department.findAll();
    
    if(!errors.isEmpty()){
       const notice = errors.array();
       res.render('forms/employee_form', {
          title: 'Create Employee', 
          departments, 
          first_name : req.body.first_name, notice, 
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
          role: req.body.role,
          layout: 'layouts/detail'});
  } else {
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
    }
    }
  ];

// Display Employee delete  GET.
exports.employee_delete_post = (req, res, next) => {
  models.Employee.destroy({
     where: {
      id: req.params.employee_id
    }
  }).then(() => {
  
    res.redirect('/employees');
  });
};

// Display employee update form on GET.
exports.employee_update_get = (req, res, next) => {
  models.Employee.findById(
          req.params.employee_id
  ).then((employee) => {
         // renders an employee form
         res.render('forms/employee_form', { title: 'Update Employee', employee, layout: 'layouts/detail'});
    });
};

// Handle employee update on POST.
exports.employee_update_post = [ urlencodedParser, 
  [
    check('username', 'Username cannot be empty and must not less than 3 characters').exists().isLength({min: 3}),
    check('role', 'please input a valid role not less than 3 characters').exists().isLength({min: 3}),
    check('mobile', 'please input a valid mobile number').exists().isNumeric(),
  ],
  async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      let employee = await models.Employee.findById(req.params.employee_id)
       const notice = errors.array();
       res.render('forms/employee_form', { title: 'Update Employee', employee, notice, layout: 'layouts/detail'});
  } else{ models.Employee.update(
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
    
    ).then(() => { 
            // If an employee gets updated successfully,redirect to employees list
            res.redirect("/employees");
      });
      }
    }
  ]

// Display list of all employees.
exports.employee_list = (req, res, next) => {
  // GET controller logic to list all employees
  models.Employee.findAll(
  ).then((employees) => {
  // renders an employee list page
  res.render('pages/employee_list', { title: 'Employee List', employees, layout: 'layouts/list'} );
  });
};

// Display detail page for a specific employee.
exports.employee_detail = async (req, res, next) => {
  const departments = await models.Department.findAll();
  const categories = await models.Category.findAll();
  const types = await models.Type.findAll();

  models.Employee.findById(
          req.params.employee_id, {
          include: [
            {
              model: models.Expense,
              attributes: ['id', 'details', 'DepartmentId']
            },
            {
              model: models.Department,
              attributes: ['id', 'name']
            }
          ]
          }
  ).then((employee) => {
  // renders an inividual employee details page
  res.render('pages/employee_detail', { title: 'Employee Details', categories, departments,  employee,  moment, types, layout: 'layouts/detail'} );
  });
};

// This is the Manifest expense tracker  homepage.
exports.index = async (req, res) => {
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
      },
      {
        model: models.Employee,
        attributes: ['id' ,'first_name', 'last_name']
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

   //placing expenses under departments
   let expenseDepts = await models.Department.findAll({
    include: [
      {
        model: models.Expense,
        attributes: ['details', 'amount']
      }
    ],
    group: ['Department.id','Expenses.id']
    }
  );

  //total amount spent per department
  let deptExpense = await models.Department.findAll({
    attributes : ['id', 'name', [models.sequelize.fn('SUM', models.sequelize.col('amount')), 'id']],
    include: [
      {
        model: models.Expense,
        attributes: []
      }
    ],
    group: ['Department.id'],
    }
  )

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
  ).then((employeeCount) =>
  {
    models.Expense.findAndCountAll(
  ).then((expenseCount) =>
  {
    models.Category.findAndCountAll(
  ).then((categoryCount) =>
  {
    models.Type.findAndCountAll(
  ).then((typeCount) =>
  
  {
    res.render('pages/index', { title: 'DASHBOARD', amountSum, topExpenses, deptExpense, employeeCount,expenseCats, expenseCount, expenseTypes, categoryCount, expenseDepts, latest, moment, typeCount, layout: 'layouts/main'});
  });
  });
  });
   }); 
}