import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubAnimalGroup } from '../../../models/subAnimalGroup.model';
import { SubAnimalGroupService } from '../../../services/subAnimalGroup_service/sub-animal-group-service';
import { AnimalGroup } from '../../../models/animalGroup.model';
import { AnimalGroupService } from '../../../services/animalGroup_service/animal-group-service';

@Component({
  selector: 'app-sub-group-edit-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './sub-group-edit-component.html',
  styleUrl: './sub-group-edit-component.css',
})
export class SubGroupEditComponent implements OnInit {

  constructor(private route: ActivatedRoute){}

  subAnimalGroup: any = {
   
  };
  subAnimalGroupService = inject(SubAnimalGroupService);
  SubGroupId: string | null = null;
  private cdr = inject(ChangeDetectorRef);
  animalGroups: AnimalGroup[] = [];
  animalGroupService = inject(AnimalGroupService);

  subGroup: any = {

  };

  loadSubGroupp(){
    if (this.SubGroupId) {
      this.subAnimalGroupService.getSubAnimalGroup(this.SubGroupId).subscribe(subgroup => {
        this.subGroup = subgroup;
        this.loadGroups();
        this.cdr.detectChanges();
      });
    }
  }

  showNotification = false;
  notificationMessage = '';

  updatedSubGroup = {
    groupAnimal_id: '',
    name: '',
    type: '',
    quantity: 0
  };

  loadGroups() {
    this.animalGroupService.getAllAnimalGroups().subscribe(groups => {
      this.animalGroups = groups;
    });
  }

  ngOnInit(): void {
    this.SubGroupId = this.route.snapshot.paramMap.get('id');
    this.loadSubGroupp();
  }

  updateSubAnimalGroup() {
    if (!this.SubGroupId) return;
    
    this.subAnimalGroupService.updateSubAnimalGroup(this.SubGroupId, this.updatedSubGroup as SubAnimalGroup).subscribe({
      next: (response) => {
        console.log("Updated Successfully: ", response);
        this.showNotification = true;
        this.notificationMessage = 'Sub animal group updated successfully!';
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
          if (!this.updatedSubGroup.groupAnimal_id || !this.updatedSubGroup.name || !this.updatedSubGroup.quantity || !this.updatedSubGroup.type) {
            console.error('You must fill all the fields');
          }
          else {
            console.error('The name must be unique');
          }
        }
        console.log('Error Updating the sub group: ', error);
      }
    });
  }

  resetForm() {
    this.updatedSubGroup = {
      groupAnimal_id: '',
      name: '',
      type: '',
      quantity: 0
    };
  }
}
