import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taslog';
  isLogin: boolean = false;
  isLoading:boolean = false;

  showHeader = false;
  showSidebar = false;
  showFooter = false;

  constructor( private _auth: AuthService,private router: Router, private activatedRoute: ActivatedRoute) {
    // this.isUserLogin();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader =
          this.activatedRoute.firstChild!.snapshot.data['showHeader'] !== false;
        this.showSidebar =
          this.activatedRoute.firstChild!.snapshot.data['showSidebar'] !== false;
        this.showFooter =
          this.activatedRoute.firstChild!.snapshot.data['showFooter'] !== false;
      }
    });
  }

  isUserLogin(){
    
    this.isLoading = true;
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
        this.router.navigate(['profile']);
    }
  }
  
  logout(){
    this._auth.clearStorage()
    this.router.navigate(['']);
  }

}
