<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profils', function (Blueprint $table) {
            $table->unsignedBigInteger('competence_id')->after('exp_id');
            $table->unsignedBigInteger('loisirs_id')->after('competence_id');

            $table->foreign('competence_id')->references('competence_id')->on('competences')->onDelete('cascade');
            $table->foreign('loisirs_id')->references('loisirs_id')->on('loisirs')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('profils', function (Blueprint $table) {
            $table->dropForeign(['competence_id']);
            $table->dropForeign(['loisirs_id']);
            $table->dropColumn(['competence_id', 'loisirs_id']);
        });
    }
};
