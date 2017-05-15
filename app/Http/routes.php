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

	//Medicine
	Route::get('medicine/search', ['as' => 'medicine.search', 'uses' => 'Admin\MedicineController@getSearch']);
	Route::get('medicine', ['as' => 'medicine.index', 'uses' => 'Admin\MedicineController@index']);
	Route::get('medicine/create', ['as' => 'medicine.create', 'uses' => 'Admin\MedicineController@create']);
	Route::post('medicine', ['as' => 'medicine.store', 'uses' => 'Admin\MedicineController@store']);
	Route::get('medicine/{id}', ['as' => 'medicine.show', 'uses' => 'Admin\MedicineController@show']);
	Route::put('medicine/{id}', ['as' => 'medicine.update', 'uses' => 'Admin\MedicineController@update']);
	Route::delete('medicine/{id}', ['as' => 'medicine.destroy', 'uses' => 'Admin\MedicineController@destroy']);

	//Room
	Route::get('room/search', ['as' => 'room.search', 'uses' => 'Admin\RoomController@getSearch']);
	Route::get('room', ['as' => 'room.index', 'uses' => 'Admin\RoomController@index']);
	Route::get('room/create', ['as' => 'room.create', 'uses' => 'Admin\RoomController@create']);
	Route::post('room', ['as' => 'room.store', 'uses' => 'Admin\RoomController@store']);
	Route::get('room/{id}', ['as' => 'room.show', 'uses' => 'Admin\RoomController@show']);
	Route::put('room/{id}', ['as' => 'room.update', 'uses' => 'Admin\RoomController@update']);
	Route::delete('room/{id}', ['as' => 'room.destroy', 'uses' => 'Admin\RoomController@destroy']);

	//Activity
	Route::get('activity/search', ['as' => 'activity.search', 'uses' => 'Admin\ActivityController@getSearch']);
	Route::get('activity', ['as' => 'activity.index', 'uses' => 'Admin\ActivityController@index']);
	Route::get('activity/create', ['as' => 'activity.create', 'uses' => 'Admin\ActivityController@create']);
	Route::post('activity', ['as' => 'activity.store', 'uses' => 'Admin\ActivityController@store']);
	Route::get('activity/{id}', ['as' => 'activity.show', 'uses' => 'Admin\ActivityController@show']);
	Route::put('activity/{id}', ['as' => 'activity.update', 'uses' => 'Admin\ActivityController@update']);
	Route::delete('activity/{id}', ['as' => 'activity.destroy', 'uses' => 'Admin\ActivityController@destroy']);

	//Symptom
	Route::get('symptom/search', ['as' => 'symptom.search', 'uses' => 'Admin\SymptomController@getSearch']);
	Route::get('symptom', ['as' => 'symptom.index', 'uses' => 'Admin\SymptomController@index']);
	Route::get('symptom/create', ['as' => 'symptom.create', 'uses' => 'Admin\SymptomController@create']);
	Route::post('symptom', ['as' => 'symptom.store', 'uses' => 'Admin\SymptomController@store']);
	Route::get('symptom/{id}', ['as' => 'symptom.show', 'uses' => 'Admin\SymptomController@show']);
	Route::put('symptom/{id}', ['as' => 'symptom.update', 'uses' => 'Admin\SymptomController@update']);
	Route::delete('symptom/{id}', ['as' => 'symptom.destroy', 'uses' => 'Admin\SymptomController@destroy']);
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
