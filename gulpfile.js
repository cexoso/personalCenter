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
autoprefixer=require('gulp-autoprefixer');
gulp.task('server', ['injectDev','scss:watch'],
function() {
    connect.server({
        root: ['app', 'bower_components'],
        livereload: true,
        port: 80,
        middleware: function (connect, opt) {
          return [function (req, res, next) {
            if (!req.url.match('/api/')) {
              next();
            } else {
              console.log('代理：' + req.url)
              var method=req.method;
              req.method='GET';              
              req.url+=('-'+method+'.json')
              console.log(req.url);
              next();              
            }
          }
          ]
        }//end of middleware
    });
    var html = 'app/**/*.html';
    var css='app/**/*.css';
    var js='app/**/*.js';
    chokidar.watch([].concat(css,js))
    .on('add',injectDev)
    .on('unlink',injectDev);
    chokidar.watch([].concat(css,js,html))
    .on('all',function(event,path){
      console.log(path+"-change");
      gulp.src('./app/index.html').pipe(connect.reload());
    })
});
gulp.task('lint',
function() {
    var js = ['app/scripts/**/*.js'];
    gulp.watch(js,
    function() {
        gulp.src(js).pipe(jshint()).pipe(jshint.reporter('default'));
    });
});
gulp.task('default', ['server']);
var distPath = 'D:/apache-tomcat-7.0.63/webapps/PaticaService';
var distPath1 = 'E:/Program Files/eclipseWS/PaticaService/WebContent';
gulp.task('watch',
function() {
    gulp.watch('app/scripts/**/*.js', ['buildlogic']);
    gulp.watch('app/views/**/*', ['buildview']);
    gulp.watch('app/tpls/**/*', ['buildtpl']);
    gulp.watch('app/styles/**/*.css', ['buildcsscos']);
});
gulp.task('build',
function() {
    return gulp.start(['buildlogic', 'buildview', 'buildtpl', 'buildlib', 'buildcsslib', 'buildcsscos', 'buildimg']);
});
gulp.task('buildlogic',
function() {
    var path = 'app/scripts/**/*.js';
    return gulp.src(path).pipe(concat('all.js'), {
        newLine: ';'
    })
    // .pipe(jsmin())
    .pipe(gulp.dest(distPath + '/scripts')).pipe(gulp.dest(distPath1 + '/scripts'));
});
gulp.task('buildview',
function() {
    return gulp.src('app/views/**/*').pipe(gulp.dest(distPath + '/views')).pipe(gulp.dest(distPath1 + '/views'));
});
gulp.task('buildimg',
function() {
    return gulp.src('app/images/**/*').pipe(gulp.dest(distPath + '/images')).pipe(gulp.dest(distPath1 + '/images'));
});
gulp.task('buildtpl',
function() {
    return gulp.src('app/tpls/**/*').pipe(gulp.dest(distPath + '/tpls')).pipe(gulp.dest(distPath1 + '/tpls'));
});
gulp.task('buildlib',
function() {
    var path = 'app/scripts/**/*.js';
    var arr = ['bower_components/angular/angular.js', 'bower_components/angular-ui-router/release/angular-ui-router.js', 'bower_components/angular-resource/angular-resource.js', 'bower_components/angular-bootstrap/ui-bootstrap.js', 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js', 'bower_components/ui-select/dist/select.js', 'bower_components/angular-sanitize/angular-sanitize.js'];
    return gulp.src(arr).pipe(concat('lib.js'), {
        newLine: ';'
    }).pipe(jsmin()).pipe(gulp.dest(distPath + '/scripts')).pipe(gulp.dest(distPath1 + '/scripts'));
});
gulp.task('buildcsslib',
function(opt, q) {
    var arr = ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/angular-bootstrap/ui-bootstrap-csp.css', 'bower_components/ui-select/dist/select.css'];
    gulp.src('bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest(distPath + '/fonts')).pipe(gulp.dest(distPath1 + '/fonts'));
    return gulp.src(arr).pipe(concat('lib.css')).pipe(csso()).pipe(gulp.dest(distPath + '/styles')).pipe(gulp.dest(distPath1 + '/styles'));
});
gulp.task('buildcsscos',
function(opt, q) {
    var path = 'app/styles/**/*.css';
    return gulp.src(path).pipe(concat('costom.css')).pipe(csso()).pipe(gulp.dest(distPath + '/styles')).pipe(gulp.dest(distPath1 + '/styles'));
});
function injectDev() {
    gulp.src('app/indexTpl.html').pipe(inject(gulp.src(bowerFiles(), {
        read: false
    }), {
        name: 'bower',
        addRootSlash: false,
        ignorePath: ['bower_components', 'app']
    })).pipe(inject(gulp.src('app/**/*.js', {
        read: false
    }), {
        name: 'inject',
        addRootSlash: false,
        ignorePath: ['bower_components', 'app']
    })).pipe(inject(gulp.src('app/**/*.css', {
        read: false
    }), {
        name: 'inject',
        addRootSlash: false,
        ignorePath: ['bower_components', 'app']
    })).pipe(rename('index.html')).pipe(gulp.dest('app/'));
};
gulp.task('injectDev', injectDev);
gulp.task('injectDist',
function() {
    gulp.src('app/indexTpl.html').pipe(inject(gulp.src(bowerFiles(), {
        read: false
    }), {
        name: 'bower'
    })).pipe(rename('index.html')).pipe(gulp.dest('dist/'));
});

function scssCompile(csspath) {
    var st = new Date();
    gulp.src(csspath).pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers:['last 2 versions']
    }))
    .pipe(gulp.dest(path.dirname(csspath)));
    var et = new Date();
    console.log(et - st + 'ms for compile sass');
};
function scssRemove(csspath){
  var csspath=path.dirname(csspath)+'\\'+path.basename(csspath,'scss')+'css';
  gulp.src(csspath)
    .pipe(rimraf({force: true }));
}
gulp.task('scss:watch',
function() {
    chokidar.watch('app/**/*.scss')
    .on('add', scssCompile)
    .on('change', scssCompile)
    .on('unlink',scssRemove)
});

gulp.task('test',
function() {

})