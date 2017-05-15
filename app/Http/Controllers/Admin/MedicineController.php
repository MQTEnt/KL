<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Medicine;
use App\Http\Requests\MedicineFormRequest;
class MedicineController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $medicines = Medicine::select()->paginate(5);
        return view('admin.medicines.index', ['medicines' => $medicines]);
    }
    public function create(){
        return view('admin.medicines.create');
    }
    public function store(MedicineFormRequest $request){
        Medicine::create([
            'name' => $request->name,
            'indications' => $request->indications,
            'contraindications' => $request->contraindications,
            'unit' => $request->unit,
            'dosage_and_administration' => $request->dosage_and_administration,
            'description' => $request->description
        ]);
        return redirect()->route('medicine.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $medicine = Medicine::findOrFail($id);
        return view('admin.medicines.show', ['medicine' => $medicine]);
    }
    public function update($id, MedicineFormRequest $request){
        $medicine = Medicine::findOrFail($id);
        $medicine->update([
            'name' => $request->name,
            'indications' => $request->indications,
            'contraindications' => $request->contraindications,
            'unit' => $request->unit,
            'dosage_and_administration' => $request->dosage_and_administration,
            'description' => $request->description
        ]);
        return redirect()->route('medicine.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $medicine = Medicine::findOrFail($id);
        $medicine->delete();
        return redirect()->route('medicine.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $medicines = Medicine::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.medicines.index', ['medicines' => $medicines]);
    }
}
