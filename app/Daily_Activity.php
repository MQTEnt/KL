<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Daily_Activity extends Model
{
    protected $table = 'daily_activity';
    protected $fillable = ['daily_plant_id', 'acitivity_id'];
    public $timestamps = true;
    public function activity()
    {
        return $this->belongsTo('App\Activity');
    }
}
