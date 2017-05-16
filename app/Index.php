<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Index extends Model
{
	protected $table = 'indexes';
	protected $fillable = ['name', 'unit', 'description'];
	public $timestamps = true;

	public function levels()
    {
        return $this->hasMany('App\Level');
    }
}
