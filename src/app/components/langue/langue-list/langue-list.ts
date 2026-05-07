import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LangueService } from '../../../services/langue';

@Component({
  selector: 'app-langue-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './langue-list.html',
  styleUrl: './langue-list.css'
})
export class LangueList implements OnInit {

  private langueService = inject(LangueService);
  private cdr = inject(ChangeDetectorRef);

  langues: any[] = [];
  error: string | null = null;

  // ===== MODAL AJOUT =====
  showModal = false;
  modalLoading = false;
  modalError = '';
  modalSuccess = '';
  newLangue = { nom_langue: '', niveau: '' };

  // ===== MODAL EDIT =====
  showEditModal = false;
  editModalLoading = false;
  editModalError = '';
  editModalSuccess = '';
  editLangue = { langue_id: 0, nom_langue: '', niveau: '' };

  ngOnInit(): void {
    this.loadLangues();
  }

  loadLangues(): void {
    this.error = null;
    this.langueService.getLangues().subscribe({
      next: (data: any) => {
        this.langues = data.data ?? data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = err.status === 0
          ? '❌ Serveur Laravel inaccessible sur http://127.0.0.1:8000'
          : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  // ===== MODAL AJOUT =====
  openModal(): void {
    this.showModal = true;
    this.modalError = '';
    this.modalSuccess = '';
    this.newLangue = { nom_langue: '', niveau: '' };
  }

  closeModal(): void {
    this.showModal = false;
    this.modalError = '';
    this.modalSuccess = '';
    this.newLangue = { nom_langue: '', niveau: '' };
  }

  submitLangue(): void {
    this.modalError = '';
    if (!this.newLangue.nom_langue.trim()) {
      this.modalError = 'Le nom de la langue est obligatoire.';
      return;
    }
    if (!this.newLangue.niveau.trim()) {
      this.modalError = 'Le niveau de maîtrise est obligatoire.';
      return;
    }
    this.modalLoading = true;
    this.langueService.createLangue(this.newLangue).subscribe({
      next: (response: any) => {
        this.langues.push(response.data ?? response);
        this.modalLoading = false;
        this.modalSuccess = '✅ Langue ajoutée avec succès !';
        this.cdr.detectChanges();
        setTimeout(() => this.closeModal(), 1500);
      },
      error: (err: any) => {
        this.modalLoading = false;
        this.modalError = err.status === 0
          ? '❌ Serveur Laravel inaccessible.'
          : err.status === 422
            ? '❌ Données invalides.'
            : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  // ===== MODAL EDIT =====
  openEditModal(langue: any): void {
    this.editLangue = {
      langue_id: langue.langue_id,
      nom_langue: langue.nom_langue,
      niveau: langue.niveau
    };
    this.showEditModal = true;
    this.editModalError = '';
    this.editModalSuccess = '';
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editModalError = '';
    this.editModalSuccess = '';
    this.editLangue = { langue_id: 0, nom_langue: '', niveau: '' };
  }

  submitEditLangue(): void {
    this.editModalError = '';
    if (!this.editLangue.nom_langue.trim()) {
      this.editModalError = 'Le nom de la langue est obligatoire.';
      return;
    }
    if (!this.editLangue.niveau.trim()) {
      this.editModalError = 'Le niveau de maîtrise est obligatoire.';
      return;
    }
    this.editModalLoading = true;
    this.langueService.updateLangue(this.editLangue.langue_id, {
      nom_langue: this.editLangue.nom_langue,
      niveau: this.editLangue.niveau
    }).subscribe({
      next: (response: any) => {
        // Mettre à jour la liste localement
        const index = this.langues.findIndex((l: any) => l.langue_id === this.editLangue.langue_id);
        if (index !== -1) {
          this.langues[index] = response.data ?? this.editLangue;
        }
        this.editModalLoading = false;
        this.editModalSuccess = '✅ Langue modifiée avec succès !';
        this.cdr.detectChanges();
        setTimeout(() => this.closeEditModal(), 1500);
      },
      error: (err: any) => {
        this.editModalLoading = false;
        this.editModalError = err.status === 0
          ? '❌ Serveur Laravel inaccessible.'
          : err.status === 422
            ? '❌ Données invalides.'
            : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  // ===== SUPPRIMER =====
  deleteLangue(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette langue ?')) {
      this.langueService.deleteLangue(id).subscribe({
        next: () => {
          this.langues = this.langues.filter((l: any) => l.langue_id !== id);
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}
