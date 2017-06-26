<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('records', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('patient_id')->nullable()->unsigned();
            $table->foreign('patient_id')->references('id')->on('patients')
                            ->onDelete('cascade');

            $table->string('outcome'); //Xác định bệnh
            $table->string('period'); //Giai đoạn bệnh
            $table->string('kidney_complication'); //Biến chứng thận
            $table->string('vascular_complication'); //Biến chứng mạch máu
            $table->string('other'); //Bệnh khác
            $table->string('description'); //Mô tả, ghi chú

            //Người khám
            $table->integer('examiner')->nullable()->unsigned();
            $table->foreign('examiner')->references('id')->on('users');

            //Trạng thái bệnh án
            //state: 0 - Bệnh án chưa được chẩn đoán
            //state: 1 - Bệnh án đã được chẩn đoán
            $table->unsignedSmallInteger('state')->default(0);

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
        Schema::drop('records');
    }
}
