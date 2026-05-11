<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profils', function (Blueprint $table) {

            // Supprimer les clés étrangères
            $table->dropForeign(['langue_id']);
            $table->dropForeign(['qualite_id']);
            $table->dropForeign(['etude_id']);
            $table->dropForeign(['exp_id']);
            $table->dropForeign(['competence_id']);
            $table->dropForeign(['loisirs_id']);

            // Supprimer les anciennes colonnes
            $table->dropColumn([
                'langue_id',
                'qualite_id',
                'etude_id',
                'exp_id',
                'competence_id',
                'loisirs_id'
            ]);
        });

        Schema::table('profils', function (Blueprint $table) {

            // Ajouter les nouvelles colonnes JSON
            $table->json('langue_id')->nullable()->after('desc');
            $table->json('qualite_id')->nullable()->after('langue_id');
            $table->json('etude_id')->nullable()->after('qualite_id');
            $table->json('exp_id')->nullable()->after('etude_id');
            $table->json('competence_id')->nullable()->after('exp_id');
            $table->json('loisirs_id')->nullable()->after('competence_id');
        });
    }

    public function down(): void
    {
        Schema::table('profils', function (Blueprint $table) {
            $table->dropColumn([
                'langue_id', 'qualite_id', 'etude_id',
                'exp_id', 'competence_id', 'loisirs_id'
            ]);
        });

        Schema::table('profils', function (Blueprint $table) {
            $table->unsignedBigInteger('langue_id')->nullable();
            $table->unsignedBigInteger('qualite_id')->nullable();
            $table->unsignedBigInteger('etude_id')->nullable();
            $table->unsignedBigInteger('exp_id')->nullable();
            $table->unsignedBigInteger('competence_id')->nullable();
            $table->unsignedBigInteger('loisirs_id')->nullable();
        });
    }
};
