<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Image;
use App\Http\Requests\ImageFormRequest;

class ImageController extends Controller
{
	public function __construct() {
    	$this->middleware('admin');
    }
    public function index(){
        $images = Image::select()->paginate(5);
        return view('admin.images.index', ['images' => $images]);
    }
    public function create(){
        return view('admin.images.create');
    }
    public function store(ImageFormRequest $request){
        Image::create([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('image.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $image = Image::findOrFail($id);
        return view('admin.images.show', ['image' => $image]);
    }
    public function update($id, ImageFormRequest $request){
        $image = Image::findOrFail($id);
        $image->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return redirect()->route('image.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $image = Image::findOrFail($id);
        $image->delete();
        return redirect()->route('image.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $images = Image::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.images.index', ['images' => $images]);
    }
}
