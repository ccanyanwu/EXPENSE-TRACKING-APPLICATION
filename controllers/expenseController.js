var Expense = require('../models/expense');
var models = require('../models');
var moment = require('moment');

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false});



// Display expense create form on GET.
exports.expense_create_get =  async (req, res, next) => {
        // connect with employee,department, type and categories
        const departments = await models.Department.findAll();
        const types = await models.Type.findAll();
        const categories = await models.Category.findAll();

        models.Employee.findById(
          req.params.employee_id, {
          include: [
            {
              model: models.Expense
            }
          ]
          }
  ).then(function(employee) {
    // renders a personalized expense form
    res.render('forms/expense_form', { title: 'Create Expense', categories:categories, departments:departments, employee: employee, types:types, layout: 'layouts/detail'} );
    
    });
        ;
};

// Handle expense create on POST.
exports.expense_create_post =[ urlencodedParser,
  [
    check('details', 'details field cannot be empty and must be at least 3 characters long').exists().isLength({min: 3}),
    check('amount', 'enter a valid amount').isNumeric().exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // connect with employee, department, type and categories
    const departments = await models.Department.findAll();
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();

  let employee = await  models.Employee.findById(
      req.params.employee_id, {
      include: [
        {
          model: models.Expense
        }/*,
        {
          model: models.Department,
          attributes: ['id', 'name']
        }*/
      ]
      }
)
    if(!errors.isEmpty()){
      //return res.status(422).jsonp(errors.array());
      const notice = errors.array();
      res.render('forms/expense_form', { title: 'Create Expense', categories:categories, departments, employee: employee, notice, types:types, layout: 'layouts/detail'});
    } else {
      let employee_id = req.body.employee_id;
      
    //logic to check for amount and set status
    let getAmount = req.body.amount,
        getStatus = '';
  
        if(getAmount < 1000){getStatus = 'approved';}
        else{getStatus = 'pending'}
      
       models.Expense.create({
             details: req.body.details,
             amount: req.body.amount,
             EmployeeId: req.body.employee_id,
             DepartmentId: req.body.department_id,
             TypeId: req.body.type_id,
             CategoryId: req.body.category_id,
             status: getStatus,
  
         }).then(function() {
             res.redirect('/employee/' + employee_id);
       });
    }
    
    
  }
] 

// Display Expense delete  GET.
exports.expense_delete_post = function(req, res, next) {
  models.Expense.destroy({
     where: {
      id: req.params.expense_id
    }
  }).then(function() {
  
    res.redirect('/expenses');
  });
};

// Display expense update form on GET.
exports.expense_update_get = async (req, res, next) => {
  const departments = await models.Department.findAll();
  const types = await models.Type.findAll();
  const categories = await models.Category.findAll();

  models.Expense.findById(
          req.params.expense_id
  ).then(function(expense) {
         // renders an  update form
         res.render('forms/expense_form', { title: 'Update Expense', categories:categories, departments, expense: expense, types:types, layout: 'layouts/detail'});
    });
};

// Handle EXPENSE update on POST.
exports.expense_update_post = function(req, res, next) {
  
  //logic for expense status
  let getAmount = req.body.amount,
      getStatus = '';

      if(getAmount < 1000){getStatus = 'approved';}
      else{getStatus = 'pending'}
  models.Expense.update(
  // Values to update
      {
          details: req.body.details,
          amount: getAmount,
          DepartmentId: req.body.department_id,
          TypeId: req.body.type_id,
          CategoryId: req.body.category_id,
          status:getStatus
      },
    { // Clause
          where: 
          {
              id: req.params.expense_id
          }
      } 
   ).then(function() { 
          res.redirect("/expenses");
    });
};

// Display expense review form form on GET.
exports.expense_review_get = async (req, res, next) => {
  const departments = await models.Department.findAll();
  const types = await models.Type.findAll();
  const categories = await models.Category.findAll();

  models.Expense.findById(
          req.params.expense_id
  ).then(function(expense) {
         // renders a expense review form form
         res.render('forms/expense_review_form', { title: 'Review Expense', categories:categories, departments, expense: expense, types:types, layout: 'layouts/detail'});
    });
};

// Handle EXPENSE review on POST.
exports.expense_review_post = function(req, res, next) {
  // POST logic to review an expense status
  console.log("ID is " + req.params.expense_id);
  //logic for expense status
  models.Expense.update(
  // Values to update
      {
          status:req.body.status
      },
    { // Clause
          where: 
          {
              id: req.params.expense_id
          }
      } 
   ).then(function() { 
          res.redirect("/expenses");
    });
};

// Display list of all expenses.
exports.expense_list = async (req, res, next) => {
  models.Expense.findAll({
    include:[
      {
        model:models.Employee,
        attributes: ['id', 'first_name'],
      }
    ],
  }).then(function(expenses) {
  // renders an employee list page
  res.render('pages/expense_list', { title: 'Expense List', expenses: expenses, layout: 'layouts/list'} );
  });
};

// Display detail page for a specific expense.
exports.expense_detail = (req, res, next) => {
  models.Expense.findById(
          req.params.expense_id, {
          include: [
            {
              model: models.Employee,
              attributes: ['id', 'first_name', 'last_name', 'role',]
            },
            {
              model: models.Category,
              attributes: ['id', 'name']
            },
            {
              model: models.Department,
              attributes: ['id', 'name']
            },
            {
              model: models.Type,
              attributes: ['id', 'name']
            }
          ]
          }
  ).then((expense) => {
  // renders an inividual employee details page
  res.render('pages/employee_detail', { title: 'Expense Details',   expense: expense, moment: moment, layout: 'layouts/detail'} );
  });
};

[
  {"id":2,"name":"Accounts and Finance","total_cost":"73100"},
  {"id":1,"name":"Engineering","total_cost":"200"}
]