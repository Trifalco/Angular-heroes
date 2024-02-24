import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  constructor(private fb:FormBuilder){//formbuilder me permite trabajar con varios valores en formularios mas eficazmente

  }


  get nombre (){
    return this.formuUser.get('nombre') as FormControl//para no poner validaciones de si esta el valor
  }
  get apellido (){
    return this.formuUser.get('apellido') as FormControl
  }
  get celular (){
    return this.formuUser.get('celular') as FormControl
  }
  get correo (){
    return this.formuUser.get('correo') as FormControl
  }
  get comentario (){
    return this.formuUser.get('comentario') as FormControl
  }

 /*  formuUser = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'apellido': new FormControl('', Validators.required),
    'celular': new FormControl(''),
    'correo': new FormControl('', [Validators.required, Validators.email]),
    'comentario': new FormControl('', Validators.required)
  }); */

  formuUser=this.fb.group({
    'nombre':['', Validators.required],
    'apellido':['', Validators.required],
    'celular':[''],
    'correo':['', [Validators.required, Validators.email]],
    'comentario':['',Validators.required]
  })

  procesar(){
    console.log(this.formuUser.value);
  }

  


}
