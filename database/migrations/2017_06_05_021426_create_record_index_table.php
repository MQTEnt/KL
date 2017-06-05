<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordIndexTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('record_index', function (Blueprint $table) {
            $table->increments('id');
            //Bệnh án
            $table->integer('record_id')->nullable()->unsigned();
            $table->foreign('record_id')->references('id')->on('records')
                        ->onDelete('cascade');

            //Chỉ số xét nghiệp
            $table->integer('index_id')->nullable()->unsigned();
            $table->foreign('index_id')->references('id')->on('indexes')
                        ->onDelete('cascade');

            $table->string('value');

            //Người nhập chỉ số
            $table->integer('submitter')->nullable()->unsigned();
            $table->foreign('submitter')->references('id')->on('users');

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
        Schema::drop('record_index');
    }
}
