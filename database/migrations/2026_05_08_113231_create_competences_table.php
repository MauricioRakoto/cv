<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competences', function (Blueprint $table) {
            $table->id('competence_id');          // INT(11) PK
            $table->string('nom_comp', 50);       // VARCHAR(50)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competences');
    }
};
