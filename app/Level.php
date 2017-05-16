<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
	protected $table = 'levels';
	protected $fillable = ['name', 'max', 'min', 'description', 'index_id'];
	public $timestamps = true;
}
