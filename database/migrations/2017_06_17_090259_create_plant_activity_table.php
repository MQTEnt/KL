<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlantActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plant_activity', function (Blueprint $table) {
            $table->increments('id');

            //Mã kế hoạch
            $table->integer('plant_id')->unsigned();
            $table->foreign('plant_id')->references('id')->on('plants')
                        ->onDelete('cascade');

            //Mã hoạt động
            $table->integer('activity_id')->unsigned();
            $table->foreign('activity_id')->references('id')->on('activities')
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
        Schema::drop('plant_activity');
    }
}
