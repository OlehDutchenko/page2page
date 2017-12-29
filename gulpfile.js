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
const gulp = require('gulp');
// const changed = require('gulp-changed');
// const ejsMonster = require('gulp-ejs-monster');
// const eslint = require('gulp-eslint');
// const iF = require('gulp-if');
// const jsdoc3 = require('gulp-jsdoc3');
const postcss = require('gulp-postcss');
// const rename = require('gulp-rename');
// const sassLint = require('gulp-sass-lint');
const sass = require('gulp-sass-monster');
const sourcemaps = require('gulp-sourcemaps');

const environment = require('./config/environment');
const config = require(`./config/${environment.type}/gulp`);

// ----------------------------------------
// Private
// ----------------------------------------

// ----------------------------------------
// Public
// ----------------------------------------

gulp.task('sass', () => {
	return gulp.src('./page2page/page2page.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass, true))
		.pipe(postcss(config.postcss))
		.pipe(sourcemaps.write(config.sourcemaps))
		.pipe(gulp.dest('./page2page/'));
});

// ----------------------------------------
// Exports
// ----------------------------------------
