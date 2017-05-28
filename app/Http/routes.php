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

	//Sign
	Route::get('sign/search', ['as' => 'sign.search', 'uses' => 'Admin\SignController@getSearch']);
	Route::get('sign', ['as' => 'sign.index', 'uses' => 'Admin\SignController@index']);
	Route::get('sign/create', ['as' => 'sign.create', 'uses' => 'Admin\SignController@create']);
	Route::post('sign', ['as' => 'sign.store', 'uses' => 'Admin\SignController@store']);
	Route::get('sign/{id}', ['as' => 'sign.show', 'uses' => 'Admin\SignController@show']);
	Route::put('sign/{id}', ['as' => 'sign.update', 'uses' => 'Admin\SignController@update']);
	Route::delete('sign/{id}', ['as' => 'sign.destroy', 'uses' => 'Admin\SignController@destroy']);

	//Index
	Route::get('index/search', ['as' => 'index.search', 'uses' => 'Admin\IndexController@getSearch']);
	Route::get('index', ['as' => 'index.index', 'uses' => 'Admin\IndexController@index']);
	Route::get('index/create', ['as' => 'index.create', 'uses' => 'Admin\IndexController@create']);
	Route::post('index', ['as' => 'index.store', 'uses' => 'Admin\IndexController@store']);
	Route::get('index/{id}', ['as' => 'index.show', 'uses' => 'Admin\IndexController@show']);
	Route::put('index/{id}', ['as' => 'index.update', 'uses' => 'Admin\IndexController@update']);
	Route::delete('index/{id}', ['as' => 'index.destroy', 'uses' => 'Admin\IndexController@destroy']);

	//Level
	Route::get('level/show/{index_id}/{id}', ['as' => 'level.show', 'uses' => 'Admin\LevelController@show']);
	Route::put('level/update/{index_id}/{id}', ['as' => 'level.update', 'uses' => 'Admin\LevelController@update']);
	Route::get('level/create/{index_id}', ['as' => 'level.create', 'uses' => 'Admin\LevelController@create']);
	Route::post('level/store/{index_id}', ['as' => 'level.store', 'uses' => 'Admin\LevelController@store']);
	Route::delete('level/delete/{index_id}/{id}', ['as' => 'level.destroy', 'uses' => 'Admin\LevelController@destroy']);

	//Exploration
	Route::get('exploration/search', ['as' => 'exploration.search', 'uses' => 'Admin\ExplorationController@getSearch']);
	Route::get('exploration', ['as' => 'exploration.index', 'uses' => 'Admin\ExplorationController@index']);
	Route::get('exploration/create', ['as' => 'exploration.create', 'uses' => 'Admin\ExplorationController@create']);
	Route::post('exploration', ['as' => 'exploration.store', 'uses' => 'Admin\ExplorationController@store']);
	Route::get('exploration/{id}', ['as' => 'exploration.show', 'uses' => 'Admin\ExplorationController@show']);
	Route::put('exploration/{id}', ['as' => 'exploration.update', 'uses' => 'Admin\ExplorationController@update']);
	Route::delete('exploration/{id}', ['as' => 'exploration.destroy', 'uses' => 'Admin\ExplorationController@destroy']);

	//Image
	Route::get('image/search', ['as' => 'image.search', 'uses' => 'Admin\ImageController@getSearch']);
	Route::get('image', ['as' => 'image.index', 'uses' => 'Admin\ImageController@index']);
	Route::get('image/create', ['as' => 'image.create', 'uses' => 'Admin\ImageController@create']);
	Route::post('image', ['as' => 'image.store', 'uses' => 'Admin\ImageController@store']);
	Route::get('image/{id}', ['as' => 'image.show', 'uses' => 'Admin\ImageController@show']);
	Route::put('image/{id}', ['as' => 'image.update', 'uses' => 'Admin\ImageController@update']);
	Route::delete('image/{id}', ['as' => 'image.destroy', 'uses' => 'Admin\ImageController@destroy']);
});


/* 
 * User (Staff) Login/Logout
 */
Route::auth();
Route::get('login', 'Auth\AuthController@getLogin');


/* 
 * 
 */
Route::get('/home', 'HomeController@index');

Route::get('/staff', function(){
	return view('staff.index');
})->middleware(['auth']);

/*
 * API
 */
Route::group(['middleware' => ['auth']], function(){
	Route::get('patient/searchName', ['as' => 'patient.search', 'uses' => 'Staff\PatientController@getSearchName']);
	Route::get('patient/search', ['as' => 'patient.search', 'uses' => 'Staff\PatientController@getSearch']);
	Route::get('patient', ['as' => 'patient.index', 'uses' => 'Staff\PatientController@index']);
	// Route::get('patient/create', ['as' => 'patient.create', 'uses' => 'Staff\PatientController@create']);
	Route::post('patient', ['as' => 'patient.store', 'uses' => 'Staff\PatientController@store']);
	// Route::get('patient/{id}', ['as' => 'patient.show', 'uses' => 'Staff\PatientController@show']);
	Route::put('patient/{id}', ['as' => 'patient.update', 'uses' => 'Staff\PatientController@update']);
	Route::delete('patient/{id}', ['as' => 'patient.destroy', 'uses' => 'Staff\PatientController@destroy']);

	Route::get('staff/user', function(Illuminate\Http\Request $request){
		$user = Auth::user();
		return $user;
	});

	Route::get('/room', function(){
	return App\Room::all();
	});
});
