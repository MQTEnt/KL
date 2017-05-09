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
 * Admin
 */
Route::group(['prefix' => 'admin'], function () {
	//Login - Logout
	Route::get('login','Admin\AuthController@getLogin');
	Route::post('login','Admin\AuthController@postLogin');
	Route::get('logout','AdminController@getLogout');
	//Dashboard
	Route::get('dashboard', ['as' => 'admin.dashboard.index', 'uses' => 'AdminController@getIndex']);
	//Doctor
	Route::get('doctor/search', ['as' => 'doctor.search', 'uses' => 'Admin\DoctorController@getSearch']);
	Route::get('doctor', ['as' => 'doctor.index', 'uses' => 'Admin\DoctorController@index']);
	Route::get('doctor/create', ['as' => 'doctor.create', 'uses' => 'Admin\DoctorController@create']);
	Route::post('doctor', ['as' => 'doctor.store', 'uses' => 'Admin\DoctorController@store']);
	Route::get('doctor/{id}', ['as' => 'doctor.show', 'uses' => 'Admin\DoctorController@show']);
	Route::put('doctor/{id}', ['as' => 'doctor.update', 'uses' => 'Admin\DoctorController@update']);
	Route::delete('doctor/{id}', ['as' => 'doctor.destroy', 'uses' => 'Admin\DoctorController@destroy']);

	//Nurse
	Route::get('nurse/search', ['as' => 'nurse.search', 'uses' => 'Admin\NurseController@getSearch']);
	Route::get('nurse', ['as' => 'nurse.index', 'uses' => 'Admin\NurseController@index']);
	Route::get('nurse/create', ['as' => 'nurse.create', 'uses' => 'Admin\NurseController@create']);
	Route::post('nurse', ['as' => 'nurse.store', 'uses' => 'Admin\NurseController@store']);
	Route::get('nurse/{id}', ['as' => 'nurse.show', 'uses' => 'Admin\NurseController@show']);
	Route::put('nurse/{id}', ['as' => 'nurse.update', 'uses' => 'Admin\NurseController@update']);
	Route::delete('nurse/{id}', ['as' => 'nurse.destroy', 'uses' => 'Admin\NurseController@destroy']);

});

/* 
 * User Login/Logout
 */
Route::auth();
Route::get('login', 'Auth\AuthController@getLogin');


/* 
 * 
 */
Route::get('/home', 'HomeController@index');
