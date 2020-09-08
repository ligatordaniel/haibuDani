import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public title: string;
  public valueFilter: string;
  public users: any;
  @ViewChild('detailModal') modal;

  constructor(private userService: UserService) {
    this.title = "Lista de usuarios";
    this.valueFilter = "";
    this.users = [];
   }

  handleSearch(value:string){
    console.log(value);
    this.valueFilter = value;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllPeople().subscribe(
      (res: any) => {
        const response = res;
        response.forEach(person => {
          person.fechaNacimiento = this.isValidDate(person.fechaNacimiento);
          person.rut = this.rutIsValid(person.rut) ? person.rut : `${person.rut} (Rut inválido)`;
          this.users.push(person);
        });
        console.log(this.users);
      },
      err => {
        console.log('Error en la petición');
      }
    );
  }

  isValidDate(date) {
    return moment(date, "DD/MM/YYYY", true).isValid() ? date : `${date} (Fecha inválida)`;
  }

  public calculateDV(rut): string {
    const body = `${rut}`;
    let sum = 0;
    let multiple = 2;

    for (let i = 1; i <= body.length; i++) {
      const index = multiple * parseInt(body.charAt(body.length - i), 10);

      sum += index;

      if (multiple < 7) {
        multiple += 1;
      } else {
        multiple = 2;
      }
    }

    const dvExpected = 11 - (sum % 11);
    if (dvExpected === 10) { return 'k'; }
    if (dvExpected === 11) { return '0'; }
    return `${dvExpected}`;
  }


  rutIsValid(rut): boolean {
    if (!rut || rut.trim().length < 3) { return false; }
    const sanitizedRut = rut.replace(/[^0-9kK-]/g, '');

    if (sanitizedRut.length < 3) { return false; }

    const split = sanitizedRut.split('-');
    if (split.length !== 2) { return false; }

    const num = parseInt(split[0], 10);
    const dgv = split[1];

    const dvCalc = this.calculateDV(num);
    return dvCalc === dgv;
  }

    openModal(user): void {
      this.modal.user = user;
      this.modal.toggleModal();
    }

    closeModal(): void {
      this.modal.toggleModal();
    }
 }



