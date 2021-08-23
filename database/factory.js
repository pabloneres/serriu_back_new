'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Patient', (faker) => {
  return {
    firstName: faker.first(),
    lastName: faker.last(),
    email: faker.email(),
    clinic_id: 1,
    cpf: faker.cpf(),
    address: faker.address(),
    uf: faker.state(),
    city: faker.city(),
    birth: faker.birthday(),
    gender: faker.gender(),
    tel: faker.phone(),
    avatar_url: faker.avatar(),
  }
})

Factory.blueprint('App/Models/Clinic', (faker) => {
  return {
    name: faker.city() + ' Serriu',
    name_fantasy: faker.city() + ' Serriu',
    email: faker.email(),
    tel: faker.phone(),
    register: faker.cpf(),
    address: faker.address(),
    uf: faker.state(),
    city: faker.city(),
  }
})

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: faker.username(),
    firstName: faker.first(),
    lastName: faker.last(),
    email: faker.username() + faker.first() + '@serriu.com',
    password: faker.password(),
    code: faker.natural({ min: 1000, max: 9999 }),
    department_id: data.department_id
  }
})

Factory.blueprint('App/Models/Profile', (faker, i, data) => {
  return {
    avatar_url: faker.avatar(),
    cpf: faker.cpf(),
    rg: faker.cpf(),
    gender: faker.gender(),
    birth: faker.birthday(),
    tel: faker.phone(),
    croUF: faker.state(),
    croNumber: faker.natural({ min: 100000, max: 999999 }),
    scheduleColor: faker.color({ format: 'hex' }),
    user_id: data.user_id
  }
})
