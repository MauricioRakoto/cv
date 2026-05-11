import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilService } from '../../../services/profil';
import { LangueService } from '../../../services/langue';
import { QualiteService } from '../../../services/qualite';
import { EtudeService } from '../../../services/etude';
import { ExperienceService } from '../../../services/experience';
import { CompetenceService } from '../../../services/competence';
import { LoisirsService } from '../../../services/loisirs';

@Component({
  selector: 'app-profil-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil-list.html',
  styleUrl: './profil-list.css'
})
export class ProfilList implements OnInit {

  private profilService = inject(ProfilService);
  private langueService = inject(LangueService);
  private qualiteService = inject(QualiteService);
  private etudeService = inject(EtudeService);
  private experienceService = inject(ExperienceService);
  private competenceService = inject(CompetenceService);
  private loisirsService = inject(LoisirsService);
  private cdr = inject(ChangeDetectorRef);

  profils: any[] = [];
  langues: any[] = [];
  qualites: any[] = [];
  etudes: any[] = [];
  experiences: any[] = [];
  competences: any[] = [];
  loisirs: any[] = [];
  error: string | null = null;

  // ===== TOAST =====
  toast: { message: string; type: 'success' | 'error' } | null = null;

  // ===== MODAL AJOUT =====
  showModal = false;
  modalLoading = false;
  modalError = '';
  photoPreview: string | null = null;
  photoFile: File | null = null;

  newProfil = {
    nom: '', prenom: '', sexe: '', email: '',
    adresse_pr: '', status: '', date_birth: '',
    nationalite: '', desc: '',
    langue_id: [] as number[],
    qualite_id: [] as number[],
    etude_id: [] as number[],
    exp_id: [] as number[],
    competence_id: [] as number[],
    loisirs_id: [] as number[]
  };

  // ===== MODAL EDIT =====
  showEditModal = false;
  editModalLoading = false;
  editModalError = '';
  editPhotoPreview: string | null = null;
  editPhotoFile: File | null = null;

  editProfil = {
    profil_id: 0, nom: '', prenom: '', sexe: '',
    email: '', adresse_pr: '', status: '', date_birth: '',
    nationalite: '', desc: '', photo: '',
    langue_id: [] as number[],
    qualite_id: [] as number[],
    etude_id: [] as number[],
    exp_id: [] as number[],
    competence_id: [] as number[],
    loisirs_id: [] as number[]
  };

  // ===== MODAL DETAIL =====
  showDetailModal = false;
  selectedProfil: any = null;

