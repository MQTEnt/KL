<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record_Sign extends Model
{
    protected $table = 'record_sign';
    protected $fillable = ['record_id', 'sign_id'];
    public $timestamps = true;
}
