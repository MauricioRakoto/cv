<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    protected $primaryKey = 'competence_id';

    protected $fillable = [
        'nom_comp',
    ];
}
