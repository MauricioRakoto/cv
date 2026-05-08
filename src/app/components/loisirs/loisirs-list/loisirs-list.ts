import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoisirsService } from '../../../services/loisirs';

@Component({
  selector: 'app-loisirs-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loisirs-list.html',
  styleUrl: './loisirs-list.css'
})
export class LoisirsList implements OnInit {

  private loisirsService = inject(LoisirsService);
  private cdr = inject(ChangeDetectorRef);

  loisirs: any[] = [];
  error: string | null = null;

  // ===== TOAST =====
  toast: { message: string; type: 'success' | 'error' } | null = null;

  // ===== MODAL AJOUT =====
  showModal = false;
  modalLoading = false;
  modalError = '';
  newLoisir = { nom_loisirs: '' };

  // ===== MODAL EDIT =====
  showEditModal = false;
  editModalLoading = false;
  editModalError = '';
  editLoisir = { loisirs_id: 0, nom_loisirs: '' };

  ngOnInit(): void {
    this.loadLoisirs();
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toast = { message, type };
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toast = null;
      this.cdr.detectChanges();
    }, 3000);
  }

  loadLoisirs(): void {
    this.error = null;
    this.loisirsService.getLoisirs().subscribe({
      next: (data: any) => {
        this.loisirs = data.data ?? data;
        this.cdr.detectChanges(); // ← Forcer la mise à jour
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
    this.newLoisir = { nom_loisirs: '' };
  }

  closeModal(): void {
    this.showModal = false;
    this.modalError = '';
    this.modalLoading = false;
    this.newLoisir = { nom_loisirs: '' };
  }

  submitLoisir(): void {
    this.modalError = '';
    if (!this.newLoisir.nom_loisirs.trim()) {
      this.modalError = 'Le nom du loisir est obligatoire.';
      return;
    }
    this.modalLoading = true;
    this.loisirsService.createLoisir(this.newLoisir).subscribe({
      next: (response: any) => {
        this.loisirs.push(response.data ?? response);
        this.modalLoading = false;
        this.cdr.detectChanges();
        this.closeModal();
        this.showToast('✅ Loisir ajouté avec succès !', 'success');
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

  openEditModal(loisir: any): void {
    this.editLoisir = {
      loisirs_id: loisir.loisirs_id,
      nom_loisirs: loisir.nom_loisirs
    };
    this.showEditModal = true;
    this.editModalError = '';
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editModalError = '';
    this.editModalLoading = false;
    this.editLoisir = { loisirs_id: 0, nom_loisirs: '' };
  }

  submitEditLoisir(): void {
    this.editModalError = '';
    if (!this.editLoisir.nom_loisirs.trim()) {
      this.editModalError = 'Le nom du loisir est obligatoire.';
      return;
    }
    this.editModalLoading = true;
    this.loisirsService.updateLoisir(this.editLoisir.loisirs_id, {
      nom_loisirs: this.editLoisir.nom_loisirs
    }).subscribe({
      next: (response: any) => {
        const index = this.loisirs.findIndex((l: any) => l.loisirs_id === this.editLoisir.loisirs_id);
        if (index !== -1) {
          this.loisirs[index] = response.data ?? this.editLoisir;
        }
        this.editModalLoading = false;
        this.cdr.detectChanges();
        this.closeEditModal();
        this.showToast('✅ Loisir modifié avec succès !', 'success');
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

  deleteLoisir(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce loisir ?')) {
      this.loisirsService.deleteLoisir(id).subscribe({
        next: () => {
          this.loisirs = this.loisirs.filter((l: any) => l.loisirs_id !== id);
          this.cdr.detectChanges();
          this.showToast('🗑️ Loisir supprimé avec succès !', 'success');
        },
        error: (err: any) => {
          this.showToast('❌ Erreur lors de la suppression.', 'error');
          console.error(err);
        }
      });
    }
  }
}
