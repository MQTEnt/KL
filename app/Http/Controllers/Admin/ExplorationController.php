<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Exploration;
use App\Http\Requests\ExplorationFormRequest;

class ExplorationController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $explorations = Exploration::select()->paginate(5);
        return view('admin.explorations.index', ['explorations' => $explorations]);
    }
    public function create(){
        return view('admin.explorations.create');
    }
    public function store(ExplorationFormRequest $request){
        Exploration::create([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('exploration.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $exploration = Exploration::findOrFail($id);
        return view('admin.explorations.show', ['exploration' => $exploration]);
    }
    public function update($id, ExplorationFormRequest $request){
        $exploration = Exploration::findOrFail($id);
        $exploration->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('exploration.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $exploration = Exploration::findOrFail($id);
        $exploration->delete();
        return redirect()->route('exploration.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $explorations = Exploration::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.explorations.index', ['explorations' => $explorations]);
    }
}
