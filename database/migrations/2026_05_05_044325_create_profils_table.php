<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils', function (Blueprint $table) {
            $table->id('profil_id');                // INT auto-increment PK
            $table->string('nom');                  // VARCHAR
            $table->string('prenom');               // VARCHAR
            $table->string('sexe');                 // VARCHAR
            $table->string('email')->unique();      // VARCHAR unique
            $table->string('photo')->nullable();    // VARCHAR (chemin image)
            $table->string('adresse_pr');           // VARCHAR
            $table->string('status');               // VARCHAR
            $table->date('date_birth');             // DATE
            $table->string('nationalite');          // VARCHAR
            $table->text('desc')->nullable();       // TEXT

            // Clés étrangères
            $table->unsignedBigInteger('langue_id');
            $table->unsignedBigInteger('qualite_id');
            $table->unsignedBigInteger('etude_id');
            $table->unsignedBigInteger('exp_id');

            $table->foreign('langue_id')->references('langue_id')->on('langues')->onDelete('cascade');
            $table->foreign('qualite_id')->references('qualite_id')->on('qualites')->onDelete('cascade');
            $table->foreign('etude_id')->references('etude_id')->on('etudes')->onDelete('cascade');
            $table->foreign('exp_id')->references('exp_id')->on('experiences')->onDelete('cascade');

            $table->timestamps();                   // created_at / updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils');
    }
};
