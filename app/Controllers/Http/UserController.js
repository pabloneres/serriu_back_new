"use strict";

const User = use("App/Models/User");
const Profile = use("App/Models/Profile");
const UserAcessClinic = use("App/Models/UserAcessClinic");

const Database = use("Database")

class UserController {
  async profile({ request, auth }) {
    const user = await Profile.query().where('user_id', auth.user.id)

    return user;
  }

  async index({ request }) {
    const { cargo, clinica } = request.get()

    if (cargo && clinica) {
      const users = await User.query()
        .with('profile')
        .with('department', builder => {
          // builder.where('id', 'dentista')
        })
        .whereHas('acessos', builder => {
          builder
            .where('clinic_id', clinica)
        })
        .fetch()
      return users;
    }
    if (cargo) {
      const users = await User.query()
        .where('cargo', cargo)
        .with('profile')
        .fetch()
      return users;
    }

    const users = await User.query()
      .with('profile').fetch()
    return users;
  }

  async store({ request }) {
    // return request.all()
    const trx = await Database.beginTransaction()
    const data = request.all();

    const user = await User.create({
      username: data.username,
      email: data.email,
      code: data.code,
      department_id: data.cargo,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    }, trx);

    const profile = await Profile.create({
      user_id: user.id,
      avatar_url: data.avatar_url,
      cpf: data.cpf,
      rg: data.rg,
      gender: data.gender,
      birth: data.birth,
      marital_status: data.marital_status,
      schooling: data.schooling,
      tel: data.tel,
      croUF: data.croUF,
      croNumber: data.croNumber,
      scheduleView: data.scheduleView,
      scheduleColor: data.scheduleColor,
    }, trx);



    if (data.cargo !== 'administrador') {
      await UserAcessClinic.createMany(data.acessos.map(item => ({
        user_id: user.id,
        clinic_id: item
      })), trx)
    }

    trx.commit()
    return user
  }

  async show({ request, params }) {
    const { id } = params

    const user = await User.query()
      .where('id', id)
      .with('profile')
      .with('acessos')
      .with('department')
      .first()

    return user

  }
}

module.exports = UserController;
