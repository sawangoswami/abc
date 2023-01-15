var gulp = require( 'gulp' );

var rename = require( 'gulp-rename' );

var sass = require('gulp-sass')(require('sass'));

var autoprefixer = require('gulp-autoprefixer') ;

var sourcemaps = require('gulp-sourcemaps') ;

var styleSRC = './src/scss/style.scss';

var styleDIST = './dist/css/';

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