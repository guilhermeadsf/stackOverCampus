const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const uuid = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'stackovercampus-8a3f6',
  keyFilename: 'keyfilename.json'
});

exports.uploadImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      fs.writeFileSync('/tmp/imageToSave.jpg', request.body.image, 'base64');

      const bucket = storage.bucket('stackovercampus-8a3f6.appspot.com');

      const id = uuid();
      bucket.upload(
        '/tmp/imageToSave.jpg',
        {
          uploadType: 'media',
          destination: `/posts/${id}.jpg`,
          metadata: {
            metadata: {
              contentType: 'image/jpeg',
              firebaseStorageDownloadTokens: id
            }
          }
        },
        (err, file) => {
          if (err) {
            console.log(err);
            return response.status(500).json({ error: err });
          } else {
            const fileName = encodeURIComponent(file.name);
            const imageUrl =
              'https://firebasestorage.googleapis.com/v0/b/' +
              bucket.name +
              '/o/' +
              fileName +
              '?alt=media&token=' +
              id;
            return response.status(201).json({ imageUrl: imageUrl });
          }
        }
      );
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  });
});

exports.uploadPdf = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    try {
      fs.writeFileSync('/tmp/documentToSave.pdf', request.body.document, 'base64');

      const bucket = storage.bucket('stackovercampus-8a3f6.appspot.com');

      const id = uuid();
      bucket.upload(
        '/tmp/documentToSave.pdf',
        {
          uploadType: 'media',
          destination: `/documents/${id}.pdf`,
          metadata: {
            metadata: {
              contentType: 'document/pdf',
              firebaseStorageDownloadTokens: id
            }
          }
        },
        (err, file) => {
          if (err) {
            console.log(err);
            return response.status(500).json({ error: err });
          } else {
            const fileName = encodeURIComponent(file.name);
            const documentUrl =
              'https://firebasestorage.googleapis.com/v0/b/' +
              bucket.name +
              '/o/' +
              fileName +
              '?alt=media&token=' +
              id;
            return response.status(201).json({ documentUrl: documentUrl });
          }
        }
      );
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  });
});

