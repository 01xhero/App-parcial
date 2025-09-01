import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, Iuser } from 'src/app/shared/service/user-service';
import { Api } from 'src/app/shared/provide/api';

@Component({
  selector: 'app-profile',
  templateUrl: '../profiles/profile.page.html', // reutilizamos la vista del register
/*   styleUrls: ['./profile.page.scss'], */
  standalone: false,
})
export class ProfilePage implements OnInit {

  profileForm!: FormGroup;
  countries: { value: string, label: string }[] = [];
  currentUser!: Iuser;

  constructor(
    private userService: UserService,
    private api: Api,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']); // si no hay usuario logueado
      return;
    }
    this.currentUser = user;

    // FormGroup con datos actuales
    this.profileForm = new FormGroup({
      name: new FormControl(user.name, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      country: new FormControl(user.country, Validators.required),
      email: new FormControl({value: user.email, disabled: true}, [Validators.required, Validators.email]),
      password: new FormControl(''),           // nueva contraseña opcional
      confirmPassword: new FormControl('')     // confirmación opcional
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
    if (this.profileForm.invalid) return;

    const updatedUser: Iuser = {
      ...this.currentUser,
      name: this.profileForm.value.name,
      lastName: this.profileForm.value.lastName,
      country: this.profileForm.value.country
    };

    // Si ingresó contraseña nueva
    if (this.profileForm.value.password) {
      updatedUser.password = this.userService.hashPassword(this.profileForm.value.password);
    }

    this.userService.updateUser(updatedUser);
    alert('Perfil actualizado correctamente!');
  }
}
