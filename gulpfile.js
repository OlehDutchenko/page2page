'use strict';

/**
 * @fileOverview Gulp#4 tasks
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

// modules
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const browserSync = require('browser-sync');
const ejs = require('gulp-ejs-monster');
// const eslint = require('gulp-eslint');
// const jsdoc3 = require('gulp-jsdoc3');
const postcss = require('gulp-postcss');
// const rename = require('gulp-rename');
// const sassLint = require('gulp-sass-lint');
const sass = require('gulp-sass-monster');
const sourcemaps = require('gulp-sourcemaps');

const environment = require('./config/environment');
const config = require(`./config/${environment.type}/gulp`);
const notify = require('./config/notify');
const icons = require('./config/notify-icons');

// ----------------------------------------
// Private
// ----------------------------------------

console.log(chalk.yellow('Starting gulp...'));
console.log(chalk.yellow(`${environment.type} version`));

const sources = {
	sass: './page2page/page2page.scss',
	ejs: './examples/ejs/*.ejs'
};

const wasErrors = {
	sass: false,
	ejs: false
};

// ----------------------------------------
// Public
// ----------------------------------------

gulp.task('sass', () => {
	let success = true;
	return gulp.src(sources.sass)
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass, true).on('error', function (err) {
			success = false;
			wasErrors.sass = true;
			notify.onError('gulp-sass-monster', err.message, icons.sass);
			this.emit('end');
		}))
		.pipe(postcss(config.postcss).on('error', function (err) {
			success = false;
			wasErrors.sass = true;
			notify.onError('[gulp-postcss]', err.message, icons.postcss);
			this.emit('end');
		}))
		.pipe(sourcemaps.write(config.sourcemaps))
		.pipe(gulp.dest('./page2page/'))
		.on('end', () => {
			if (success) {
				if (wasErrors.sass) {
					wasErrors.sass = false;
					notify.onResolved('gulp-sass-monster');
				}
				if (environment.develop) {
					// browserSync.stream();
				}
			}
		});
});

gulp.task('ejs', () => {
	let success = true;
	return gulp.src(sources.ejs)
		.pipe(ejs(config.ejs).on('error', function (err) {
			success = false;
			wasErrors.ejs = true;
			notify.onError('gulp-ejs-monster', err.message, icons.ejs);
			this.emit('end');
		}))
		.pipe(gulp.dest('./examples'))
		.on('end', () => {
			if (success) {
				if (wasErrors.ejs) {
					wasErrors.ejs = false;
					notify.onResolved('gulp-ejs-monster');
				}
				if (environment.develop) {
					// browserSync.reload();
				}
			}
		});
});

gulp.task('watch', done => {
	gulp.watch(sources.sass, gulp.series('sass'));
	gulp.watch(sources.ejs, gulp.series('ejs'));
	done();
});

gulp.task('default', gulp.series('sass', 'ejs', 'watch'));

// gulp.task('bs', done => {
// 	browserSync.init(config.bs, done);
// });

// ----------------------------------------
// Exports
// ----------------------------------------
