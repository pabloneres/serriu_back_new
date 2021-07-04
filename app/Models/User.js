'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  // static get traits () {
  //   return [
  //     '@provider:Adonis/Acl/HasRole'
  //   ]
  // }


  static get hidden() {
    return ['password']
  }

  department() {
    return this.belongsToMany('App/Models/Department')
      .pivotTable('user_departments')
  }

  profile() {
    return this.hasOne('App/Models/Profile')
  }

  acessos() {
    return this.hasMany('App/Models/UserAcessClinic')
  }
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
