import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SidenavService } from './sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  @ViewChild('panel', { static: true }) private sidePanel!: MatSidenav;
  @ViewChild('content', { static: true, read: ViewContainerRef }) private vcf!: ViewContainerRef;

  constructor(private breakpointObserver: BreakpointObserver, private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setPanel(this.sidePanel);
    this.sidenavService.setContentVcf(this.vcf);
  }

  logout(){
    
  }
}
