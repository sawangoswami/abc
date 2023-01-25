var gulp = require( 'gulp' );

var rename = require( 'gulp-rename' );

var uglify = require('gulp-uglify');

var sass = require('gulp-sass')(require('sass'));

var autoprefixer = require('gulp-autoprefixer') ;

var sourcemaps = require('gulp-sourcemaps') ;

var browserify = require('browserify') ;

var babelify = require('babelify') ;

var source = require('vinyl-source-stream') ;

var buffer = require('vinyl-buffer') ;



// stylesheet

var styleSRC = 'src/scss/style.scss';

var styleDIST = './dist/css/';

var styleWatch = 'src/scss/**/*.scss';

// javascript 

var jsSRC = 'script.js';

var jsFOLDER = 'src/js/';


var jsDIST = './dist/js/';

var jsWatch = 'src/js/**/*.js';

var jsFILES = [jsSRC];


gulp.task('styles', async function(){

    gulp.src( styleSRC )

    .pipe(sourcemaps.init())
    
    .pipe( sass({
    	errorLogToConsole: true,
    	outputStyle: 'compressed'
    }) )
    
    .on('error', console.error.bind( console ))

    .pipe(autoprefixer({
       
        cascade: false
    }))

    .pipe( rename( {suffix:'.min' } ) )

    .pipe(sourcemaps.write('./'))
    
    .pipe(gulp.dest( styleDIST ) );

});

gulp.task('js', async function(){
    

    jsFILES.map(function( entry ){
       return browserify({
    entries: [ jsFOLDER + entry]
 })

 .transform( babelify, {presets: ['@babel/preset-env']} )  
 .bundle()
 .pipe( source( entry ) )
 .pipe(rename( { 
    extname: '.min.js' } 
    ))
 .pipe( buffer() )
 .pipe( sourcemaps.init( { loadMaps: true } ) ) 

 .pipe( uglify() ) 
 .pipe( sourcemaps.write( './' ) )
 .pipe( gulp.dest( jsDIST ) )
    });


});


