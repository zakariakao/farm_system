import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Fourage } from '../../../models/fourage.model';
import { FourageService } from '../../../services/fourage_service/fourage-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-fourage-list',
  imports: [RouterLink],
  templateUrl: './fourage-list.html',
  styleUrl: './fourage-list.css',
})
export class FourageList implements OnInit {

  Fourages: Fourage[] = [];
  FourageService = inject(FourageService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadFourages();
  }

  loadFourages() {
    this.FourageService.getAllFourages().subscribe(fourages => {
      this.Fourages = fourages;
      this.cdr.detectChanges();
    });
  }

  deleteFourage(id: string) {
    this.FourageService.deleteFourage(id).subscribe({
      next: () => {
        this.loadFourages();
      },
      error: (error) => {
        console.log('Erreur: ', error);
      }
    });
  }
}
