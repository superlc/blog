
const fs = require('fs')
const formidable = require('formidable')
const request = require('request')

class Uploader {
    getPostData(ctx) {
        return new Promise(function(resolve,reject) {
            var form = new formidable.IncomingForm();

            form.parse(ctx.req, function(err, fields, files) {
                if (err) {
                    console.log('formed fail', err)
                    reject(err)
                } else {
                    resolve(files)
                }
            });
        })
    }
    async save(ctx) {
        const data = await this.getPostData(ctx)
        const { image } = data
        try {

            if (image) {
                const { name, size} = image
                console.log(image)
                
                var formData = {
                    file: {
                        value: fs.createReadStream( image.path ),
                        options: {
                            filename: name,
                            contentType: image.type
                        }
                    }
                }
                return new Promise((resolve, reject) => {
                    request.post({
                    url:'', 
                        formData
                    }, (err, httpResponse, body) => {
                        if (err) {
                            console.log('upload failed:', err)
                            reject('')
                        } else {
                            const b = JSON.parse(body)
                            resolve(b.data.url)
                        }
                    })
                })
                
            }
        } catch(e) {
            console.log('upload op failed:', e)
            return Promise.reject('')
        }
    }
}

module.exports = Uploader