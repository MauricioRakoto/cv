<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Qualite extends Model
{
    // Clé primaire personnalisée
    protected $primaryKey = 'qualite_id';

    // Champs mass-assignable
    protected $fillable = [
        'nom_qualite',
    ];
}
