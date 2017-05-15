<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Index;
use App\Http\Requests\IndexFormRequest;

class IndexController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $indexes = Index::select()->paginate(5);
        return view('admin.indexes.index', ['indexes' => $indexes]);
    }
    public function create(){
        return view('admin.indexes.create');
    }
    public function store(IndexFormRequest $request){
        Index::create([
            'name' => $request->name,
            'unit' => $request->unit,
            'description' => $request->description
        ]);
        return redirect()->route('index.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $index = Index::findOrFail($id);
        return view('admin.indexes.show', ['index' => $index]);
    }
    public function update($id, IndexFormRequest $request){
        $index = Index::findOrFail($id);
        $index->update([
            'name' => $request->name,
            'unit' => $request->unit,
            'description' => $request->description
        ]);
        return redirect()->route('index.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $index = Index::findOrFail($id);
        $index->delete();
        return redirect()->route('index.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $indexes = Index::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.indexes.index', ['indexes' => $indexes]);
    }
}
