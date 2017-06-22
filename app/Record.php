<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $table = 'records';
    protected $fillable = ['patient_id', 'outcome', 'period', 'vascular_complication', 'kidney_complication', 'other', 'state', 'examiner'];
    public $timestamps = true;

    public function patient()
    {
        return $this->belongsTo('App\Patient');
    }
}
