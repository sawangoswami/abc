var gulp = require( 'gulp' );

var rename = require( 'gulp-rename' );

var sass = require('gulp-sass')(require('sass'));

var autoprefixer = require('gulp-autoprefixer') ;

var sourcemaps = require('gulp-sourcemaps') ;

var styleSRC = 'src/scss/style.scss';

var styleDIST = './dist/css/';

var styleWatch = 'src/scss/**/*.scss';



var jsSRC = 'src/js/script.js';

var jsDIST = './dist/js/';

var jsWatch = 'src/js/**/*.js';



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
    gulp.src( jsSRC )

    .pipe(gulp.dest( jsDIST ) )
});

gulp.task('default', gulp.parallel('styles','js'));

gulp.task('watch',  function(){

    gulp.watch( styleWatch, gulp.series('styles','js') );

    // gulp.watch( jsWatch, [ 'js' ]  );

});
