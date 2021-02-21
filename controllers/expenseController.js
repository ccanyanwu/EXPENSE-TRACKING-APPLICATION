var Expense = require('../models/expense');
var models = require('../models');
var moment = require('moment');
var sequelize = require('sequelize');



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
    // renders an inividual expense details page
    
    res.render('forms/expense_form', { title: 'Create Expense', categories:categories, employee: employee, types:types, layout: 'layouts/detail'} );
    
    });
        ;
};

// Handle expense create on POST.
exports.expense_create_post = function(req, res, next) {
  let employee_id = req.body.employee_id;
    
  //logic to check for amount 
  let getAmount = req.body.amount,
      getStatus = '';

      if(getAmount < 1000){getStatus = 'Approved';}
      else{getStatus = 'Pending'}
    
     models.Expense.create({
           details: req.body.details,
           amount: req.body.amount,
           EmployeeId: req.body.employee_id,
           TypeId: req.body.type_id,
           CategoryId: req.body.category_id,
           status: getStatus,

       }).then(function() {
          
        //console.log("For the expense we have: " + moment(models.Expense.time).format('hh:mm A'), req.body.details, req.body.amount );
           res.redirect('/employee/' + employee_id);
     });
};

// Display Expense delete  GET.
exports.expense_delete_post = function(req, res, next) {
  models.Expense.destroy({
     where: {
      id: req.params.expense_id
    }
  }).then(function() {
  
    res.redirect('/expenses');
    console.log("Expense deleted successfully");
  });
};

// Display expense update form on GET.
exports.expense_update_get = async (req, res, next) => {
  console.log("ID is " + req.params.expense_id);
  const types = await models.Type.findAll();
  const categories = await models.Category.findAll();

  models.Expense.findById(
          req.params.expense_id
  ).then(function(expense) {
         // renders an  update form
         res.render('forms/expense_form', { title: 'Update Expense', categories:categories, expense: expense, types:types, layout: 'layouts/detail'});
         console.log("Expense update get successful");
    });
};

// Handle EXPENSE update on POST.
exports.expense_update_post = function(req, res, next) {
  // POST logic to update an expense here
  console.log("ID is " + req.params.expense_id);
  //logic for expense status
  let getAmount = req.body.amount,
      getStatus = '';

      if(getAmount < 1000){getStatus = 'Approved';}
      else{getStatus = 'Pending'}
  models.Expense.update(
  // Values to update
      {
          details: req.body.details,
          amount: getAmount,
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
          console.log("Expense updated successfully");
    });
};

// Display expense review form form on GET.
exports.expense_review_get = async (req, res, next) => {
  console.log("ID is " + req.params.expense_id);
  const types = await models.Type.findAll();
  const categories = await models.Category.findAll();

  models.Expense.findById(
          req.params.expense_id
  ).then(function(expense) {
         // renders a expense review form form
         res.render('forms/expense_review_form', { title: 'Review Expense', categories:categories, expense: expense, types:types, layout: 'layouts/detail'});
         console.log("Expense reviewed successfully");
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
          console.log("Expense updated successfully");
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
    //attributes: ['amount'],
    
  }).then(function(expenses) {
  // renders an employee list page
  console.log("rendering expense list " );
  res.render('pages/expense_list', { title: 'Expense List', expenses: expenses, layout: 'layouts/list'} );
  console.log(" list renders successfully");
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
              model: models.Type,
              attributes: ['id', 'name']
            }
          ]
          }
  ).then((expense) => {
  // renders an inividual employee details page
  //console.log(department_id.name)
  res.render('pages/employee_detail', { title: 'Expense Details',   expense: expense, moment: moment, layout: 'layouts/detail'} );
  //console.log("Employee details renders successfully" + res.json(req.aprover));
  });
};