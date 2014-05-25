var mainBanner='/*!\n * <%= pkg.name %>.js\n'+
      ' * Author:<%= pkg.author %>\n'+
      ' * Summary:<%= pkg.description %>\n'+
      ' * License:<%= pkg.license %>\n'+
      ' * Version: <%= pkg.version %>\n'+
      ' *\n * URL:\n * <%= pkg.homepage %>\n'+
      ' * <%= pkg.homepage %>/blob/master/LICENSE\n *\n */\n';
module.exports = function(grunt) {
  var path = require('path');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    prefix:'snsshare',
    prepare:{
      dist:{
        
      }
    },
    fancySprites:{
        dist: {
        destStyles: 'dist/scss/',
        destSpriteSheets: 'dist/images/',
        files: [{
            src: ['src/images/*.{png,jpg,jpeg}', '!src/images/*@2x.{png,jpg,jpeg}'],
            spriteSheetName: '1x',
            spriteName: function(name) {
              return path.basename(name, path.extname(name));
              // return 'v1';
            }
          }, {
            src: 'src/images/*@2x.{png,jpg,jpeg}',
            spriteSheetName: '2x',
            spriteName: function(name) {
              return path.basename(name, path.extname(name)).replace(/@2x/, '');
            }
          }
        ]
      }
    },

    sass: {
      dist: {
        // options: {                       // Target options
        // style: 'expanded'
        // },
        files: {

          'dist/css/style.css': 'src/scss/style.scss'
        }
      }
    },   
    uglify: {
      options: {
        banner: mainBanner
      },
      build: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
          {
          match: 'timestamp',
          replacement: '<%= grunt.template.today() %>'
          },
            {
              match: 'name',
              replacement: '<%= pkg.name %>'
            },{
              match: 'repo',
              replacement: '<%= pkg.repository.url %>'
            },{
              match:'prefix',
              replacement:'<%= prefix %>'
            },{
              match:'banner',
              replacement:mainBanner
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['src/demo.html'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['src/js/<%= pkg.name %>.js'], dest: 'dist/js/'}
        ]
      }
    },
    connect: {

      server: {
      options: {
        debug:true,
        port: 8080,
        keepalive:true,
        hostname:'*',
        base: 'dist',
        open:'http://localhost:8080/demo.html'
        }
      }
  }
  });
  grunt.registerTask('prepare', 'prepare to dist' ,function(){
    var src=grunt.template.process('src/js/<%= pkg.name %>.js');
    var dest=grunt.template.process('dist/js/<%= pkg.name %>.js');
    
    var banner=grunt.template.process(mainBanner);
   
    var c=grunt.file.read(src);
    grunt.file.write(dest, banner+c );
    var scss='$sprites-path: "../images/";'+
            '@import "fancy-sprites";'+
            '@import "../../dist/scss/sprites";'+
            '$sprite-prefix:"<%= prefix %>";'+
            '@include sprite-classes;';
    grunt.file.write('src/scss/style.scss', grunt.template.process(scss) );
  });


  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-fancy-sprites');
  grunt.loadNpmTasks('grunt-contrib-sass');
 
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build',['prepare:dist','replace:dist','fancySprites:dist','sass:dist','uglify:build']);
  grunt.registerTask('default', ['prepare:dist','replace:dist','fancySprites:dist','sass:dist','uglify:build']);
    grunt.registerTask('test','test',function(){
      if(grunt.file.isDir('dist')){
        
      }else{
        grunt.task.run(['build']);
      }
      grunt.task.run(['connect:server']);
    // grunt.log.writeln('Starting static web server in "dist" on port 9001.');
  });

};