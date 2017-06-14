<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record_Symptom extends Model
{
	protected $table = 'record_symptom';
    protected $fillable = ['record_id', 'symptom_id'];
    public $timestamps = true;
}
