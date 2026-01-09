import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { RecordEntry } from '../../models/record.model';
import { StockStatusPipe } from '../../pipes/stock-status.pipe';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [CommonModule, StockStatusPipe, RouterLink],
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.css'
})
export class RecordListComponent {
  records: RecordEntry[] = [];
  router: any;

  constructor(private dataService: DataService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.dataService.getRecords().subscribe({
      next: (data) => {
        this.records = data;
        console.log('Records loaded:', data);
      },
      error: (err) => console.error('Error fetching records', err)
    });
  }

  deleteRecord(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this record?')) { // Confirmaiton
      this.dataService.deleteRecord(id).subscribe(() => {
        this.loadRecords(); // Refresh list after delete 
      });
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}