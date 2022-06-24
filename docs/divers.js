
 
 // dotenv.config({path:'/home/teacher/oclock/intro-node-fetch/.env' });




 const calcDistance = ([y1, x1], [y2, x2]) => {
    /* Earth radius */
    const R = 6371e3; // metres
    const φ1 = y1 * Math.PI / 180; // φ, λ in radians
    const φ2 = y2 * Math.PI / 180;
    const λ1 = x1 * Math.PI / 180;
    const λ2 = x2 * Math.PI / 180;
    const x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2);
    const y = (φ2 - φ1);
    const d = Math.sqrt((x * x) + (y * y)) * R;
    return d / 1000; // km
  };

  
// ***


srv.post('/test', async (req) => {
  try {
    console.log(req.file);
    /* multer make file available in request */
    const { file } = req;
    /* we get new name stored in request */
    const {id} = req.body;
    /* see cloudinary doc for upload() use :
    https://cloudinary.com/documentation/image_upload_api_reference#upload
     */
    cloudinary.v2.uploader.upload(file.path,
      {
        public_id: id,
      },
      (error, result) => {
        console.log("result", result);
        if (error) console.log(error.message);
        /* we delete file whatsoever from temp folder */
        fs.unlinkSync(`./${file.path}`);
      });
  }
  catch (e) {
    console.error(e);
  }
});

// node data/seedingScript2.js;
            