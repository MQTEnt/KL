<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChamSocDienbienNgaydauTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chamsoc_dienbien_ngaydau', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tien_su_di_ung');
            $table->string('tient_su_benh');
            $table->smallInteger('y_thuc');
            $table->float('p');
            $table->float('h');
            $table->float('bmi');
            $table->string('da');
            $table->boolean('chan_an');
            $table->boolean('an_kem');
            $table->boolean('buon_non');
            $table->boolean('non');
            $table->boolean('dau_bung');
            $table->boolean('tieu_chay');
            $table->boolean('tao_bon');
            $table->string('tieu_hoa_khac');
            $table->string('nuoc_tieu');
            $table->boolean('tieu_buot');
            $table->smallInteger('so_luong');
            $table->string('vet_thuong');
            $table->string('vi_tri_vet_thuong');
            $table->boolean('nhiem_trung');
            $table->boolean('hoai_tu');
            $table->string('vi_tri_nhiem_trung');
            $table->string('dau_hieu_khac');
            
            $table->date('ngay');
            $table->integer('patient_id')->unsigned();
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
        Schema::drop('dienbien_ngaydau');
    }
}
