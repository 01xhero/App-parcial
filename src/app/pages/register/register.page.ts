import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, Iuser } from 'src/app/shared/service/user-service';
import { Api } from 'src/app/shared/provide/api';
import { Incriptador } from 'src/app/shared/provide/incriptador';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  countries: { value: string, label: string }[] = [];

  constructor(
    private userService: UserService,
    private api: Api,
    private router: Router,
    private incriptador: Incriptador
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });

    this.loadCountries();
  }

  async loadCountries() {
    try {
      (await this.api.get<{ data: any }>('https://countriesnow.space/api/v0.1/countries/flag/unicode'))
        .subscribe({
          next: (res) => {
            this.countries = res.data.map((c: any) => ({
              value: c.name,
              label: `${c.flag} ${c.name}`
            }));
          },
          error: (err) => console.error('Error cargando países:', err)
        });
    } catch (error) {
      console.error('Error en la petición de países:', error);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const user: Iuser = {
      id: this.userService.generateId(),
      name: this.registerForm.value.name,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: password, // se encripta en el servicio
      country: this.registerForm.value.country
    };

    const success = this.userService.crearUsuario(user);
    if (!success) {
      console.error('El email ya está registrado');
      return;
    }

    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
