const Image = require("../models/image");

exports.saveImage = (req, res, next) => {
  console.log("backend DAo image");
  let url = req.protocol + "://" + req.get("host");
  let imageURL = url + "/images/" + req.file.filename;
  const imageName = req.body.imageName;
  const catogery = req.body.catogery;
  Image.create({
    imageName: imageName,
    category: catogery,
    imageURL: imageURL,
    userId: req.userData.userId,
    userName: req.userData.userName,
    downloads: 0,
  })
    .then((result) => {
      res.status(200).json({
        imageName: imageName,
        userId: req.userData.userId,
        message: "iamge saved",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "image not saved",
        status: false,
      });
    });
};

exports.getImages = (req, res) => {
  Image.findAll()
    .then((images) => {
      res.status(200).json({
        data: images,
      });
    })
    .catch((err) => {
      res.status(401).json({ message: "not found" });
    });
};

exports.getImage = async (req, res) => {

  try {
    let id = req.params.id;
    const image = await Image.findAll({ where: { id: id } });
    let download = image[0].downloads + 1;

    const updatedImage = await Image.update({ downloads: download }, { where: { id: image[0].id } })
    const img = await Image.findAll({ where: { id: id } });
    res.status(200).json({
      image: img[0]
    })

  }
  catch (err) {
    console.log(err);
    res.status(401).json({
      mesage: "not updated"
    })
  }
}

exports.search = async (req, res) => {
  console.log("search")
  try {
    const images = await Image.findAll({ where: { category: req.params.cat } });
    res.status(200).json({
      images: images
    })
  }
  catch (err) {
    console.log(err);
    res.status(401).json({
      mesage: "not found"
    })
  }

}

exports.getImagesByUser = async (req, res) => {


  let id = parseInt(req.params.id);


  try {
    const images = await Image.findAll({ where: { userId: id } });
    if (!images) {
      res.status(401).json({
        mesage: "not found"
      })
    }
    res.status(200).json({
      images: images
    })
  }
  catch (err) {
    console.log(err);
    res.status(401).json({
      mesage: "not found"
    })
  }

}
