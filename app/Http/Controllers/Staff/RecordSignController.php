<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Record_Sign;
use DB;
class RecordSignController extends Controller
{
    public function update($record_id, Request $request){
		$addArrRaw = json_decode($request->addArr, true);
		$addArr = [];
		$deleteArr = json_decode($request->deleteArr, true);
		if(count($addArrRaw) > 0)
		{
			foreach($addArrRaw as $item)
				array_push($addArr, ['record_id' => $record_id, 'sign_id' => $item]);
			Record_Sign::insert($addArr);
		}
		if(count($deleteArr) > 0)
			Record_Sign::destroy($deleteArr);

		//Response
		$signs = DB::table('signs')
		            ->leftJoin(DB::raw("(SELECT * FROM record_sign WHERE record_id = $record_id) AS temp_tbl"), 'signs.id', '=', 'temp_tbl.sign_id')
		            ->select('signs.id AS index_id', 'signs.name', 'temp_tbl.id AS id')
		            ->orderBy('index_id')
		            ->get();
        return ['state' => 1, 'list' => $signs];
	}
}
