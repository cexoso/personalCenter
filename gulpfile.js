'use strict'
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin'),
    es = require('event-stream'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    path = require("path"),
    rimraf = require("gulp-rimraf"),
    chokidar = require('chokidar'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    es = require('event-stream'),
    gulpFilter = require('gulp-filter'),
    image = require('gulp-image'),
    sort = require('gulp-sort'),
    Q = require('q'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    httpProxy = require('http-proxy');
    var proxy = httpProxy.createProxyServer({});
    proxy.on('error', function (err, req, res) {
        console.log(err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end(err+"");
    });
gulp.task('server', ['scss:watch'], function () {
    connect.server({
        root: ['app','bower_components'],
        livereload: true,
        port: 9000,
        middleware: function (connect, opt) {
                return [
                    function (req, res, next) {
                        if (!req.url.match(/\/api\/|\/mvc\//ig)) {
                            next();
                        } else {                            
                            console.log('代理：' + req.url);
                            // proxy.web(req, res, { target: 'http://192.168.0.145:8080/Patica2.0'});  
                            // proxy.web(req, res, { target: 'http://www.patica.com.cn:9080/Patica2.0'}); 
                            // ?usercode=ohQRxsxXwBlQf5qdTvgecbYYjWGE
                            // ?usercode=ohQRxs4EMc4dBVahHIY7HvvQ2XNM
                            proxy.web(req, res, { target: 'http://www.patica.cn:8080/Patica2.0'}); 
                            // proxy.web(req, res, { target: 'http://localhost:8080/Patica2.0'});                    
                        }
                    }
                ]
            } //end of middleware
    });
    var html = 'app/**/*.html';
    var css = 'app/**/*.css';
    var js = 'app/**/*.js';
    chokidar.watch([].concat(css, js))
        .on('add', injectDev)
        .on('unlink', injectDev);
    chokidar.watch([].concat(css, js, html))
        .on('all', (function () {
            var t = null;
            return function (event, path) {
                if (t) {
                    clearTimeout(t);
                }
                t = setTimeout(function () {
                    console.log("livereload");
                    gulp.src('./app/index.html')
                        .pipe(connect.reload());
                }, 50);
            }
        })());
});

function clear() {
    return gulp.src('dist')
        .pipe(rimraf({
            force: true
        }));
};
function jsHint(){
    return gulp.src(['app/scripts/**/*.js', 'app/components/**/*.js'])
      
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}
function distLogic() {
    return gulp.src(['app/scripts/**/*.js','app/components/**/*.js'])
        .pipe(sort(function (p1, p2) {
            return -1;
        }))
        .pipe(concat('logic.js'), {
            newLine: ';'
        })        
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/scripts'));
};

function dist_css() {
    var filter = gulpFilter('*.css');
    var libcss = gulp.src(bowerFiles())
        .pipe(filter);
    var mycss = gulp.src(['app/**/*.scss','!app/**/base.scss'])
        .pipe(sass()
            .on('error', sass.logError));
    return es.merge(libcss, mycss)
        .pipe(sort())
        .pipe(concat('css.css'), {
            newLine: ';'
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'));
};

function makeCache() {
    return gulp.src('app/components/**/*.html')
        .pipe(sort())
        .pipe(templateCache({
            root: 'components'
        }))
        .pipe(jsmin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/scripts'));
};

function dist_html() {
    return gulp.src('app/indexTpl.html')
        .pipe(inject(gulp.src(['dist/**/*.css', 'dist/scripts/**/*.js'], {
            read: false
        }).pipe(sort()), {
            name: 'inject',
            addRootSlash: false,
            ignorePath: ['dist']
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist/'));
};

function dist() {
    return gulp.start(['dist_html']);
};

function distlib() {
    var filter = gulpFilter('*.js');
    console.log(bowerFiles());
    return gulp.src(bowerFiles())
        .pipe(filter)
        .pipe(concat('lib.js'), {
            newLine: ';'
        })
        .pipe(jsmin())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/scripts'));
};
function distFonts(){
    return gulp.src('app/fonts/*')
        // .pipe(image())
        .pipe(gulp.dest('./dist/fonts'));
}
function distimg() {
    gulp.src('app/favicon.ico')
    .pipe(gulp.dest('dist'))
    return gulp.src('app/images/*')
        // .pipe(image())
        .pipe(gulp.dest('./dist/images'));
};
gulp.task('dist_html', ['makeCache', 'distlib', 'distLogic', 'dist_css','distimg','distFonts'], dist_html);
gulp.task('makeCache', makeCache);
gulp.task('distLogic', distLogic);
gulp.task('jsHint', jsHint);
gulp.task('distlib', distlib);
gulp.task('distFonts', distFonts);
gulp.task('distimg', distimg);
gulp.task('dist_css', dist_css);
gulp.task('clear', clear);
gulp.task('dist', ['clear'], dist);
gulp.task('default', ['server']);
/**
 * 开发模式自动注入
 */
var injectDev = (function () {
    var t = null;
    var timeout = 50;
    return function () {
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout(function () {
            gulp.src('app/indexTpl.html')
                .pipe(inject(gulp.src(bowerFiles(), {
                    read: false
                }), {
                    name: 'bower',
                    addRootSlash: false,
                    ignorePath: ['bower_components', 'app']
                }))
                .pipe(inject(gulp.src('app/**/*.js', {
                    read: false
                }), {
                    name: 'inject',
                    addRootSlash: false,
                    ignorePath: ['bower_components', 'app']
                }))
                .pipe(inject(gulp.src('app/**/*.css', {
                    read: false
                }), {
                    name: 'inject',
                    addRootSlash: false,
                    ignorePath: ['bower_components', 'app']
                }))
                .pipe(rename('index.html'))
                .pipe(gulp.dest('app/'));
        }, timeout);
    }
})();
gulp.task('injectDev', injectDev);
/**
        自动编译scss文件
     */
var scssCompile = (function () {
    var arr = [];
    var t = null;
    var timeout = 50;
    return function (csspath) {
        if(csspath=="app\\css\\base.scss"){
            return;
        }
        if (t) {
            clearTimeout(t);
        }
        if (arr.indexOf(csspath) == -1) {
            arr.push(csspath);
        }
        t = setTimeout(function () {
            var st = new Date();
            gulp.src(arr, {
                    base: '.'
                })
                .pipe(sass()
                    .on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions']
                }))
                .pipe(rename(function (p) {
                    p.extname = ".css";
                }))
                .pipe(gulp.dest('./'));
            var et = new Date();
            console.log(et - st + 'ms for compile ' + arr.length + ' sass');
            arr.length = 0;
        }, timeout);
    }
})();

function scssRemove(csspath) {
    var csspath = path.dirname(csspath) + '\\' + path.basename(csspath, 'scss') + 'css';
    gulp.src(csspath)
        .pipe(rimraf({
            force: true
        }));
}
   
gulp.task('scss:watch', function () {
    chokidar.watch('app/**/*.scss')
        .on('add', function (path) {
            scssCompile(path);
        })
        .on('change', function (path) {
            scssCompile(path);
        })
        .on('unlink', scssRemove);
});
gulp.task('test',['clear'], function () {
    var arr=['app/**/*.scss','!app/**/base.scss'];
    return gulp.src(arr)
    .pipe(gulp.dest('./dist'));
})