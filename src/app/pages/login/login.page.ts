import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Importar Router
import { Iuser, UserService } from 'src/app/shared/service/user-service';
import { Api } from 'src/app/shared/provide/api';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private http: Api,
    private router: Router // ✅ Inyectar Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const user: Iuser = {
      id: '1233455',
      name: 'no se',
      lastName: 'no se',
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      country: 'col'
    };

    this.userService.crearUsuario(user);
  }

  goToRegister() {
    this.router.navigate(['/register']); // ✅ Ahora funciona
  }
}
