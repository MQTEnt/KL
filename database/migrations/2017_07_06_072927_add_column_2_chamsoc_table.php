<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumn2ChamsocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chamsoc', function (Blueprint $table) {
            $table->string('mach');
            $table->string('nhiet_do');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chamsoc', function (Blueprint $table) {
            //
        });
    }
}
