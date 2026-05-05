<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Langue extends Model
{
    // Clé primaire personnalisée
    protected $primaryKey = 'langue_id';

    // Champs mass-assignable
    protected $fillable = [
        'nom_langue',
        'niveau',
    ];
}
