<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staffs';
    protected $fillable = ['name', 'address', 'email', 'phone', 'description', 'role', 'dob', 'password'];
    public $timestamps = true;
}
