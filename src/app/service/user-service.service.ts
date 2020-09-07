import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.url;
   }

  getAllPeople() {
    return this.httpClient.get(this.url);
    //console.log('servicio funciona');
  }

}
