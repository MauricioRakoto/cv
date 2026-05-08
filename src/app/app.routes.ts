import { Routes } from '@angular/router';
import { LangueList } from './components/langue/langue-list/langue-list';
import { QualiteList } from './components/qualite/qualite-list/qualite-list';
import { EtudeList } from './components/etude/etude-list/etude-list';
import { ExperienceList } from './components/experience/experience-list/experience-list';
import { ProfilList } from './components/profil/profil-list/profil-list';
import { CompetenceList } from './components/competence/competence-list/competence-list';
import { LoisirsList } from './components/loisirs/loisirs-list/loisirs-list';

export const routes: Routes = [
  { path: '', redirectTo: '/profils', pathMatch: 'full' },
  { path: 'langues', component: LangueList },
  { path: 'qualites', component: QualiteList },
  { path: 'etudes', component: EtudeList },
  { path: 'experiences', component: ExperienceList },
  { path: 'profils', component: ProfilList },
  { path: 'competences', component: CompetenceList },
  { path: 'loisirs', component: LoisirsList },
  { path: '**', redirectTo: '/profils' }
];
