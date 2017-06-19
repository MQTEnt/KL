<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordImageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_image', function (Blueprint $table) {
            $table->increments('id');
            //Bệnh án
            $table->integer('record_id')->nullable()->unsigned();
            $table->foreign('record_id')->references('id')->on('records')
                        ->onDelete('cascade');

            //Chỉ số xét nghiệp
            $table->integer('image_id')->nullable()->unsigned();
            $table->foreign('image_id')->references('id')->on('images')
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
        Schema::drop('record_image');
    }
}
