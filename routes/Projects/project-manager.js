const express = require('express');
const ProjectController = require('../../controller/Project/project');
// const { verifyToken } = require('../../helpers/web-token');

const project= new ProjectController();

const router = express.Router();

// Create a new project
router.post('/', (req, res)=>{
    project.createProject(req.body.data.name, req.body.data.path).then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// assign project to post
router.post('/assign', (req, res)=>{
    project.assignPost(req.body.projectId, req.body.postIds).then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// Get all projects
router.get('/', (req, res)=>{
    project.getProjects().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Get projects of single post 
router.get('/post/:id', (req, res)=>{
    project.getPostProjects(req.params.id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// delete a project
router.delete('/:project_id', (req, res)=>{
    project.deleteProject(req.params.project_id).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// delete assignation
router.delete('/post/:id', (req, res)=>{
    project.removePostProject(req.params.id).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;