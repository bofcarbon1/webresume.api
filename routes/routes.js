// routes/routes.js

// expose the routes to our app with module.exports
module.exports = function(app) {
    
    //json
    var jsonfile = require('jsonfile');
 
    // Web Resume JSON objects 
    var personalJ = "";
    var emailJ = "";
    var sitelinksJ = [];
    var servicesJ = [];
    var skilltype ="";
    var skillsJ = [];
    var projectsJ = [];
      
    // Get resume personal data 
    app.get("/api/resume/personal", function(req, res, next) {
    var file = './data/json/wrpersonal.json';
    jsonfile.readFile(file, function(err, obj) {
        if(err) return next(err);
        if(obj) {
            //load and return resume personal data
            personalJ = { 
                "name" : obj.name,
                "title" : obj.title,
                "phone" : obj.phone
                };
            res.json(personalJ);
            personalJ = "";
            res.end();
            }
        });
    });

    // Get resume personal exported data 
    app.get("/api/resume/personal/exported", function(req, res, next) {
        var file = './data/exported/wrpersonal.json';
        jsonfile.readFile(file, function(err, obj) {
            if(err) return next(err);
            if(obj) {
                //load and return resume personal data
                personalJ = { 
                    "name" : obj.name,
                    "title" : obj.title,
                    "phone" : obj.phone
                    };
                res.json(personalJ);
                personalJ = "";
                res.end();
            }
        });
    });

    // Get resume email data 
    app.get("/api/resume/email", function(req, res, next) {
        var file = './data/json/wremail.json';
        jsonfile.readFile(file, function(err, obj) {
            if(err) return next(err);
            if(obj) {
                //load and return resume email data
                emailJ = { 
                    "emailname" : obj.emailname,
                    "emailsite" : obj.emailsite
                    };
                res.json(emailJ);
                emailJ = "";
                res.end();
            }
        });
    });

    // Get resume site link data 
    app.get("/api/resume/sitelinks", function(req, res, next) {
        var file = './data/json/wrsitelinks.json';
        jsonfile.readFile(file, function(err, obj) {
            if(err) return next(err);
            if(obj) {
                //load and return resume sitelink json 
                for(var i = 0; i < obj.length; i++)
                    {
                        sitelinksJ.push({
                            "id" : obj[i].id,
                            "sitename" : obj[i].sitename,
                            "sitelink"  : obj[i].sitelink
                        });
                    }
                res.json(sitelinksJ);
                sitelinksJ = [];
                res.end();
            }
        });
    });

     // Get resume services data 
     app.get("/api/resume/services", function(req, res, next) {
        var file = './data/json/wrservices.json';
        jsonfile.readFile(file, function(err, obj) {
            if(err) return next(err);
            if(obj) {
                //load and return resume services json 
                for(var i = 0; i < obj.length; i++)
                {
                    servicesJ.push({
                        "service" : obj[i].service
                    });
                }
                res.json(servicesJ);
                servicesJ = [];
                res.end();
            }
        });
    });

    // Get resume skill data 
    app.get("/api/resume/skills", function(req, res, next) {
        var file = './data/json/wrskill.json';
        skilltype = req.param('skilltype');
        jsonfile.readFile(file, function(err, obj) {
                if(err) return next(err);
                if(obj) {
                    //load and return resume services json 
                    for(var i = 0; i < obj.length; i++)
                    {
                        if (skilltype === obj[i].skilltype) {
                            skillsJ.push({
                                "skillname" : obj[i].skillname,
                                "skilltype" : obj[i].skilltype
                        });
                    }
                }
                res.json(skillsJ);
                console.log("skillsJ: ", skillsJ);
                skillsJ = [];
                skilltype = "";
                res.end();
            }
        });
    });

    // Get resume project data 
    app.get("/api/resume/projects", function(req, res, next) {
        var file = './data/json/wrproject.json';
        jsonfile.readFile(file, function(err, obj) {
            if(err) return next(err);
            if(obj) {
                //load and return resume projects json 
                for(var i = 0; i < obj.length; i++)
                {
                    projectsJ.push({
                        "name" : obj[i].name,
                        "year" : obj[i].year,
                        "note" : obj[i].note, 
                        "type" : obj[i].type
                    });
                }
                res.json(projectsJ);
                projectsJ = [];
                res.end();
            }
        });
    });

    // Send extracted personal JSON data to exported folder  
    app.get("/api/resume/export/personal", function(req, res) {
        //load exported personal data
        var body = JSON.stringify(req.param('body'));
        console.log("app.get: /api/resume/export/personal: body: ", body);
        personalJ = { 
            "name" :  body.name,
            "title" : body.title,
            "phone" : body.phone
        };
        console.log("app.post: /api/resume/export/personal: personalJ: ", personalJ);
        var file = './data/exported/wrpersonal.json';
        jsonfile.writeFile(file, personalJ, function (err) {
            if(err) {
                console.log("err: ", err);
                res.json(err);
                res.end();
            };
            res.json("OK");
            personalJ = "";
            res.end();
        });
    });

    app.post("/api/resume/export/skill", function(req, res) {
        //load exported skill data
        skillsJ = { 
            "id" :  req.body.id,
            "skillname" : req.body.skillname,
            "skilltype" : req.body.skilltype
        };
        console.log("app.post: /api/resume/export/skill: skillsJ: ", skillsJ);
        var file = './data/exported/wrskill.json';
        jsonfile.writeFile(file, skillsJ, function (err) {
            if(err) {
                console.log("err: ", err);
                res.json(err);
                res.end();
            };
            res.json("OK");
            skillsJ = "";
            res.end();
        });
    }); 

    app.post("/api/resume/export/project", function(req, res) {
        //load exported project data
        projectsJ = { 
            "id" :  req.body.id,
            "name" : req.body.name,
            "year" : req.body.year,
            "note" : req.body.note,
            "type" : req.body.type
        };
        console.log("app.post: /api/resume/export/project: projectsJ: ", projectsJ);
        var file = './data/exported/wrproject.json';
        jsonfile.writeFile(file, projectsJ, function (err) {
            if(err) {
                console.log("err: ", err);
                res.json(err);
                res.end();
            };
            res.json("OK");
            projectsJ = "";
            res.end();
        });
    }); 

    app.use(function(err, req, res){
        // handle error here.  For example, logging and returning a friendly error page
        console.log("api error:", err);
    });

}    