const gulp = require('gulp')
// for running electron from gulp
const electron = require('electron-connect').server.create({ stopOnClose: true })
const packager = require('electron-packager')
const sass = require('gulp-sass')

// compile sass to css
let sassFile = 'src/styles/main.scss'
let cssDest = 'src/styles/css/'
gulp.task('sass', function () {
  return gulp.src(sassFile)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest))
})

// move bootstrap javascript files into src/js/assets
let jsBootstrapFiles = ['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/popper.js/dist/popper.min.js']
let jsDest = 'src/js/assets'
gulp.task('js', function () {
  return gulp.src(jsBootstrapFiles)
    .pipe(gulp.dest(jsDest))
})

// exit electron on window close
let exitGulp = function (electronProcState) {
  console.log('electron process state: ' + electronProcState)
  if (electronProcState === 'stopped') {
    process.exit()
  }
}

gulp.task('start', function () {
  // exit gulp on window close
  electron.start(exitGulp)
  // watch js files and restart electron if they change
  // gulp.watch(['src/js/*.js'], electron.restart)
  // watch css files, but only reload (no restart necessary)
  // -> use '$ npm run watch-scss'
})

// default task & define task execution order
gulp.task('default', gulp.series('sass', 'js', 'start'))
