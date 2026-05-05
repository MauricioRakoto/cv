<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    // ========== LISTE DE TOUS LES PROFILS ==========
    public function index()
    {
        $profils = Profil::with([
            'langue',
            'qualite',
            'etude',
            'experience'
        ])->get();

        return response()->json([
            'success' => true,
            'data'    => $profils
        ], 200);
    }

    // ========== CRÉER UN PROFIL ==========
    public function store(Request $request)
    {
        $request->validate([
            'nom'         => 'required|string|max:255',
            'prenom'      => 'required|string|max:255',
            'sexe'        => 'required|string|max:50',
            'email'       => 'required|email|unique:profils,email',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'adresse_pr'  => 'required|string|max:255',
            'status'      => 'required|string|max:255',
            'date_birth'  => 'required|date',
            'nationalite' => 'required|string|max:255',
            'desc'        => 'nullable|string',
            'langue_id'   => 'required|exists:langues,langue_id',
            'qualite_id'  => 'required|exists:qualites,qualite_id',
            'etude_id'    => 'required|exists:etudes,etude_id',
            'exp_id'      => 'required|exists:experiences,exp_id',
        ]);

        // ===== GESTION UPLOAD PHOTO =====
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
        }

        $profil = Profil::create([
            'nom'         => $request->nom,
            'prenom'      => $request->prenom,
            'sexe'        => $request->sexe,
            'email'       => $request->email,
            'photo'       => $photoPath,
            'adresse_pr'  => $request->adresse_pr,
            'status'      => $request->status,
            'date_birth'  => $request->date_birth,
            'nationalite' => $request->nationalite,
            'desc'        => $request->desc,
            'langue_id'   => $request->langue_id,
            'qualite_id'  => $request->qualite_id,
            'etude_id'    => $request->etude_id,
            'exp_id'      => $request->exp_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profil créé avec succès',
            'data'    => $profil->load(['langue', 'qualite', 'etude', 'experience'])
        ], 201);
    }

    // ========== AFFICHER UN PROFIL ==========
    public function show($id)
    {
        $profil = Profil::with([
            'langue',
            'qualite',
            'etude',
            'experience'
        ])->find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $profil
        ], 200);
    }

    // ========== MODIFIER UN PROFIL ==========
    public function update(Request $request, $id)
    {
        $profil = Profil::find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil non trouvé'
            ], 404);
        }

        $request->validate([
            'nom'         => 'sometimes|required|string|max:255',
            'prenom'      => 'sometimes|required|string|max:255',
            'sexe'        => 'sometimes|required|string|max:50',
            'email'       => 'sometimes|required|email|unique:profils,email,' . $id . ',profil_id',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'adresse_pr'  => 'sometimes|required|string|max:255',
            'status'      => 'sometimes|required|string|max:255',
            'date_birth'  => 'sometimes|required|date',
            'nationalite' => 'sometimes|required|string|max:255',
            'desc'        => 'nullable|string',
            'langue_id'   => 'sometimes|required|exists:langues,langue_id',
            'qualite_id'  => 'sometimes|required|exists:qualites,qualite_id',
            'etude_id'    => 'sometimes|required|exists:etudes,etude_id',
            'exp_id'      => 'sometimes|required|exists:experiences,exp_id',
        ]);

        // ===== GESTION UPLOAD NOUVELLE PHOTO =====
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo
            if ($profil->photo) {
                Storage::disk('public')->delete($profil->photo);
            }
            $request->merge([
                'photo' => $request->file('photo')->store('photos', 'public')
            ]);
        }

        $profil->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'data'    => $profil->load(['langue', 'qualite', 'etude', 'experience'])
        ], 200);
    }

    // ========== SUPPRIMER UN PROFIL ==========
    public function destroy($id)
    {
        $profil = Profil::find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Profil non trouvé'
            ], 404);
        }

        // Supprimer la photo associée
        if ($profil->photo) {
            Storage::disk('public')->delete($profil->photo);
        }

        $profil->delete();

        return response()->json([
            'success' => true,
            'message' => 'Profil supprimé avec succès'
        ], 200);
    }
}
