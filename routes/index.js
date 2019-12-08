var express = require('express');
var router = express.Router();
var cors = require('cors');

var allowedOrigins = ['http://localhost:4200',
                      'https://still-castle-86030.herokuapp.com',
                      'http://yourapp.com'];

router.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));                      
                      

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web Resume Express API' });
});


  // Get resume personal data 
  router.get("/api/resume/personal", function(req, res, next) {
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

 
    // Get resume email data 
     router.get("/api/resume/email", function(req, res, next) {
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
     router.get("/api/resume/sitelinks", function(req, res, next) {
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
     router.get("/api/resume/services", function(req, res, next) {
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
    router.get("/api/resume/skills", function(req, res, next) {
        var file = './data/json/wrskill.json';
        jsonfile.readFile(file, function(err, obj) {
            if(err) return next(err);
            if(obj) {
                //load and return resume services json 
                for(var i = 0; i < obj.length; i++)
                    {
                        //if (skilltype === obj[i].skilltype) {
                        skillsJ.push({
                            "skillname" : obj[i].skillname,
                            "skilltype" : obj[i].skilltype
                        });                        
                    }
                res.json(skillsJ);
                skillsJ = [];
                skilltype = "";
                res.end();
            }
        });
    });

    // Get resume skill data 
    //router.get("/api/resume/skills", function(req, res, next) {
    //    var file = './data/json/wrskill.json';
    //    skilltype = req.param('skilltype');
    //    jsonfile.readFile(file, function(err, obj) {
    //            if(err) return next(err);
    //            if(obj) {
    //                //load and return resume services json 
    //                for(var i = 0; i < obj.length; i++)
    //                {
    //                    if (skilltype === obj[i].skilltype) {
    //                        skillsJ.push({
    //                            "skillname" : obj[i].skillname,
    //                            "skilltype" : obj[i].skilltype
    //                    });
    //                }
    //            }
    //            res.json(skillsJ);
    //            console.log("skillsJ: ", skillsJ);
    //            skillsJ = [];
    //            skilltype = "";
    //            res.end();
    //        }
    //    });
    //});

    // Get resume project data 
    router.get("/api/resume/projects", function(req, res, next) {
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

module.exports = router;
