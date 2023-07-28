import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type: string = "password";
  type2: string = "password";
  isText: boolean = false;
  isText2: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  eyeIcon2: string = "fa-eye-slash"
  signUpForm! : FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required], /*primer campo en los corchetes es el contenido del input por defecto es vacio, el segundo es el objeto de validator el cual es requerido*/
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  hideShowPass() { /*cambiar el texto y la imagen del ojo como opción de ver una contraseña*/
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  hideShowPass2() { /*cambiar el texto y la imagen del ojo como opción de ver una contraseña*/
    this.isText2 = !this.isText2;
    this.isText2 ? this.eyeIcon2 = "fa-eye" : this.eyeIcon2 = "fa-eye-slash";
    this.isText2 ? this.type2 = "text" : this.type2 = "password";
  }

  

  onSingUp(){
    if(this.signUpForm.valid && this.signUpForm.value.password == this.signUpForm.value.confirmPassword){
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (res => {
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']); //una vez terminada la accion mandame a la ruta login
        }),
        error: (err => {
          alert(err?.error.message)
        }) 
      });
      console.log(this.signUpForm.value)
    } else if (this.signUpForm.value.password != this.signUpForm.value.confirmPassword) {
      ValidateForm.validateAllFormFileds(this.signUpForm);
      alert("Your form is invalid, Your Passsword must be equals");
    } else {
      ValidateForm.validateAllFormFileds(this.signUpForm);
      alert("Your form is invalid");
    }
  }
}
