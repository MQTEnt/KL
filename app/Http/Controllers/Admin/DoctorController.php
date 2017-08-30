<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Requests\UserFormRequest;
use App\Record;
use App\Care;
use App\Plant;

class DoctorController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $doctors = User::select()->where('role', 1)->paginate(5);
        return view('admin.doctors.index', ['doctors' => $doctors]);
    }
    public function create(){
        return view('admin.doctors.create');
    }
    public function store(UserFormRequest $request){
        User::create([
            'name' => $request->name,
            'dob' => date_format(date_create($request->dob),"Y-m-d"),
            'address' => $request->address,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'description' => $request->description,
            'role' => 1
        ]);
        return redirect()->route('doctor.index')->with(['alert' => 'Đã thêm thành công!', 'type' => 'callout-success']);
    }
    public function show($id){
        $doctor = User::findOrFail($id);
        return view('admin.doctors.show', ['doctor' => $doctor]);
    }
    public function update($id, UserFormRequest $request){
        $doctor = User::findOrFail($id);
        $doctor->update([
            'name' => $request->name,
            'dob' => date_format(date_create($request->dob),"Y-m-d"),
            'email' => $request->email,
            'phone' => $request->phone,
            'description' => $request->description,
            'address' => $request->address,
            'password' => ($doctor->password == $request->password)? $doctor->password : bcrypt($request->password),
        ]);
        return redirect()->route('doctor.index')->with(['alert' => 'Đã cập nhật thành công!', 'type' => 'callout-success']);
    }
    public function destroy($id){
        $doctor = User::findOrFail($id);
        $alert = [
                    'alert' => 'Không thể xóa vì bác sĩ này có liên quan tới một hoạt động khám hoặc điều trị!',
                    'type' => 'callout-danger'
                ];
        $record = Record::select('*')->where('examiner', '=', $id)->first();
        if(!is_null($record)){
            return redirect()->route('doctor.index')->with($alert);
        }
        $plan = Plant::select('*')->where('user_id', '=', $id)->first();
        if(!is_null($plan)){
            return redirect()->route('doctor.index')->with($alert);
        }
        $care = Care::select('*')->where('staff_id', '=', $id)->first();
        if(!is_null($care)){
            return redirect()->route('doctor.index')->with($alert);
        }
        $doctor->delete();
        return redirect()->route('doctor.index')->with(['alert' => 'Đã xóa thành công!', 'type' => 'callout-success']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $doctors = User::where([
            ['name', 'LIKE', '%'.$query.'%'],
            ['role', '=', 1]])->paginate(5);
        return view('admin.doctors.index', ['doctors' => $doctors]);
    }
}
