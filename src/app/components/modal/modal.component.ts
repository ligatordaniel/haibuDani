import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  showModal: boolean = false;
  user: any;
  constructor() { }

  ngOnInit() {
  }

  /**
   * Muestra u oculta el cuerpo del modal
   *
   * @memberof ModalComponent
   */
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
