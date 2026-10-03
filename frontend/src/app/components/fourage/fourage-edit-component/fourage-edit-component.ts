import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubAnimalGroup } from '../../../models/subAnimalGroup.model';
import { SubAnimalGroupService } from '../../../services/subAnimalGroup_service/sub-animal-group-service';
import { Fourage } from '../../../models/fourage.model';
import { FourageService } from '../../../services/fourage_service/fourage-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fourage-edit-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fourage-edit-component.html',
  styleUrl: './fourage-edit-component.css',
})
export class FourageEditComponent implements OnInit {

  
  fourageId: string | null = null;
  fourageForm!: FormGroup;
  AnimalSubGroups: SubAnimalGroup[] = [];
  AnimalSubGroupsService = inject(SubAnimalGroupService);
  FourageService = inject(FourageService);
  private cdr = inject(ChangeDetectorRef);

  showNotification = false;
  notificationMessage = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fourageId = this.route.snapshot.paramMap.get('id');
    this.fourageForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      suitableFor: this.fb.array([])
    });
    this.loadSubGroups();
    
    // Load existing fourage data if editing
    if (this.fourageId) {
      this.FourageService.getFourage(this.fourageId).subscribe(fourage => {
        this.fourageForm.patchValue({
          name: fourage.name,
          type: fourage.type
        });
        
        // Set the checkboxes for suitableFor
        fourage.suitableFor.forEach(subGroupId => {
          this.suitableForArray.push(this.fb.control(subGroupId));
        });
        
        this.cdr.detectChanges();
      });
    }
  }

  get suitableForArray(): FormArray {
    return this.fourageForm.get('suitableFor') as FormArray;
  }

  onCheckboxChange(e: any) {
    const suitableFor: FormArray = this.suitableForArray;

    if (e.target.checked) {
      suitableFor.push(this.fb.control(e.target.value));
    } else {
      const index = suitableFor.controls.findIndex(x => x.value === e.target.value);
      suitableFor.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.fourageForm.value);
    this.updateFourage();
  }

  loadSubGroups() {
    this.AnimalSubGroupsService.getAllSubAnimalGroups().subscribe(subgroups => {
      this.AnimalSubGroups = subgroups;
    });
  }

  updateFourage() {
    const formValue = this.fourageForm.value;
   
    if(this.fourageId) {
      this.FourageService.updateFourage(this.fourageId, formValue as Fourage).subscribe({
        next: (response) => {
          console.log("Updated Successfully: ", response);
          this.showNotification = true;
          this.notificationMessage = 'Fourage updated successfully!';
          this.fourageForm.reset(); 
          this.suitableForArray.clear();
          this.cdr.detectChanges();
          
          setTimeout(() => {
            this.showNotification = false;
            this.cdr.detectChanges();
          }, 2000);
        },
        error: (error) => {
          if (error.status === 400) {
            if (!formValue.name || !formValue.type || formValue.suitableFor.length <= 0) {
              console.log('You must fill all the fields');
            }
            else  {
              console.log('The name must be unique');
            }
          }
          console.log('Error updating fourage: ', error);
        }
      });
    }
  }

  onCancel(): void {
    this.fourageForm.reset();
  } 
}
