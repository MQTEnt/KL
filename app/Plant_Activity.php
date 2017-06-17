<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plant_Activity extends Model
{
    protected $table = 'plant_activity';
    protected $fillable = ['plant_id', 'activity_id'];
    public $timestamps = true;
}
