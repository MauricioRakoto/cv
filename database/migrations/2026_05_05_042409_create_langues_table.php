<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('langues', function (Blueprint $table) {
            $table->id('langue_id');           // INT auto-increment PK
            $table->string('nom_langue');      // VARCHAR
            $table->string('niveau');          // VARCHAR
            $table->timestamps();              // created_at / updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('langues');
    }
};
