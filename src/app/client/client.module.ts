import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './pages/profile/profile.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileDesignComponent } from './profile-design/profile-design.component';
import { FavoritesDesignComponent } from './favorites-design/favorites-design.component';
import { HistoryDesignComponent } from './history-design/history-design.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    HistoryComponent,
    ProfileDesignComponent,
    FavoritesDesignComponent,
    HistoryDesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProfileComponent,
    FavoritesComponent,
    FavoritesDesignComponent
  ]
})
export class ClientModule { }
