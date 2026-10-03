import { Component, Inject, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubAnimalGroup } from '../../../models/subAnimalGroup.model';
import { SubAnimalGroupService } from '../../../services/subAnimalGroup_service/sub-animal-group-service';
import { AnimalGroup } from '../../../models/animalGroup.model';
import { AnimalGroupService } from '../../../services/animalGroup_service/animal-group-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sub-animal-group-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sub-animal-group-list.html',
  styleUrl: './sub-animal-group-list.css',
})
export class SubAnimalGroupList implements OnInit {

  AnimalSubGroups: SubAnimalGroup[] = [];
  AnimalGroups: AnimalGroup[] = [];
  AnimalGroupService = inject(AnimalGroupService);
  AnimalSubGroupService = inject(SubAnimalGroupService);
  private cdr = inject(ChangeDetectorRef);
  isWarning: Boolean = false;
  warningContent: string = '';
  isSucces: Boolean = false;
  succesContent: string = '';
  isError: Boolean = false;
  errorContent: string = '';

  // Form model
  newSubGroup = {
    groupAnimal_id: '',
    name: '',
    type: '',
    quantity: 0
  };

  ngOnInit(): void {
    this.loadSubGroups();
    this.loadAnimalGroups();
  }

  loadSubGroups(): void {
    this.AnimalSubGroupService.getAllSubAnimalGroups().subscribe(subgroups => {
      this.AnimalSubGroups = subgroups;
      this.cdr.detectChanges();
    });
  }

  loadAnimalGroups(): void {
    this.AnimalGroupService.getAllAnimalGroups().subscribe(groups => {
      this.AnimalGroups = groups;
    });
  }

  addSubGroup() {
  
    this.AnimalSubGroupService.createSubAnimalGroup(this.newSubGroup as SubAnimalGroup).subscribe({
      next: (response) => {
        console.log('SubGroup added successfully:', response);
        this.succesContent = ' Sub Group Animal Created succesfly';
        this.isSucces = true;
        setTimeout(() => {
            this.isSucces = false;
            this.cdr.detectChanges();
          }, 3000);
        this.resetForm();
        this.loadSubGroups();
      },
      error: (error) => {
        if(error.status === 400) {
          if(!this.newSubGroup.groupAnimal_id || !this.newSubGroup.name || !this.newSubGroup.type || this.newSubGroup.quantity <= 0) {
            console.error('Please fill all fields');
            this.warningContent = 'Please fill the name' ;
              this.isWarning = true;
              this.cdr.detectChanges();
              setTimeout(() => {
                this.isWarning = false;
                this.cdr.detectChanges();
              }, 3000);
          }
          else {
            console.error('the name must be unique');
            this.errorContent = 'The name is already exists Its be a unique name';
              this.isError = true;
              this.cdr.detectChanges();
              setTimeout(()=> {
                this.isError = false;
                this.cdr.detectChanges();
              }, 3000);
          }
        }
        console.error('Error adding sub-animal group:', error);
      }
    });
  }

  resetForm() {
    this.newSubGroup = {
      groupAnimal_id: '',
      name: '',
      type: '',
      quantity: 0
    };
  }

  deleteSubGroup(id: string) {
    console.log('Delete clicked for ID:', id);
    this.AnimalSubGroupService.deleteSubAnimalGroup(id).subscribe({
      next: (response) => {
        console.log('Delete successful:', response);
        this.loadSubGroups();
      },
      error: (error) => {
        console.error('Error deleting sub-animal group:', error);
      }
    });
  }

  getAnimalGroupName(groupAnimal_id: string | any): string {
    // If groupAnimal_id is already populated as an object, return its name
    if (typeof groupAnimal_id === 'object' && groupAnimal_id?.name) {
      return groupAnimal_id.name;
    }
    
    // Otherwise, search in the AnimalGroups array
    const animalGroup = this.AnimalGroups.find(group => group.id === groupAnimal_id);
    return animalGroup ? animalGroup.name : 'Unknown';
  }

}
