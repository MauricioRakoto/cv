<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loisirs', function (Blueprint $table) {
            $table->id('loisirs_id');             // INT(11) PK
            $table->string('nom_loisirs', 50);    // VARCHAR(50)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loisirs');
    }
};
