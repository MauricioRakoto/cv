import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProfilService } from '../../services/profil';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cv.html',
  styleUrl: './cv.css'
})
export class Cv implements OnInit {

  private profilService = inject(ProfilService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  profil: any = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadProfil(+id);
  }

  loadProfil(id: number): void {
    this.loading = true;
    this.profilService.getProfil(id).subscribe({
      next: (data: any) => {
        this.profil = data.data ?? data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = '❌ Profil introuvable.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getPhotoUrl(photo: string): string {
    return photo ? `http://127.0.0.1:8000/storage/${photo}` : '';
  }

  getAge(dateStr: string): number {
    const today = new Date();
    const birth = new Date(dateStr);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  getNiveauWidth(niveau: string): string {
    const map: any = {
      'Natif': '100%', 'Courant': '85%',
      'Intermédiaire': '65%', 'B2': '65%',
      'B1': '50%', 'Débutant': '30%',
      'A1': '20%', 'A2': '25%'
    };
    return map[niveau] ?? '50%';
  }

  print(): void {
    window.print();
  }
}
