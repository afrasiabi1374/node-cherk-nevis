//data import//
import { perssons, deletePersson, addPersson , perssonById, changeLang} from "./perssons.mjs"
import i18next from "i18next"
import fa from "./lang/fa.mjs"
import en from "./lang/en.mjs"

//
// module import //
import { Redis } from "./redis.mjs"
// 
// express-base //
import Express from "express"
let port = 9090
let app = Express()
app.use(Express.static('assets'))
//
// urls importation //
    const BASE_URL = "http://localhost:9090"
    app.locals.BASE_URL = BASE_URL
    app.locals.LANG = fa

// 
// nunjucks-base //
import nunjucks from 'nunjucks'
const templateEngine = nunjucks.configure('views',{
    autoescape: true,
    express: app,
    noCache: false
})
i18next.init({
    resources : {
        en: {
            translation: en
        },
        fa: {
            translation: fa
        }
    }
})

templateEngine.addGlobal('translate', i18next)
templateEngine.addGlobal('translateStatus', changeLang)
templateEngine.addFilter('translateStatus', async (name, params, cb) =>{
    try {
        console.log(params);
        let result = await changeLang(params.lang)
          
        if (!result) {
            result='nothing'
        }
        console.log('resssss =>',result);
        cb(null, result)
    } catch (e) {
        cb(null, e.toString())
    }
}, true)





templateEngine.addGlobal('perssonById', perssonById)
templateEngine.addFilter('perssonById', async (name, params, cb) =>{
    try {
        console.log(params);
        let result = await perssonById(params.id)
          
        if (!result) {
            result='nothing'
        }
        console.log('resssss =>',result);
        cb(null, result)
    } catch (e) {
        cb(null, e.toString())
    }
}, true)
//

///////////////// routes //
// add-user
    app.get('/', async(req, res) => {
        try {
                if (req.query.language == 'fa') {
                    i18next.changeLanguage('fa')
                    app.locals.LANG = 'en'
                }else {
                    i18next.changeLanguage('en')
                    app.locals.LANG = 'fa'
                }
                return res.render('index.html')
            } catch (e) {
                console.log(e);
        }
    })
 // all perssons //
    app.get('/allPerssons', async(req, res) => {
        try {
            const data = {
                perssons
            }
            return res.render('allPerssons.html', data)
        } catch (e) {
            
        }
    })
    // 
    // delete perssos //
        app.get('/delete/:id', (req, res) => {
            try {
                let id = req.params.id
                deletePersson(id)
                return res.redirect('/allPerssons')
                
            } catch (e) {
                console.log(e);
            }
        })
    //
    // view-user
    app.get('/viewPersson/:id', async(req, res) => {
        try {
            let persson = perssons.find(p => p.id == req.params.id)
            let data = {
                persson
            }
            return res.render('viewPersson.html', data)
        } catch (e) {
            console.log(e);
        }
    })
    // 
    // add use //
    app.get('/add', (req, res) => {
        try {
            let {name,lastName,age} = req.query
            let persson = {
                name,
                lastName,
                age
            }
            addPersson(persson)
            res.redirect('/allperssons')
        } catch (e) {
            res.send(e)
        }
    })
    // 
    // add use //
    app.get('/perssonById', async(req, res) => {
        try {
            let {id} = req.query
            app.locals.P_ID = id

            res.render('index.html')
        } catch (e) {
            res.send(e)
        }
    })
    // 
    // emailService

    app.get('/emailService', async(req, res) => {
        try {
            res.render('emailService.html')
        } catch (e) {
            res.send(e)
        }
    })
// emailServicePost
app.get('/emailServiceGET', async(req, res) => {
    try {
        const randNumber =  Math.random()
        console.log(randNumber*10);
        setTimeout(async() => {
            
            await Redis.set("name", req.query.email)
        }, randNumber);
        console.log(Redis.get('name'));
        console.log('email =>>>',req.query.email);
        res.render('emailService.html')
    } catch (e) {
        res.send(e)
    }
})
// Listening to Port //
app.listen(port, async()=>{
    Redis.connect('redis://127.0.0.1:6379/')
    console.log('app is running on port-'+port);
});
//
