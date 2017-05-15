<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Symptom;
use App\Http\Requests\SymptomFormRequest;

class SymptomController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $symptoms = Symptom::select()->paginate(5);
        return view('admin.symptoms.index', ['symptoms' => $symptoms]);
    }
    public function create(){
        return view('admin.symptoms.create');
    }
    public function store(SymptomFormRequest $request){
        Symptom::create([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('symptom.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $symptom = Symptom::findOrFail($id);
        return view('admin.symptoms.show', ['symptom' => $symptom]);
    }
    public function update($id, SymptomFormRequest $request){
        $symptom = Symptom::findOrFail($id);
        $symptom->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('symptom.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $symptom = Symptom::findOrFail($id);
        $symptom->delete();
        return redirect()->route('symptom.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $symptoms = Symptom::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.symptoms.index', ['symptoms' => $symptoms]);
    }
}
