import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimalGroup } from '../../../models/animalGroup.model';
import { AnimalGroupService } from '../../../services/animalGroup_service/animal-group-service';

@Component({
  selector: 'app-animal-group-edit-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './animal-group-edit-component.html',
  styleUrl: './animal-group-edit-component.css',
})
export class AnimalGroupEditComponent implements OnInit{

  constructor(private route: ActivatedRoute){}

  animalGroup: any = {
   
  };
  animalGroupService = inject(AnimalGroupService);
  AnimalGroupId: string | null = null;
  private cdr = inject(ChangeDetectorRef);

  showNotification = false;
  notificationMessage = '';

  updatedGroup = {
    name:''
  };

  ngOnInit(): void {
    this.AnimalGroupId = this.route.snapshot.paramMap.get('id');
    if (this.AnimalGroupId) {
      this.animalGroupService.getAnimalGroup(this.AnimalGroupId).subscribe(group => {
        this.animalGroup = group;
        this.cdr.detectChanges();
      });
    }
  }

  updateAnimalGroup() {
    if (!this.AnimalGroupId) return;
    
    this.animalGroupService.updateAnimalGroup(this.AnimalGroupId, this.updatedGroup as AnimalGroup).subscribe({
      next: (response) => {
        console.log("Updated Successfully: ", response);
        this.showNotification = true;
        this.notificationMessage = 'Animal group updated successfully!';
        this.resetForm();
        this.cdr.detectChanges();
        
        // Hide notification after 2 seconds
        setTimeout(() => {
          this.showNotification = false;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (error) => {
        if (error.status === 400) {
          if (!this.updatedGroup.name) {
            console.error('Fill the name');
          }
          else {
            console.error('The name must be unique');
          }
        }
        console.log('Error Updating the group: ', error);
      }
    });
  }

  resetForm() {
    this.updatedGroup = {
      name: ''
    };
  }
}
