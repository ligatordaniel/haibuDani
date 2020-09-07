import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public title: string;
  public users = [];
  public alertMessage: any;



  constructor(private userService: UserService) {
    this.title = "Lista de usuarios";
   }


  handleSearch(value:string){
    console.log(value);
    this.filtroValor = value;
  }

  filtroValor = ''

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getAllPeople().subscribe(
      (res: any) => {
        const response = res;
        response.forEach(item => {
          item.fechaNacimiento = this.isValidDate(item.fechaNacimiento);
          item.rut = this.rutIsValid(item.rut);
          this.users.push(item);
        })
        console.log(this.users);
      },
      err => {
        console.log('Error en la petición');
      }
    );
  }

  isValidDate(date) {
    return moment(date, "DD/MM/YYYY", true).isValid() ? date : 'Dato inválido';
  }

    rutIsValid(rut) {
       function calculateDV(rut) {
        const body = rut;
        let sum = 0;
        let multiple = 2;

        for (let i = 1; i <= body.length; i++) {
          const index = multiple * body.charAt(body.length - i);

          sum += index;

          if (multiple < 7) {
            multiple += 1;
          } else {
            multiple = 2;
          }
        }

        const dvExpected = 11 - (sum % 11);
        if (dvExpected === 10) return "k";
        if (dvExpected === 11) return "0";
        return dvExpected;
      }
      if (!rut || rut.trim().length < 3) return false;
      const sanitizedRut = rut.replace(/[^0-9kK-]/g, "");

      if (sanitizedRut.length < 3) return false;

      const split = sanitizedRut.split("-");
      if (split.length !== 2) return false;

      const num = parseInt(split[0], 10);
      const dgv = split[1];

      const dvCalc = calculateDV(num);
      return dvCalc === dgv ? rut : 'Inválido'; /*rut Invalido*/
    }
 }



