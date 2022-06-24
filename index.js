require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/router');
const cloudinary = require('cloudinary');
const fs = require('fs');
const multer = require('multer');
const { cleaner } = require('./app/middlewares');
const { imageMW, checkUser } = require('./app/middlewares');
const {  flush } = require('./app/services/cache');


const app = express();

const load = multer({ dest: 'tmp-pic/' });

cloudinary.config(process.env.CLOUDINARY_URL);

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* cors */

app.use(cors(
  // {
  //   origin: 'https://vivelocal.surge.sh/*',
  //   optionsSuccessStatus: 200
  // }
));

/* for use cloudinary */

app.use(load.single('file'));// load is not the middleware itself.

app.post('/api/upload/:userId(\\d+)', checkUser,flush, async (request, response, next) => {
  // console.log(req.file);
  // console.log(req.body);
  /* multer make file available in request */
  let { file } = request;
  try {
    /* we get IDs stored in request */
    const {company_id,product_id} = request.body;
    /* we set id for cloudinary file naming. 
    if product_id is not provided, we replace it with "main" : it will change company main picture. */
    const id = `${company_id}-${product_id||'main'}`;
    /* see cloudinary doc for upload() use :
    https://cloudinary.com/documentation/image_upload_api_reference#upload
     */
    const result = await cloudinary.v2.uploader.upload(
        file.path,
      { public_id: id,
      
        transformation: [
          // {height: 200, width: 300, x: 355, y: 410, crop: "crop"},
          {
            // height: 270,
            width: 600, crop: "fill"
          }
        ]
      }
    );
          
   const creatingTime = Date.now();
   response.json({ image: result.secure_url,creatingTime:creatingTime} );
   
   request.body.secure_url = result.secure_url;
    next();
    // module.exports = {result:result} 
  } catch (error) {
    console.log(error.message);
    response.json({error:error.message});
  } finally{
    /* we delete file whatsoever from temp folder */
    if (file) fs.unlinkSync(`./${file.path}`)
  }
});
app.use('/api/upload', imageMW);

/* for use middleware sanitazer */

app.use(cleaner);

/* JSDOC SWAGGER */

const expressJSDocSwagger = require('express-jsdoc-swagger');
const options = {
  info: {
    version: '1.0.0',
    title: 'Maraicher',
    description: 'A REST API for found a company',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
};
expressJSDocSwagger(app)(options);


app.use( router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});