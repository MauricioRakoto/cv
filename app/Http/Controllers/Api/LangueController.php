<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Langue;
use Illuminate\Http\Request;

class LangueController extends Controller
{
    // ========== LISTE DE TOUTES LES LANGUES ==========
    public function index()
    {
        $langues = Langue::all();

        return response()->json([
            'success' => true,
            'data'    => $langues
        ], 200);
    }

    // ========== CRÉER UNE LANGUE ==========
    public function store(Request $request)
    {
        $request->validate([
            'nom_langue' => 'required|string|max:255',
            'niveau'     => 'required|string|max:255',
        ]);

        $langue = Langue::create([
            'nom_langue' => $request->nom_langue,
            'niveau'     => $request->niveau,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Langue créée avec succès',
            'data'    => $langue
        ], 201);
    }

    // ========== AFFICHER UNE LANGUE ==========
    public function show($id)
    {
        $langue = Langue::find($id);

        if (!$langue) {
            return response()->json([
                'success' => false,
                'message' => 'Langue non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $langue
        ], 200);
    }

    // ========== MODIFIER UNE LANGUE ==========
    public function update(Request $request, $id)
    {
        $langue = Langue::find($id);

        if (!$langue) {
            return response()->json([
                'success' => false,
                'message' => 'Langue non trouvée'
            ], 404);
        }

        $request->validate([
            'nom_langue' => 'sometimes|required|string|max:255',
            'niveau'     => 'sometimes|required|string|max:255',
        ]);

        $langue->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Langue mise à jour avec succès',
            'data'    => $langue
        ], 200);
    }

    // ========== SUPPRIMER UNE LANGUE ==========
    public function destroy($id)
    {
        $langue = Langue::find($id);

        if (!$langue) {
            return response()->json([
                'success' => false,
                'message' => 'Langue non trouvée'
            ], 404);
        }

        $langue->delete();

        return response()->json([
            'success' => true,
            'message' => 'Langue supprimée avec succès'
        ], 200);
    }
}
