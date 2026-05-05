<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('qualites', function (Blueprint $table) {
            $table->id('qualite_id');      // INT auto-increment PK
            $table->string('nom_qualite'); // VARCHAR
            $table->timestamps();          // created_at / updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('qualites');
    }
};
