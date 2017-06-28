<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailyActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_activity', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('daily_plant_id')->nullable()->unsigned();
            $table->foreign('daily_plant_id')->references('id')->on('daily_plant')
                        ->onDelete('cascade');

            $table->integer('activity_id')->nullable()->unsigned();
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
        Schema::drop('daily_activity');
    }
}
