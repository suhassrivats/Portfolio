module.exports = function(grunt) {

    // Configure main project
    grunt.initConfig({
        // Basic setting and info about our plugins
        pkg: grunt.file.readJSON('package.json'),

        // Minify css file
        cssmin: {
            css: {
                src: 'css/style.css',
                dest: 'css/style.min.css'
            }
        },

        // Clear out 'img' directory if it exists
        clean: {
            dev: {
                src: ['img'],
            },
        },

        // Generate 'img' directory if it is missing
        mkdir: {
            dev: {
                options: {
                    create: ['img', 'img/compressed', 'img/resized']
                },
            },
        },

        // Compress images and put them in 'img/compressed' directory
        imagemin: {
            compress: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img_src/',
                    src: ['*.{gif,jpg,png}'],
                    dest: 'img/compressed/'
                }]
            }
        },

        // Resize images in 'img/compressed' directory and put them in 'img/resized' directory
        responsive_images: {
            dev: {
                options: {
                    sizes: [{
                        // name: 'small',
                        width: '2048',
                        suffix: '_xlarge',
                        quality: 40
                    }, {
                        // name: 'small',
                        width: '1024',
                        suffix: '_large',
                        quality: 40
                    }, {
                        // name: 'large',
                        width: '640',
                        suffix: '_medium',
                        quality: 40
                    }, {
                        // name: 'large',
                        width: '320',
                        suffix: '_small',
                        quality: 40
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'img/compressed/',
                    dest: 'img/resized/'
                }]
            }
        },

        // Watch and make changes on the go
        watch: {
            scripts: {
                files: ['**/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                },
            },
            // images: {
            //     files: ['image_src/*.{png,jpg,gif}'],
            //     tasks: ['imagemin:compress', 'responsive_images'],
            //     options: {
            //         spawn: false,
            //     }
            // },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['cssmin', 'clean', 'mkdir', 'imagemin', 'responsive_images', 'watch']);
};