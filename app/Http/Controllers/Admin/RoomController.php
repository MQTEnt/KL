<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use App\Room;
use App\Http\Requests\RoomFormRequest;

class RoomController extends Controller
{
	private $admin;
	public function __construct() {
    	$this->middleware('admin');
    	$this->admin = Auth::guard('admin')->user();
    }
    public function index(){
        $rooms = Room::select()->paginate(5);
        return view('admin.rooms.index', ['admin'=> $this->admin, 'rooms' => $rooms]);
    }
    public function create(){
        return view('admin.rooms.create', ['admin'=> $this->admin]);
    }
    public function store(RoomFormRequest $request){
        Room::create([
            'name' => $request->name,
            'limit' => $request->limit,
            'description' => $request->description
        ]);
        return redirect()->route('room.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $room = Room::findOrFail($id);
        return view('admin.rooms.show', ['admin' => $this->admin, 'room' => $room]);
    }
    public function update($id, RoomFormRequest $request){
        $room = Room::findOrFail($id);
        $room->update([
            'name' => $request->name,
            'limit' => $request->limit,
            'description' => $request->description
        ]);
        return redirect()->route('room.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $room = Room::findOrFail($id);
        $room->delete();
        return redirect()->route('room.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $rooms = Room::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.rooms.index', ['admin'=> $this->admin, 'rooms' => $rooms]);
    }
}
