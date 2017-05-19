<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Requests\UserFormRequest;

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
        return redirect()->route('nurse.index')->with(['alert' => 'Đã thêm thành công!']);
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
        return redirect()->route('nurse.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $nurse = User::findOrFail($id);
        $nurse->delete();
        return redirect()->route('nurse.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $nurses = User::where([
            ['name', 'LIKE', '%'.$query.'%'],
            ['role', '=', 2]])->paginate(5);
        return view('admin.nurses.index', ['nurses' => $nurses]);
    }
}
