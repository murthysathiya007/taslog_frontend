import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public protectedData: any
  public loading: boolean = false

  constructor(
    private _api: ApiService, 
    private _auth: AuthService,
    
  ) { }

  ngOnInit(): void {

    
    this._api.getTypeRequest('profile/profile').subscribe((res: any) => {
      this.protectedData = res
    });

  }



}