<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Daily_Plant extends Model
{
    protected $table = 'daily_plant';
    protected $fillable = ['date', 'rate', 'patient_id'];
    public $timestamps = true;
}
