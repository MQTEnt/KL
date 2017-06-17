<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plants', function (Blueprint $table) {
            $table->increments('id');
            //Người lập kế hoạch
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                        ->onDelete('cascade');
            //Bệnh nhân
            $table->integer('patient_id')->unsigned();
            $table->foreign('patient_id')->references('id')->on('patients')
                        ->onDelete('cascade');

            $table->date('fromDate');
            $table->date('toDate');
            $table->string('rate');
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
        Schema::drop('plants');
    }
}
