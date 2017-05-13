<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    protected $table = 'medicines';
    protected $fillable = ['name', 'indications', 'contraindications', 'unit', 'dosage_and_administration', 'description'];
    public $timestamps = true;
}
