<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $table = 'records';
    protected $fillable = ['patient_id'];
    public $timestamps = true;

    public function patient()
    {
        return $this->belongsTo('App\Patient');
    }
}
