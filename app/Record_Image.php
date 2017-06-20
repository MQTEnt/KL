<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record_Image extends Model
{
	protected $table = 'record_image';
    protected $fillable = ['value', 'record_id', 'image_id'];
    public $timestamps = true;
}
