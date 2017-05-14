<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use App\Activity;
use App\Http\Requests\ActivityFormRequest;
class ActivityController extends Controller
{
	private $admin;
	public function __construct() {
    	$this->middleware('admin');
    	$this->admin = Auth::guard('admin')->user();
    }
    public function index(){
        $activities = Activity::select()->paginate(5);
        return view('admin.activities.index', ['admin'=> $this->admin, 'activities' => $activities]);
    }
    public function create(){
        return view('admin.activities.create', ['admin'=> $this->admin]);
    }
    public function store(ActivityFormRequest $request){
        Activity::create([
            'name' => $request->name,
            'content' => $request->content,
            'description' => $request->description
        ]);
        return redirect()->route('activity.index')->with(['alert' => 'Đã thêm thành công!']);
    }
    public function show($id){
        $activity = Activity::findOrFail($id);
        return view('admin.activities.show', ['admin' => $this->admin, 'activity' => $activity]);
    }
    public function update($id, ActivityFormRequest $request){
        $activity = Activity::findOrFail($id);
        $activity->update([
            'name' => $request->name,
            'content' => $request->content,
            'description' => $request->description
        ]);
        return redirect()->route('activity.index')->with(['alert' => 'Đã cập nhật thành công!']);
    }
    public function destroy($id){
        $activity = Activity::findOrFail($id);
        $activity->delete();
        return redirect()->route('activity.index')->with(['alert' => 'Đã xóa thành công!']);
    }
    public function getSearch(Request $request){
        $query = $request->q;
        $activities = Activity::where([
            ['name', 'LIKE', '%'.$query.'%']])->paginate(5);
        return view('admin.activities.index', ['admin'=> $this->admin, 'activities' => $activities]);
    }
}
