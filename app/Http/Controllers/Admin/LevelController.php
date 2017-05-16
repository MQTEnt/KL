<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Level;
use App\Index;
use App\Http\Requests\LevelFormRequest;
use Route;
use Validator;
class LevelController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');

    	$index_id = Route::current()->getParameter('index_id');
        $id = Route::current()->getParameter('id');
        $levels = Level::select(['id', 'name', 'min', 'max'])->where([
                                                    ['index_id', '=', $index_id],
                                                    ['id', '<>', $id]
                                                ])->get();
        //Exted Validators
  		Validator::extend('between_existed', function($attribute, $value, $parameters) use ($levels)
		{
            foreach($levels as $level)
            {
                if($level->min <= $value && $level->max >= $value)
                    return false;
            }
            return true;
		});

        Validator::extend('name_in_group', function($attribute, $value, $parameters) use ($levels)
        {
            foreach($levels as $level)
            {
                if($level->name == $value)
                    return false;
            }
            return true;
        });
    }

	public function create($index_id){
        $index = Index::findOrFail($index_id);
        return view('admin.levels.create', ['index' => $index]);
    }
    public function store(LevelFormRequest $request, $index_id){
        Level::create([
            'name' => $request->name,
            'max' => $request->max,
            'min' => $request->min,
            'description' => $request->description,
            'index_id' => $request->index_id
        ]);
        return redirect()->route('index.show', $index_id)->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($index_id, $id){
        $index = Index::findOrFail($index_id);
        $level = Level::findOrFail($id);
        return view('admin.levels.show', ['index' => $index, 'level' => $level]);
    }
    public function update($index_id, $id, LevelFormRequest $request){
        $level = Level::findOrFail($id);
        $level->update([
            'name' => $request->name,
            'max' => $request->max,
            'min' => $request->min,
            'description' => $request->description
        ]);
        return redirect()->route('index.show', $level->index_id)->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($index_id, $id){
        $level = Level::findOrFail($id);
        $level->delete();
        return redirect()->route('index.show', $index_id)->with(['alert' => 'Đã xóa thành công!']);
    }
}
