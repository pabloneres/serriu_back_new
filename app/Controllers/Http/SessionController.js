'use strict'

class SessionController {
    async index ({ request, auth, response }) { 
        return response.send('Status: online')
      }
    async store ({ request, auth }) { 
        const { username, password } = request.all()
    
        const token = await auth.attempt(username, password)
    
        return token
      }
}

module.exports = SessionController
