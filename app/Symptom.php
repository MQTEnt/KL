<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Symptom extends Model
{
	protected $table = 'symptoms';
	protected $fillable = ['name', 'description'];
	public $timestamps = true;
}
