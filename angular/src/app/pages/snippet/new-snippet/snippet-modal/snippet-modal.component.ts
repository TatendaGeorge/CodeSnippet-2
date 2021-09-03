import { AppComponentBase } from '@shared/app-component-base';
import { Component, ElementRef, Injector, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.scss']
})
export class SnippetModalComponent extends AppComponentBase {

  @ViewChild('newSnippet') newSnippet: ElementRef;
  @Output() snippetAdded = new EventEmitter<string>();
  code: string;

  constructor(
    injector: Injector,
    private modalService: NgbModal) {
    super(injector);
  }

  show(code: string) {
    this.code = code;
    this.modalService.open(this.newSnippet, { backdrop: true , size: 'lg' })


  }

  close() {
    this.modalService.dismissAll();
  }

  save() {
    this.snippetAdded.emit(this.code);
    this.close();
  }

}
