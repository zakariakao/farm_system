import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SubAnimalGroup } from '../../../models/subAnimalGroup.model';
import { SubAnimalGroupService } from '../../../services/subAnimalGroup_service/sub-animal-group-service';
import { FourageService } from '../../../services/fourage_service/fourage-service';
import { Fourage } from '../../../models/fourage.model';
import { FormBuilder, FormGroup, FormsModule, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fourage-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './fourage-component.html',
  styleUrl: './fourage-component.css',
})
export class FourageComponent implements OnInit {

  fourageForm!: FormGroup;
  AnimalSubGroups: SubAnimalGroup[] = [];
  Fourages: Fourage[] = [];
  AnimalSubGroupsService = inject(SubAnimalGroupService);
  FourageService = inject(FourageService);
  private cdr = inject(ChangeDetectorRef);
  isWarning: Boolean = false;
  warningContent: string = '';
  isSucces: Boolean = false;
  succesContent: string = '';
  isError: Boolean = false;
  errorContent: string = '';

  constructor(private fb: FormBuilder) {}

  newFourage = {
    name: '',
    type: '',
    suitableFor: []
  }

  ngOnInit(): void {
    this.fourageForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      suitableFor: this.fb.array([])
    });
    this.loadSubGroups();
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
    this.addFourage();
  }


  loadSubGroups() {
    this.AnimalSubGroupsService.getAllSubAnimalGroups().subscribe(subgroups => {
      this.AnimalSubGroups = subgroups;
    });
  }

  addFourage() {
    const formValue = this.fourageForm.value;
    

    this.FourageService.createFourage(formValue as Fourage).subscribe({
      next: () => {
        this.fourageForm.reset(); // Reset form after successful submission
        this.suitableForArray.clear(); // Clear the FormArray
        this.succesContent = 'Fourage Created succesfly';
        this.isSucces = true;
        this.cdr.detectChanges();
          setTimeout(() => {
            this.isSucces = false;
            this.cdr.detectChanges();
          }, 3000);
      },
      error: (error) => {
        if (error.status === 400) {
          if (!formValue.name || !formValue.type || formValue.suitableFor.length <= 0) {
            console.error('Please fill all the fields');
            this.warningContent = 'Please fill the name' ;
              this.isWarning = true;
              this.cdr.detectChanges();
              setTimeout(() => {
                this.isWarning = false;
                this.cdr.detectChanges();
              }, 3000);
          }
          else {
            console.error('The name must be unique');
            this.errorContent = 'The name is already exists Its be a unique name';
              this.isError = true;
              this.cdr.detectChanges();
              setTimeout(()=> {
                this.isError = false;
                this.cdr.detectChanges();
              }, 3000);
          }
        }
        console.log('Error: ', error);
      }
    });
  }

  onCancel(): void {
    this.fourageForm.reset();
  }  

}
