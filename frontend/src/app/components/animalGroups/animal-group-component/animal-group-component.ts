import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimalGroup } from '../../../models/animalGroup.model';
import { AnimalGroupService } from '../../../services/animalGroup_service/animal-group-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-animal-group-component',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './animal-group-component.html',
  styleUrl: './animal-group-component.css',
})
export class AnimalGroupComponent implements OnInit {

  AnimalGroups: AnimalGroup[] = [];
  AnimalGroupService = inject(AnimalGroupService);
  private cdr = inject(ChangeDetectorRef);
  isWarning: Boolean = false;
  warningContent: string = '';
  isSucces: Boolean = false;
  succesContent: string = '';
  isError: Boolean = false;
  errorContent: string = '';

  newGroup = { name: '' };

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.AnimalGroupService.getAllAnimalGroups()
      .subscribe(groups => {
        this.AnimalGroups = groups;
        this.cdr.detectChanges();
      });
  }

  addGroup() {
    this.AnimalGroupService
      .createAnimalGroup(this.newGroup as AnimalGroup)
      .subscribe({
        next: (response) => {
          console.log('Group added successfully:', response);
          this.succesContent = 'Group Animal Created succesfly';
          this.isSucces = true;
          setTimeout(() => {
            this.isSucces = false;
            this.cdr.detectChanges();
          }, 3000);
          this.resetForm();
          this.loadGroups();
        },
        error: (err) => {
          if (err.status === 400) {
            if(!this.newGroup.name) {
              console.log("fill the input");
              this.warningContent = 'Please fill the name' ;
              this.isWarning = true;
              this.cdr.detectChanges();
              setTimeout(() => {
                this.isWarning = false;
                this.cdr.detectChanges();
              }, 3000);
            }
            else {
              console.log("name aleardy exists");
              this.errorContent = 'The name is already exists Its be a unique name';
              this.isError = true;
              this.cdr.detectChanges();
              setTimeout(()=> {
                this.isError = false;
                this.cdr.detectChanges();
              }, 3000);
            }
          }
          else{
            console.log('Erreur');
          }
        }
      });
  }

  resetForm() {
    this.newGroup = { name: '' };
  }

  deleteGroup(id: string) {
    this.AnimalGroupService.deleteAnimalGroup(id).subscribe({
      next: (response) => {
        console.log('Delete successful:', response);
        this.loadGroups();
      },
      error: (error) => {
        console.error('Error deleting sub-animal group:', error);
      }
    });
  }
}