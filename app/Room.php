<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
	protected $table = 'rooms';
	protected $fillable = ['name', 'limit', 'description'];
	public $timestamps = true;
}
