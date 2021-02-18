var models  = require('../models');
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



///DEPARTMENT ROUTES///
// GET request for creating department. NOTE This must come before route for id (i.e. display department).
router.get('/department/create', department_controller.department_create_get);

// POST request for creating department
router.post('/department/create', department_controller.department_create_post);



///EMPLOYEE ROUTES///
// GET request for creating employee. NOTE This must come before route for id (i.e. display employee).
router.get('/employee/create', employee_controller.employee_create_get);

// POST request for creating employee.
router.post('/employee/create', employee_controller.employee_create_post);

// GET request for list of all Employees.
router.get('/employees', employee_controller.employee_list);

// GET request for one Employee.
router.get('/employee/:employee_id', employee_controller.employee_detail);




///EXPENSE ROUTES///
// GET request for creating expense. NOTE This must come before route for id (i.e. display expense).
router.get('/employee/:employee_id/expense/create', expense_controller.expense_create_get);

// POST request for creating employee.
router.post('/employee/:employee_id/expense/create', expense_controller.expense_create_post);



///TYPE ROUTES///
// GET request for creating type. NOTE This must come before route for id (i.e. display employee).
router.get('/type/create', type_controller.type_create_get);

// POST request for creating type
router.post('/type/create', type_controller.type_create_post);


// GET to home page.
router.get('/', post_controller.index);
module.exports = router;
