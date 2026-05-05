<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id('exp_id');           // INT auto-increment PK
            $table->string('poste');        // VARCHAR - Intitulé du poste
            $table->string('adress_exp');   // VARCHAR - Entreprise / Adresse
            $table->date('date_exp');       // DATE - Date d'expérience
            $table->timestamps();           // created_at / updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
