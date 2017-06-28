<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailyPlantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_plant', function (Blueprint $table) {
            $table->increments('id');
            $table->string('rate');
            $table->date('date');
            
            $table->integer('patient_id')->nullable()->unsigned();
            $table->foreign('patient_id')->references('id')->on('patients')
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
        Schema::drop('daily_plant');
    }
}
