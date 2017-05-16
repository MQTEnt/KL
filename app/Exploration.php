<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exploration extends Model
{
	protected $table = 'explorations';
	protected $fillable = ['name', 'description'];
	public $timestamps = true;
}
