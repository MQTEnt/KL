<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordSignTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_sign', function (Blueprint $table) {
            $table->increments('id');
            //Bệnh án
            $table->integer('record_id')->nullable()->unsigned();
            $table->foreign('record_id')->references('id')->on('records')
                        ->onDelete('cascade');

            //Triệu chứng thực thể
            $table->integer('sign_id')->nullable()->unsigned();
            $table->foreign('sign_id')->references('id')->on('signs')
                        ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('record_sign');
    }
}
