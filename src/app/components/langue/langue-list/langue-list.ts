import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LangueService } from '../../../services/langue';

@Component({
  selector: 'app-langue-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './langue-list.html',
  styleUrl: './langue-list.css'
})
export class LangueList implements OnInit {

  langues: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private langueService: LangueService) {}

  ngOnInit(): void {
    this.getLangues();
  }

  getLangues(): void {
    this.loading = true;
    this.langueService.getLangues().subscribe({
      next: (response) => {
        this.langues = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des langues';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteLangue(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette langue ?')) {
      this.langueService.deleteLangue(id).subscribe({
        next: () => {
          this.langues = this.langues.filter(l => l.langue_id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
