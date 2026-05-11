import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfilService } from '../../services/profil';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private profilService = inject(ProfilService);
  private cdr = inject(ChangeDetectorRef);

  profils: any[] = [];
  loading = false;
  error: string | null = null;

  stats = {
    total: 0,
    disponibles: 0,
    maries: 0,
    celibataires: 0
  };

  ngOnInit(): void {
    this.loadProfils();
  }

  loadProfils(): void {
    this.loading = true;
    this.error = null;
    this.profilService.getProfils().subscribe({
      next: (data: any) => {
        this.profils = data.data ?? data;
        this.calculateStats();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = '❌ Impossible de charger les profils.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateStats(): void {
    this.stats.total = this.profils.length;
    this.stats.disponibles = this.profils.filter(p => p.status === 'Disponible').length;
    this.stats.maries = this.profils.filter(p => p.status === 'Marié').length;
    this.stats.celibataires = this.profils.filter(p => p.status === 'Célibataire').length;
  }

  getPhotoUrl(photo: string): string {
    return photo ? `http://127.0.0.1:8000/storage/${photo}` : '';
  }

  getLatestProfils(): any[] {
    return this.profils.slice(-6).reverse();
  }
}
