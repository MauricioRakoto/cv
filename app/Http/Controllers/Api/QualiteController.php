<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Qualite;
use Illuminate\Http\Request;

class QualiteController extends Controller
{
    // ========== LISTE DE TOUTES LES QUALITES ==========
    public function index()
    {
        $qualites = Qualite::all();

        return response()->json([
            'success' => true,
            'data'    => $qualites
        ], 200);
    }

    // ========== CRÉER UNE QUALITE ==========
    public function store(Request $request)
    {
        $request->validate([
            'nom_qualite' => 'required|string|max:255',
        ]);

        $qualite = Qualite::create([
            'nom_qualite' => $request->nom_qualite,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Qualité créée avec succès',
            'data'    => $qualite
        ], 201);
    }

    // ========== AFFICHER UNE QUALITE ==========
    public function show($id)
    {
        $qualite = Qualite::find($id);

        if (!$qualite) {
            return response()->json([
                'success' => false,
                'message' => 'Qualité non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $qualite
        ], 200);
    }

    // ========== MODIFIER UNE QUALITE ==========
    public function update(Request $request, $id)
    {
        $qualite = Qualite::find($id);

        if (!$qualite) {
            return response()->json([
                'success' => false,
                'message' => 'Qualité non trouvée'
            ], 404);
        }

        $request->validate([
            'nom_qualite' => 'sometimes|required|string|max:255',
        ]);

        $qualite->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Qualité mise à jour avec succès',
            'data'    => $qualite
        ], 200);
    }

    // ========== SUPPRIMER UNE QUALITE ==========
    public function destroy($id)
    {
        $qualite = Qualite::find($id);

        if (!$qualite) {
            return response()->json([
                'success' => false,
                'message' => 'Qualité non trouvée'
            ], 404);
        }

        $qualite->delete();

        return response()->json([
            'success' => true,
            'message' => 'Qualité supprimée avec succès'
        ], 200);
    }
}
