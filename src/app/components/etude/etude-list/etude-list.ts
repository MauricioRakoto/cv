import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EtudeService } from '../../../services/etude';

@Component({
  selector: 'app-etude-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etude-list.html',
  styleUrl: './etude-list.css'
})
export class EtudeList implements OnInit {

  private etudeService = inject(EtudeService);
  private cdr = inject(ChangeDetectorRef);

  etudes: any[] = [];
  error: string | null = null;

  // ===== TOAST =====
  toast: { message: string; type: 'success' | 'error' } | null = null;

  // ===== MODAL AJOUT =====
  showModal = false;
  modalLoading = false;
  modalError = '';
  newEtude = { etude: '', adresse_et: '', date_et: '' };

  // ===== MODAL EDIT =====
  showEditModal = false;
  editModalLoading = false;
  editModalError = '';
  editEtude = { etude_id: 0, etude: '', adresse_et: '', date_et: '' };

  ngOnInit(): void {
    this.loadEtudes();
  }

  // ===== TOAST =====
  showToast(message: string, type: 'success' | 'error'): void {
    this.toast = { message, type };
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toast = null;
      this.cdr.detectChanges();
    }, 3000);
  }

  // ===== CHARGER =====
  loadEtudes(): void {
    this.error = null;
    this.etudeService.getEtudes().subscribe({
      next: (data: any) => {
        this.etudes = data.data ?? data;
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

  // ===== MODAL AJOUT =====
  openModal(): void {
    this.showModal = true;
    this.modalError = '';
    this.newEtude = { etude: '', adresse_et: '', date_et: '' };
  }

  closeModal(): void {
    this.showModal = false;
    this.modalError = '';
    this.modalLoading = false;
    this.newEtude = { etude: '', adresse_et: '', date_et: '' };
  }

  submitEtude(): void {
    this.modalError = '';

    if (!this.newEtude.etude.trim()) {
      this.modalError = 'L\'intitulé de l\'étude est obligatoire.';
      return;
    }
    if (!this.newEtude.adresse_et.trim()) {
      this.modalError = 'L\'établissement est obligatoire.';
      return;
    }
    if (!this.newEtude.date_et) {
      this.modalError = 'La date est obligatoire.';
      return;
    }

    this.modalLoading = true;

    this.etudeService.createEtude(this.newEtude).subscribe({
      next: (response: any) => {
        this.etudes.push(response.data ?? response);
        this.modalLoading = false;
        this.cdr.detectChanges();
        this.closeModal();
        this.showToast('✅ Etude ajoutée avec succès !', 'success');
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

  // ===== MODAL EDIT =====
  openEditModal(etude: any): void {
    this.editEtude = {
      etude_id: etude.etude_id,
      etude: etude.etude,
      adresse_et: etude.adresse_et,
      date_et: etude.date_et
    };
    this.showEditModal = true;
    this.editModalError = '';
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editModalError = '';
    this.editModalLoading = false;
    this.editEtude = { etude_id: 0, etude: '', adresse_et: '', date_et: '' };
  }

  submitEditEtude(): void {
    this.editModalError = '';

    if (!this.editEtude.etude.trim()) {
      this.editModalError = 'L\'intitulé de l\'étude est obligatoire.';
      return;
    }
    if (!this.editEtude.adresse_et.trim()) {
      this.editModalError = 'L\'établissement est obligatoire.';
      return;
    }
    if (!this.editEtude.date_et) {
      this.editModalError = 'La date est obligatoire.';
      return;
    }

    this.editModalLoading = true;

    this.etudeService.updateEtude(this.editEtude.etude_id, {
      etude: this.editEtude.etude,
      adresse_et: this.editEtude.adresse_et,
      date_et: this.editEtude.date_et
    }).subscribe({
      next: (response: any) => {
        const index = this.etudes.findIndex((e: any) => e.etude_id === this.editEtude.etude_id);
        if (index !== -1) {
          this.etudes[index] = response.data ?? this.editEtude;
        }
        this.editModalLoading = false;
        this.cdr.detectChanges();
        this.closeEditModal();
        this.showToast('✅ Etude modifiée avec succès !', 'success');
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

  // ===== SUPPRIMER =====
  deleteEtude(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette étude ?')) {
      this.etudeService.deleteEtude(id).subscribe({
        next: () => {
          this.etudes = this.etudes.filter((e: any) => e.etude_id !== id);
          this.cdr.detectChanges();
          this.showToast('🗑️ Etude supprimée avec succès !', 'success');
        },
        error: (err: any) => {
          this.showToast('❌ Erreur lors de la suppression.', 'error');
          console.error(err);
        }
      });
    }
  }
}
