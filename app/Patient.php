<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Patient extends Authenticatable
{
    protected $fillable = [
				'name',
				'dob',
				'address',
				'city',
				'gender',
				'id_card',
				'insurance_card',
				'job',
				'number',
				'room_id',
				'description',
				'email',
				'password',
			];
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function records()
    {
        return $this->hasMany('App\Record');
    }
}
