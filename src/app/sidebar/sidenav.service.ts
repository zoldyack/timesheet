import { Injectable, ViewContainerRef, TemplateRef } from '@angular/core';
import { MaterialModule } from '../material-module';


@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private panel!: MaterialModule|any;
  private vcf!: ViewContainerRef;

  constructor() {}

  setPanel(sidenav: MaterialModule) {
    this.panel = sidenav;
  }

  setContentVcf(viewContainerRef: ViewContainerRef) {
    this.vcf = viewContainerRef;
  }

  private createView(template: TemplateRef<any>) {
    this.vcf.clear();
    this.vcf.createEmbeddedView(template);
  }

  open(template: TemplateRef<any>) {
    this.createView(template);
    return this.panel.open();
  }

  close() {
    return this.panel.close();
  }

  toggle() {
    return this.panel.toggle();
  }
}
