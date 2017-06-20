<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordExplorationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_exploration', function (Blueprint $table) {
            $table->increments('id');
            //Bệnh án
            $table->integer('record_id')->nullable()->unsigned();
            $table->foreign('record_id')->references('id')->on('records')
                        ->onDelete('cascade');

            $table->integer('exploration_id')->nullable()->unsigned();
            $table->foreign('exploration_id')->references('id')->on('explorations')
                        ->onDelete('cascade');

            $table->string('value');
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
        Schema::drop('record_exploration');
    }
}
