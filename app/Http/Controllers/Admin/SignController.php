<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Sign;
use App\Http\Requests\SignFormRequest;

class SignController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $signs = Sign::select()->paginate(5);
        return view('admin.signs.index', ['signs' => $signs]);
    }
    public function create(){
        return view('admin.signs.create');
    }
    public function store(SignFormRequest $request){
        Sign::create([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('sign.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $sign = Sign::findOrFail($id);
        return view('admin.signs.show', ['sign' => $sign]);
    }
    public function update($id, SignFormRequest $request){
        $sign = Sign::findOrFail($id);
        $sign->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('sign.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $sign = Sign::findOrFail($id);
        $sign->delete();
        return redirect()->route('sign.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $sign = Sign::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.sign.index', ['sign' => $sign]);
    }
}
