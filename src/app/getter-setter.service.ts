import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetterSetterService {
  private value: any;

  constructor() {

  }
  public setParams(value) {
    this.value = value;
  }

  getParams() {
    return this.value;
  }
}
