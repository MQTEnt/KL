<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sign extends Model
{
	protected $table = 'signs';
	protected $fillable = ['name', 'description'];
	public $timestamps = true;
}
