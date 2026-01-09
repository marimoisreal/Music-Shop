import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-record-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit {
  recordForm: FormGroup;
  isViewMode = false;
  isEditMode = false;
  recordId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form group with validation
    this.recordForm = this.fb.group({
      // Record Details
      title: ['', Validators.required],
      artist: ['', Validators.required],
      releaseYear: ['', [Validators.required, Validators.min(1900)]],
      price: ['', [Validators.required, Validators.min(0)]],
      format: ['', Validators.required],
      genre: ['', Validators.required],
      stockQty: ['', [Validators.required, Validators.min(0)]],
      // Customer Details
      customerFirstName: ['', Validators.required],
      customerLastName: ['', Validators.required],
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+[A-Za-z]$')]],
      customerContact: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
      customerEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUrl = this.router.url;

    if (id) {
      this.recordId = +id;
      this.isViewMode = currentUrl.includes('view');
      this.isEditMode = currentUrl.includes('edit');

      this.dataService.getRecordById(this.recordId).subscribe({
        next: (record: any) => {
          this.recordForm.patchValue(record);
          if (this.isViewMode) {
            this.recordForm.disable(); // Disable form in view mode
          }
        },
        error: (err: any) => console.error('Error loading record', err)
      });
    }
  }

  onSubmit(): void {
    if (this.recordForm.valid) {
      if (this.isEditMode && this.recordId) {
        // Update logic
        this.dataService.updateRecord(this.recordId, this.recordForm.getRawValue()).subscribe({
          next: () => {
            alert('Record updated successfully!');
            this.router.navigate(['/records']);
          },
          error: (err: any) => console.error(err)
        });
      } else {
        // Add new record logic
        this.dataService.addRecord(this.recordForm.value).subscribe({
          next: () => {
            alert('Record added successfully!');
            this.router.navigate(['/records']);
          },
          error: (err: any) => console.error(err)
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/records']);
  }
}
