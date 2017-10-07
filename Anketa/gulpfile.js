var gulp        = require('gulp'),
	less        = require('gulp-less'),
	browserSync = require('browser-sync'),
	cssnano     = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer');

	gulp.task('less',function(){
		return gulp.src('app/less/**/*.less')
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions' , '>1%'], {cascade:true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
	});
	

	gulp.task('browser-sync', function(){
		browserSync({
			server: {
				baseDir: 'app'
			},
			notify: false
		});
	});
	gulp.task('watch',['browser-sync', 'less'],function(){
		gulp.watch('app/less/**/*.less', ['less']);
		gulp.watch('app/*.html',browserSync.reload);
	});
	gulp.task('build', ['less', 'scripts'], function() {

    var buildCss = gulp.src([ 
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});
