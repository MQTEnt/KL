<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordSymptomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_symptom', function (Blueprint $table) {
            $table->increments('id');
            //Bệnh án
            $table->integer('record_id')->nullable()->unsigned();
            $table->foreign('record_id')->references('id')->on('records')
                        ->onDelete('cascade');

            //Chỉ triệu chứng cơ năng
            $table->integer('symptom_id')->nullable()->unsigned();
            $table->foreign('symptom_id')->references('id')->on('symptoms')
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
        Schema::drop('record_symptom');
    }
}
