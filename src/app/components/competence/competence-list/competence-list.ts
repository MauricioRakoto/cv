import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompetenceService } from '../../../services/competence';

@Component({
  selector: 'app-competence-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competence-list.html',
  styleUrl: './competence-list.css'
})
export class CompetenceList implements OnInit {

  private competenceService = inject(CompetenceService);
  private cdr = inject(ChangeDetectorRef);

  competences: any[] = [];
  error: string | null = null;

  // ===== TOAST =====
  toast: { message: string; type: 'success' | 'error' } | null = null;

  // ===== MODAL AJOUT =====
  showModal = false;
  modalLoading = false;
  modalError = '';
  newCompetence = { nom_comp: '' };

  // ===== MODAL EDIT =====
  showEditModal = false;
  editModalLoading = false;
  editModalError = '';
  editCompetence = { competence_id: 0, nom_comp: '' };

  ngOnInit(): void {
    this.loadCompetences();
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toast = { message, type };
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toast = null;
      this.cdr.detectChanges();
    }, 3000);
  }

  loadCompetences(): void {
    this.error = null;
    this.competenceService.getCompetences().subscribe({
      next: (data: any) => {
        this.competences = data.data ?? data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = err.status === 0
          ? '❌ Serveur Laravel inaccessible sur http://127.0.0.1:8000'
          : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.modalError = '';
    this.newCompetence = { nom_comp: '' };
  }

  closeModal(): void {
    this.showModal = false;
    this.modalError = '';
    this.modalLoading = false;
    this.newCompetence = { nom_comp: '' };
  }

  submitCompetence(): void {
    this.modalError = '';
    if (!this.newCompetence.nom_comp.trim()) {
      this.modalError = 'Le nom de la compétence est obligatoire.';
      return;
    }
    this.modalLoading = true;
    this.competenceService.createCompetence(this.newCompetence).subscribe({
      next: (response: any) => {
        this.competences.push(response.data ?? response);
        this.modalLoading = false;
        this.cdr.detectChanges();
        this.closeModal();
        this.showToast('✅ Compétence ajoutée avec succès !', 'success');
      },
      error: (err: any) => {
        this.modalLoading = false;
        this.modalError = err.status === 0
          ? '❌ Serveur inaccessible.'
          : err.status === 422
            ? '❌ Données invalides.'
            : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
      }
    });
  }

  openEditModal(competence: any): void {
    this.editCompetence = {
      competence_id: competence.competence_id,
      nom_comp: competence.nom_comp
    };
    this.showEditModal = true;
    this.editModalError = '';
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editModalError = '';
    this.editModalLoading = false;
    this.editCompetence = { competence_id: 0, nom_comp: '' };
  }

  submitEditCompetence(): void {
    this.editModalError = '';
    if (!this.editCompetence.nom_comp.trim()) {
      this.editModalError = 'Le nom de la compétence est obligatoire.';
      return;
    }
    this.editModalLoading = true;
    this.competenceService.updateCompetence(this.editCompetence.competence_id, {
      nom_comp: this.editCompetence.nom_comp
    }).subscribe({
      next: (response: any) => {
        const index = this.competences.findIndex((c: any) => c.competence_id === this.editCompetence.competence_id);
        if (index !== -1) {
          this.competences[index] = response.data ?? this.editCompetence;
        }
        this.editModalLoading = false;
        this.cdr.detectChanges();
        this.closeEditModal();
        this.showToast('✅ Compétence modifiée avec succès !', 'success');
      },
      error: (err: any) => {
        this.editModalLoading = false;
        this.editModalError = err.status === 0
          ? '❌ Serveur inaccessible.'
          : err.status === 422
            ? '❌ Données invalides.'
            : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
      }
    });
  }

  deleteCompetence(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette compétence ?')) {
      this.competenceService.deleteCompetence(id).subscribe({
        next: () => {
          this.competences = this.competences.filter((c: any) => c.competence_id !== id);
          this.cdr.detectChanges();
          this.showToast('🗑️ Compétence supprimée avec succès !', 'success');
        },
        error: (err: any) => {
          this.showToast('❌ Erreur lors de la suppression.', 'error');
          console.error(err);
        }
      });
    }
  }
}
