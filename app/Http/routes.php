<?php

Route::get('/', function () {
    return view('welcome');
});

/*
* Staffs Login
*/
// Route::get('staff/login','Admin\AuthController@getLogin');
// Route::post('staff/login','Admin\AuthController@postLogin');
// Route::get('staff/register','Admin\AuthController@getRegister');
// Route::post('staff/register','Admin\AuthController@postRegister');

// Route::get('staff/dashboard','AdminController@getIndex');
// Route::get('staff/logout','AdminController@getLogout');

/*
* Admin Login/Logout
*/
Route::get('admin/login','Admin\AuthController@getLogin');
Route::post('admin/login','Admin\AuthController@postLogin');
Route::get('admin/dashboard','AdminController@getIndex');
Route::get('admin/logout','AdminController@getLogout');


Route::auth();
Route::get('login', 'Auth\AuthController@getLogin');

Route::get('/home', 'HomeController@index');

