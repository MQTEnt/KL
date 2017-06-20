<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record_Exploration extends Model
{
	protected $table = 'record_exploration';
    protected $fillable = ['value', 'record_id', 'exploration_id'];
    public $timestamps = true;
}
