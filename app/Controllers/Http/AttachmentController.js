'use strict'

const Helpers = use('Helpers')

class AttachmentController {
    async store ({ params, request }) {
        // const property = await Property.findOrFail(params.id)
      
        const image = request.file('image', {
          types: ['image'],
          size: '2mb'
        })
      
        await image.move(Helpers.tmpPath('uploads'), {
          name: `${Date.now()}-${image.clientName}`,
        })

        if (!image.moved()) {
          return image.error()
        }
      

        return image

        // await Promise.all(
        //   images
        //     .movedList()
        //     .map(image => property.images().create({ path: image.fileName }))
        // )
      }
}

module.exports = AttachmentController