  ngOnInit(): void {
    this.loadProfils();
    this.loadRelations();
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

  // ===== CHARGER RELATIONS =====
  loadRelations(): void {
    this.langueService.getLangues().subscribe({
      next: (data: any) => { this.langues = data.data ?? data; this.cdr.detectChanges(); }
    });
    this.qualiteService.getQualites().subscribe({
      next: (data: any) => { this.qualites = data.data ?? data; this.cdr.detectChanges(); }
    });
    this.etudeService.getEtudes().subscribe({
      next: (data: any) => { this.etudes = data.data ?? data; this.cdr.detectChanges(); }
    });
    this.experienceService.getExperiences().subscribe({
      next: (data: any) => { this.experiences = data.data ?? data; this.cdr.detectChanges(); }
    });
    this.competenceService.getCompetences().subscribe({
      next: (data: any) => { this.competences = data.data ?? data; this.cdr.detectChanges(); }
    });
    this.loisirsService.getLoisirs().subscribe({
      next: (data: any) => { this.loisirs = data.data ?? data; this.cdr.detectChanges(); }
    });
  }

  // ===== CHARGER PROFILS =====
  loadProfils(): void {
    this.error = null;
    this.profilService.getProfils().subscribe({
      next: (data: any) => {
        this.profils = data.data ?? data;
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

  // ===== CHECKBOX TOGGLE =====
  toggleSelection(array: number[], id: number): void {
    const index = array.indexOf(id);
    if (index === -1) {
      array.push(id);
    } else {
      array.splice(index, 1);
    }
    this.cdr.detectChanges();
  }

  isSelected(array: number[], id: number): boolean {
    return array.includes(id);
  }

  // ===== PHOTO =====
  onPhotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onEditPhotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editPhotoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editPhotoPreview = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  getPhotoUrl(photo: string): string {
    return photo ? `http://127.0.0.1:8000/storage/${photo}` : '';
  }

  // ===== FORM DATA HELPER =====
  buildFormData(profil: any, photoFile: File | null): FormData {
    const formData = new FormData();
    const simpleFields = ['nom', 'prenom', 'sexe', 'email', 'adresse_pr', 'status', 'date_birth', 'nationalite', 'desc'];

    simpleFields.forEach(field => {
      if (profil[field] !== undefined) {
        formData.append(field, profil[field]);
      }
    });

    // Envoyer les tableaux JSON
    const arrayFields = ['langue_id', 'qualite_id', 'etude_id', 'exp_id', 'competence_id', 'loisirs_id'];
    arrayFields.forEach(field => {
      const arr = profil[field] as number[];
      if (arr && arr.length > 0) {
        arr.forEach((id: number) => {
          formData.append(`${field}[]`, id.toString());
        });
      }
    });

    if (photoFile) formData.append('photo', photoFile);
    return formData;
  }

  // ===== MODAL AJOUT =====
  openModal(): void {
    this.showModal = true;
    this.modalError = '';
    this.photoPreview = null;
    this.photoFile = null;
    this.newProfil = {
      nom: '', prenom: '', sexe: '', email: '',
      adresse_pr: '', status: '', date_birth: '',
      nationalite: '', desc: '',
      langue_id: [], qualite_id: [], etude_id: [],
      exp_id: [], competence_id: [], loisirs_id: []
    };
  }

  closeModal(): void {
    this.showModal = false;
    this.modalError = '';
    this.modalLoading = false;
    this.photoPreview = null;
    this.photoFile = null;
  }

  submitProfil(): void {
    this.modalError = '';

    if (!this.newProfil.nom.trim()) { this.modalError = 'Le nom est obligatoire.'; return; }
    if (!this.newProfil.prenom.trim()) { this.modalError = 'Le prénom est obligatoire.'; return; }
    if (!this.newProfil.email.trim()) { this.modalError = 'L\'email est obligatoire.'; return; }
    if (!this.newProfil.langue_id.length) { this.modalError = 'Sélectionnez au moins une langue.'; return; }
    if (!this.newProfil.qualite_id.length) { this.modalError = 'Sélectionnez au moins une qualité.'; return; }
    if (!this.newProfil.etude_id.length) { this.modalError = 'Sélectionnez au moins une étude.'; return; }
    if (!this.newProfil.exp_id.length) { this.modalError = 'Sélectionnez au moins une expérience.'; return; }
    if (!this.newProfil.competence_id.length) { this.modalError = 'Sélectionnez au moins une compétence.'; return; }
    if (!this.newProfil.loisirs_id.length) { this.modalError = 'Sélectionnez au moins un loisir.'; return; }

    this.modalLoading = true;
    const formData = this.buildFormData(this.newProfil, this.photoFile);

    this.profilService.createProfil(formData).subscribe({
      next: (response: any) => {
        this.profils.push(response.data ?? response);
        this.modalLoading = false;
        this.cdr.detectChanges();
        this.closeModal();
        this.showToast('✅ Profil créé avec succès !', 'success');
      },
      error: (err: any) => {
        this.modalLoading = false;
        this.modalError = err.status === 0
          ? '❌ Serveur inaccessible.'
          : err.status === 422
            ? '❌ Données invalides. Vérifiez les champs.'
            : `❌ Erreur ${err.status}`;
        this.cdr.detectChanges();
      }
    });
  }

  // ===== MODAL EDIT =====
  openEditModal(profil: any): void {
    this.editProfil = {
      profil_id: profil.profil_id,
      nom: profil.nom, prenom: profil.prenom,
      sexe: profil.sexe, email: profil.email,
      adresse_pr: profil.adresse_pr, status: profil.status,
      date_birth: profil.date_birth, nationalite: profil.nationalite,
      desc: profil.desc, photo: profil.photo,
      langue_id: [...(profil.langue_id ?? [])],
      qualite_id: [...(profil.qualite_id ?? [])],
      etude_id: [...(profil.etude_id ?? [])],
      exp_id: [...(profil.exp_id ?? [])],
      competence_id: [...(profil.competence_id ?? [])],
      loisirs_id: [...(profil.loisirs_id ?? [])]
    };
    this.editPhotoPreview = profil.photo ? this.getPhotoUrl(profil.photo) : null;
    this.editPhotoFile = null;
    this.showEditModal = true;
    this.editModalError = '';
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editModalError = '';
    this.editModalLoading = false;
    this.editPhotoPreview = null;
    this.editPhotoFile = null;
  }

  submitEditProfil(): void {
    this.editModalError = '';

    if (!this.editProfil.nom.trim()) { this.editModalError = 'Le nom est obligatoire.'; return; }
    if (!this.editProfil.prenom.trim()) { this.editModalError = 'Le prénom est obligatoire.'; return; }
    if (!this.editProfil.email.trim()) { this.editModalError = 'L\'email est obligatoire.'; return; }

    this.editModalLoading = true;
    const formData = this.buildFormData(this.editProfil, this.editPhotoFile);

    this.profilService.updateProfil(this.editProfil.profil_id, formData).subscribe({
      next: (response: any) => {
        const index = this.profils.findIndex((p: any) => p.profil_id === this.editProfil.profil_id);
        if (index !== -1) this.profils[index] = response.data ?? this.editProfil;
        this.editModalLoading = false;
        this.cdr.detectChanges();
        this.closeEditModal();
        this.showToast('✅ Profil modifié avec succès !', 'success');
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

  // ===== MODAL DETAIL =====
  openDetailModal(profil: any): void {
    this.selectedProfil = profil;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedProfil = null;
  }

  // ===== SUPPRIMER =====
  deleteProfil(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce profil ?')) {
      this.profilService.deleteProfil(id).subscribe({
        next: () => {
          this.profils = this.profils.filter((p: any) => p.profil_id !== id);
          this.cdr.detectChanges();
          this.showToast('🗑️ Profil supprimé avec succès !', 'success');
        },
        error: (err: any) => {
          this.showToast('❌ Erreur lors de la suppression.', 'error');
          console.error(err);
        }
      });
    }
  }
}
