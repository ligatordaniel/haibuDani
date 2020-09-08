import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public showModal: boolean;
  public user: any;
  constructor() {
    this.showModal = false;
  }

  ngOnInit() {
  }

  /**
   * Muestra u oculta el cuerpo del modal
   *
   * @memberof ModalComponent
   */
  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
