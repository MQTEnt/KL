<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnChamsocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chamsoc', function (Blueprint $table) {
            $table->boolean('noi_quy');
            $table->boolean('thuoc_uong');
            $table->boolean('thuoc_tiem');
            $table->time('bd_truyen_dich');
            $table->time('kt_truyen_dich');
            $table->boolean('truyen_dich_an_toan');
            $table->string('truyen_dich_khac');
            $table->string('thay_bang');
            $table->string('dinh_duong');
            $table->boolean('hh');
            $table->boolean('hs');
            $table->boolean('vs');
            $table->string('xet_nghiem_khac');
            $table->string('ve_sinh_ca_nhan');
            $table->string('cham_soc_khac');
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
