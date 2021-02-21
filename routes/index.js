//var models  = require('../models');
var express = require('express');
var router  = express.Router();

//import controllers
var category_controller = require('../controllers/categoryController'); 
var department_controller = require('../controllers/departmentController'); 
var employee_controller = require('../controllers/employeeController'); 
var expense_controller = require('../controllers/expenseController'); 
var post_controller = require('../controllers/postController'); 
var type_controller = require('../controllers/typeController'); 


///CATEGORY ROUTES///
// GET request for creating category. NOTE This must come before route for id (i.e. display employee).
router.get('/category/create', category_controller.category_create_get);

// POST request for creating category
router.post('/category/create', category_controller.category_create_post);

// POST request to delete Category.
router.get('/category/:category_id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:category_id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:category_id/update', category_controller.category_update_post);


// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);

// GET request for one Category.
router.get('/category/:category_id', category_controller.category_detail);




///DEPARTMENT ROUTES///
// GET request for creating department. NOTE This must come before route for id (i.e. display department).
router.get('/department/create', department_controller.department_create_get);

// POST request for creating department
router.post('/department/create', department_controller.department_create_post);

// POST request to delete department.
router.get('/department/:department_id/delete', department_controller.department_delete_post);

// GET request for list of all Expenses.
router.get('/departments', department_controller.department_list);





///EMPLOYEE ROUTES///
// GET request for creating employee. NOTE This must come before route for id (i.e. display employee).
router.get('/employee/create', employee_controller.employee_create_get);

// POST request for creating employee.
router.post('/employee/create', employee_controller.employee_create_post);

// POST request to delete Employee.
router.get('/employee/:employee_id/delete', employee_controller.employee_delete_post);

// GET request to update Employee.
router.get('/employee/:employee_id/update', employee_controller.employee_update_get);

// POST request to update Employee.
router.post('/employee/:employee_id/update', employee_controller.employee_update_post);

// GET request for list of all Employees.
router.get('/employees', employee_controller.employee_list);

// GET request for one Employee.
router.get('/employee/:employee_id', employee_controller.employee_detail);





///EXPENSE ROUTES///
// GET request for creating expense. NOTE This must come before route for id (i.e. display expense).
router.get('/employee/:employee_id/expense/create', expense_controller.expense_create_get);

// POST request for creating employee.
router.post('/employee/:employee_id/expense/create', expense_controller.expense_create_post);

// POST request to delete Expense.
router.get('/employee/:employee_id/expense/:expense_id/delete', expense_controller.expense_delete_post);

// GET request to update Expense.
router.get('/expense/:expense_id/update', expense_controller.expense_update_get);

// POST request to update Employee.
router.post('/expense/:expense_id/update', expense_controller.expense_update_post);

// GET request to REVIEW Expense.
router.get('/expense/:expense_id/review', expense_controller.expense_review_get);

// POST request to REVIEW Category.
router.post('/expense/:expense_id/review', expense_controller.expense_review_post);

// GET request for list of all Expenses.
router.get('/expenses', expense_controller.expense_list);

// GET request for one Expense.
router.get('/employee/:employee_id/expense/:expense_id', expense_controller.expense_detail);





///TYPE ROUTES///
// GET request for creating type. NOTE This must come before route for id (i.e. display employee).
router.get('/type/create', type_controller.type_create_get);

// POST request for creating type
router.post('/type/create', type_controller.type_create_post);

// POST request to delete Type.
router.get('/type/:type_id/delete', type_controller.type_delete_post);

// GET request to update type.
router.get('/type/:type_id/update', type_controller.type_update_get);

// POST request to update type.
router.post('/type/:type_id/update', type_controller.type_update_post);

// GET request for list of all Types.
router.get('/types', type_controller.type_list);

// GET request for one Type.
router.get('/type/:type_id', type_controller.type_detail);



// GET to home page.
router.get('/', employee_controller.index);
module.exports = router;
