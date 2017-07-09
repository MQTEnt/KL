<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Daily_Plant extends Model
{
    protected $table = 'daily_plant';
    protected $fillable = ['date', 'rate', 'patient_id'];
    public $timestamps = true;
    public function activities()
    {
        return $this->hasMany('App\Daily_Activity', 'daily_plant_id', 'id');
    }
}
