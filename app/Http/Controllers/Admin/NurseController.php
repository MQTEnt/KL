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

class NurseController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $nurses = User::select()->where('role', 2)->paginate(5);
        return view('admin.nurses.index', ['nurses' => $nurses]);
    }
    public function create(){
        return view('admin.nurses.create');
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
            'role' => 2
        ]);
        return redirect()->route('nurse.index')->with(['alert' => 'Đã thêm thành công!', 'type' => 'callout-success']);
    }
    public function show($id){
        $nurse = User::findOrFail($id);
        return view('admin.nurses.show', ['nurse' => $nurse]);
    }
    public function update($id, UserFormRequest $request){
        $nurse = User::findOrFail($id);
        $nurse->update([
            'name' => $request->name,
            'dob' => date_format(date_create($request->dob),"Y-m-d"),
            'email' => $request->email,
            'phone' => $request->phone,
            'description' => $request->description,
            'address' => $request->address,
            'password' => ($nurse->password == $request->password)? $nurse->password : bcrypt($request->password),
        ]);
        return redirect()->route('nurse.index')->with(['alert' => 'Đã cập nhật thành công!', 'type' => 'callout-success']);
    }
    public function destroy($id){
        $nurse = User::findOrFail($id);
        $alert = [
                    'alert' => 'Không thể xóa vì điều dưỡng viên này có liên quan tới một hoạt động khám hoặc điều trị!',
                    'type' => 'callout-danger'
                ];
        $record = Record::select('*')->where('examiner', '=', $id)->first();
        if(!is_null($record)){
            return redirect()->route('nurse.index')->with($alert);
        }
        $plan = Plant::select('*')->where('user_id', '=', $id)->first();
        if(!is_null($plan)){
            return redirect()->route('nurse.index')->with($alert);
        }
        $care = Care::select('*')->where('staff_id', '=', $id)->first();
        if(!is_null($care)){
            return redirect()->route('nurse.index')->with($alert);
        }
        $nurse->delete();
        return redirect()->route('nurse.index')->with(['alert' => 'Đã xóa thành công!', 'type' => 'callout-success']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $nurses = User::where([
            ['name', 'LIKE', '%'.$query.'%'],
            ['role', '=', 2]])->paginate(5);
        return view('admin.nurses.index', ['nurses' => $nurses]);
    }
}
