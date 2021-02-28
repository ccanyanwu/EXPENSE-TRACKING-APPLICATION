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
  ).then((employee) => {
    // renders a personalized expense form
    res.render('forms/expense_form', { title: 'Create Expense', categories, departments, employee, types, layout: 'layouts/detail'} );
    
    });
        ;
};

// Handle expense create on POST.
exports.expense_create_post = [ urlencodedParser,
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
          model: models.Expense,
          attributes: ['id']
        }
       ]
      }
)
    if(!errors.isEmpty()){
      const notice = errors.array();
      res.render('forms/expense_form', { 
        title: 'Create Expense', 
        amount: req.body.amount,
        categories, 
        departments,
        details: req.body.details, 
        employee, 
        notice, 
        types, 
        layout: 'layouts/detail'});
    } else {
      let employee_id = req.body.employee_id;
      
      //category list
      let categoryList = req.body.categories;

    //logic to check for amount and set status
    let getAmount = req.body.amount,
        getStatus = '';
  
        if(getAmount < 1000){getStatus = 'approved';}
        else{getStatus = 'pending'}
      
     let expense = await models.Expense.create({
             details: req.body.details,
             amount: req.body.amount,
             EmployeeId: req.body.employee_id,
             DepartmentId: req.body.department_id,
             TypeId: req.body.type_id,
             status: getStatus,
  
         });


         //checking if only 1 category has been selected
        // if only one category then use the simple case scenario
        if (categoryList.length == 1) {
             // check if we have that category in our database
             const category = await models.Category.findById(req.body.categories);
             if (!category) {
              return res.status(400);
             }
             //otherwise add new entry inside PostCategory table
             await expense.addCategory(category);

             //redirect to employee detail page
            res.redirect('/employee/' + employee_id);
        } else {
          // Loop through all the ids in req.body.categories i.e. the selected categories
          await req.body.categories.forEach(async (id) => {
              // check if all category selected are in the database
              const category = await models.Category.findById(id);
              if (!category) {
                return res.status(400);
              }
              // add to PostCategory after
              await expense.addCategory(category);
              });
              //redirect to employee detail page
            res.redirect('/employee/' + employee_id);
          }
             
            //redirect to employee detail page
            //res.redirect('/employee/' + employee_id);
    }
    
    
  }
] 

// Display Expense delete  GET.
exports.expense_delete_post = (req, res, next) => {
  models.Expense.destroy({
     where: {
      id: req.params.expense_id
    }
  }).then(() => {
  
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
  ).then((expense) => {
         // renders an  update form
         res.render('forms/expense_form', { title: 'Update Expense', categories, departments, expense, types, layout: 'layouts/detail'});
    });
};

// Handle EXPENSE update on POST.
exports.expense_update_post =[ urlencodedParser,
  [
    check('details', 'details field cannot be empty and must be at least 3 characters long').exists().isLength({min: 3}),
    check('amount', 'enter a valid amount').isNumeric().exists()
  ],
    async(req, res, next) => {
      //store errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        const departments = await models.Department.findAll();
        const types = await models.Type.findAll();
        const categories = await models.Category.findAll();

        let expense = await models.Expense.findById(req.params.expense_id)

        const notice = errors.array();
        res.render('forms/expense_form', { title: 'Update Expense', categories, departments, expense, notice, types, layout: 'layouts/detail'});
      } else{

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
          ).then(() => { 
                  res.redirect("/expenses");
            });
    }
  }
]

// Display expense review form form on GET.
exports.expense_review_get = async (req, res, next) => {
  const departments = await models.Department.findAll();
  const types = await models.Type.findAll();
  const categories = await models.Category.findAll();

  models.Expense.findById(
          req.params.expense_id
  ).then((expense) => {
         // renders a expense review form form
         res.render('forms/expense_review_form', { title: 'Review Expense', categories, departments,  expense, types, layout: 'layouts/detail'});
    });
};

// Handle EXPENSE review on POST.
exports.expense_review_post = async (req, res, next) => {
  //find the expense
  let expense = await models.Expense.findById(req.params.expense_id);

  let categoryList = req.body.categories;

  if (categoryList.length == 1) {
    // check if we have that category in our database
    const category = await models.Category.findById(req.body.categories);
    if (!category) {
     return res.status(400);
    }
    //otherwise add new entry inside ExpenseCategory table
    await expense.addCategory(category);
    }// if more than one category has been selected
    else {
      // Loop through all the ids in req.body.categories i.e. the selected categories
      await req.body.categories.forEach(async (id) => {
          // check if all category selected are in the database
          const category = await models.Category.findById(id);
          if (!category) {
            return res.status(400);
          }
          // add to PostCategory after
          await expense.addCategory(category);
          });
      }

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
   ).then(() => { 
          res.redirect("/expenses");
    });
};

// Display list of all expenses.
exports.expense_list = async (req, res, next) => {
  models.Expense.findAll({
    include:[
      {
        model: models.Employee,
        attributes: ['id', 'first_name'],
      }
    ],
  }).then((expenses) => {
  // renders an employee list page
  console.log(`I AM ${JSON.stringify(expenses)}`)
  res.render('pages/expense_list', { title: 'Expense List', expenses, layout: 'layouts/list'} );
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
              model: models.Department,
              attributes: ['id', 'name']
            },
            {
              model: models.Type,
              attributes: ['id', 'name']
            },
            {
              model: models.Category,
              as: 'categories',
              required: false,
              // Pass in the Category attributes that you want to retrieve
              attributes: ['id', 'name'],
              through: {
                // This block of code allows you to retrieve the properties of the join table ExpenseCategory
                model: models.ExpenseCategory,
                as: 'ExpenseCategory',
                attributes: ['expense_id', 'category_id'],
              }
            }
          ]
          }
  ).then((expense) => {
  // renders an inividual employee details page
  res.render('pages/employee_detail', { title: 'Expense Details', expense, moment, layout: 'layouts/detail'} );
  });
};