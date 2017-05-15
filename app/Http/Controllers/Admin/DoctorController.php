<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Staff;
use App\Http\Requests\StaffFormRequest;
class DoctorController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $doctors = Staff::select()->where('role', 1)->paginate(5);
        return view('admin.doctors.index', ['doctors' => $doctors]);
    }
    public function create(){
        return view('admin.doctors.create');
    }
    public function store(StaffFormRequest $request){
        Staff::create([
            'name' => $request->name,
            'dob' => date_format(date_create($request->dob),"Y-m-d"),
            'address' => $request->address,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'description' => $request->description,
            'role' => 1
        ]);
        return redirect()->route('doctor.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $doctor = Staff::findOrFail($id);
        return view('admin.doctors.show', ['doctor' => $doctor]);
    }
    public function update($id, StaffFormRequest $request){
        $doctor = Staff::findOrFail($id);
        $doctor->update([
            'name' => $request->name,
            'dob' => date_format(date_create($request->dob),"Y-m-d"),
            'email' => $request->email,
            'phone' => $request->phone,
            'description' => $request->description,
            'address' => $request->address,
            'password' => ($doctor->password == $request->password)? $doctor->password : bcrypt($request->password),
        ]);
        return redirect()->route('doctor.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $doctor = Staff::findOrFail($id);
        $doctor->delete();
        return redirect()->route('doctor.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $doctors = Staff::where([
            ['name', 'LIKE', '%'.$query.'%'],
            ['role', '=', 1]])->paginate(5);
        return view('admin.doctors.index', ['doctors' => $doctors]);
    }
}
