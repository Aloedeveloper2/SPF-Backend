const express = require('express');
const formidable = require('formidable');
const path = require('path');
const ListeningController = require('../../controller/listening');
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();


router.post('/', (req, res)=>{
    const listening = new ListeningController(
        req.body.data.observation,
        req.body.data.post,
    );
    listening.createListening().then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

router.get('/', (req, res)=>{
    const listening = new ListeningController();
    listening.getListenings().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// File upload
router.post('/:listeningId/file', (req, res)=>{
    const listening = new ListeningController();
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err)
            res.status(400).send('Le fichier est endommagé!');
        }
        listening.upload(req.params.listeningId, `${files.file.newFilename}_${files.file.originalFilename}`).then(response =>{
            res.status(201).send(response);
        }).catch(error =>{
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        })
    });

    form.on("fileBegin", (name, file) => {
		file.filepath = path.join(
			`${__dirname}/../../uploads`,
			`${file.newFilename}_${file.originalFilename}`
		);
	});

})

router.get("/audio/:filename", (req, res) => {
	var options = {
		root: path.join(__dirname + "/../../uploads"),
	};

	res.sendFile(req.params.filename, options, function (err) {
		if (err) {
			res.status(404).send("Problème de chargement du fichier");
		}
	});
});

// delete a listening
router.delete('/:id', (req, res)=>{
    const listening = new ListeningController();
    listening.deleteListening(req.params.id).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;