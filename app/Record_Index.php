<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record_Index extends Model
{
    protected $table = 'record_index';
    protected $fillable = ['value', 'record_id', 'index_id', 'submitter'];
    public $timestamps = true;
}
