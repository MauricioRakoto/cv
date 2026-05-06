import { Routes } from '@angular/router';

// ===== LANGUE =====
import { LangueList } from './components/langue/langue-list/langue-list';
import { LangueForm } from './components/langue/langue-form/langue-form';

// ===== QUALITE =====
import { QualiteList } from './components/qualite/qualite-list/qualite-list';
import { QualiteForm } from './components/qualite/qualite-form/qualite-form';

// ===== ETUDE =====
import { EtudeList } from './components/etude/etude-list/etude-list';
import { EtudeForm } from './components/etude/etude-form/etude-form';

// ===== EXPERIENCE =====
import { ExperienceList } from './components/experience/experience-list/experience-list';
import { ExperienceForm } from './components/experience/experience-form/experience-form';

// ===== PROFIL =====
import { ProfilList } from './components/profil/profil-list/profil-list';
import { ProfilForm } from './components/profil/profil-form/profil-form';
import { ProfilDetail } from './components/profil/profil-detail/profil-detail';

export const routes: Routes = [

  // ===== ROUTE PAR DÉFAUT =====
  { path: '', redirectTo: '/profils', pathMatch: 'full' },

  // ===== ROUTES LANGUE =====
  { path: 'langues',          component: LangueList },
  { path: 'langues/create',   component: LangueForm },
  { path: 'langues/edit/:id', component: LangueForm },

  // ===== ROUTES QUALITE =====
  { path: 'qualites',          component: QualiteList },
  { path: 'qualites/create',   component: QualiteForm },
  { path: 'qualites/edit/:id', component: QualiteForm },

  // ===== ROUTES ETUDE =====
  { path: 'etudes',          component: EtudeList },
  { path: 'etudes/create',   component: EtudeForm },
  { path: 'etudes/edit/:id', component: EtudeForm },

  // ===== ROUTES EXPERIENCE =====
  { path: 'experiences',          component: ExperienceList },
  { path: 'experiences/create',   component: ExperienceForm },
  { path: 'experiences/edit/:id', component: ExperienceForm },

  // ===== ROUTES PROFIL =====
  { path: 'profils',            component: ProfilList },
  { path: 'profils/create',     component: ProfilForm },
  { path: 'profils/edit/:id',   component: ProfilForm },
  { path: 'profils/detail/:id', component: ProfilDetail },

  // ===== ROUTE 404 =====
  { path: '**', redirectTo: '/profils' }
];
