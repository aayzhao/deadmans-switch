import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.css'
})

export class FileManagementComponent implements OnInit {
  userEmail: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userEmail = this.userService.getCurrentUserEmail();
  }
}
