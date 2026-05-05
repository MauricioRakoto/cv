<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    // Clé primaire personnalisée
    protected $primaryKey = 'profil_id';

    // Champs mass-assignable
    protected $fillable = [
        'nom',
        'prenom',
        'sexe',
        'email',
        'photo',
        'adresse_pr',
        'status',
        'date_birth',
        'nationalite',
        'desc',
        'langue_id',
        'qualite_id',
        'etude_id',
        'exp_id',
    ];

    // Cast des dates
    protected $casts = [
        'date_birth' => 'date',
    ];

    // ========== RELATIONS ==========

    // Appartient à une Langue
    public function langue()
    {
        return $this->belongsTo(Langue::class, 'langue_id', 'langue_id');
    }

    // Appartient à une Qualite
    public function qualite()
    {
        return $this->belongsTo(Qualite::class, 'qualite_id', 'qualite_id');
    }

    // Appartient à une Etude
    public function etude()
    {
        return $this->belongsTo(Etude::class, 'etude_id', 'etude_id');
    }

    // Appartient à une Experience
    public function experience()
    {
        return $this->belongsTo(Experience::class, 'exp_id', 'exp_id');
    }
}
