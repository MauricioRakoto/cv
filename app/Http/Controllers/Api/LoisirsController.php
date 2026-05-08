<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Loisirs;
use Illuminate\Http\Request;

class LoisirsController extends Controller
{
    // ========== LISTE ==========
    public function index()
    {
        $loisirs = Loisirs::all();

        return response()->json([
            'success' => true,
            'data'    => $loisirs
        ], 200);
    }

    // ========== CRÉER ==========
    public function store(Request $request)
    {
        $request->validate([
            'nom_loisirs' => 'required|string|max:50',
        ]);

        $loisirs = Loisirs::create([
            'nom_loisirs' => $request->nom_loisirs,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Loisir créé avec succès',
            'data'    => $loisirs
        ], 201);
    }

    // ========== AFFICHER ==========
    public function show($id)
    {
        $loisirs = Loisirs::find($id);

        if (!$loisirs) {
            return response()->json([
                'success' => false,
                'message' => 'Loisir non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $loisirs
        ], 200);
    }

    // ========== MODIFIER ==========
    public function update(Request $request, $id)
    {
        $loisirs = Loisirs::find($id);

        if (!$loisirs) {
            return response()->json([
                'success' => false,
                'message' => 'Loisir non trouvé'
            ], 404);
        }

        $request->validate([
            'nom_loisirs' => 'sometimes|required|string|max:50',
        ]);

        $loisirs->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Loisir mis à jour avec succès',
            'data'    => $loisirs
        ], 200);
    }

    // ========== SUPPRIMER ==========
    public function destroy($id)
    {
        $loisirs = Loisirs::find($id);

        if (!$loisirs) {
            return response()->json([
                'success' => false,
                'message' => 'Loisir non trouvé'
            ], 404);
        }

        $loisirs->delete();

        return response()->json([
            'success' => true,
            'message' => 'Loisir supprimé avec succès'
        ], 200);
    }
}
