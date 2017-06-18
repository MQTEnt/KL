<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
	protected $table = 'plants';
    protected $fillable = ['user_id', 'patient_id', 'fromDate', 'toDate', 'rate'];
    public $timestamps = true;
    public function plant_activity()
    {
        return $this->hasMany('App\Plant_Activity');
    }
}
