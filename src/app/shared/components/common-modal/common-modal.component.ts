import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-commpom-modal',
  templateUrl: './common-modal.component.html',
  standalone: true,
})
export class CommonModalComponent implements OnInit {
  @Input() message!: string;
  @Input() header!: string;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.activeModal.close(true);
  }

  onCancel(): void {
    this.activeModal.dismiss('Cross click');
  }
}
