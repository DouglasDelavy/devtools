fx_version 'cerulean'
game { 'gta5' }

author 'Oddo'
description 'Devtools designed to speed up your development.'

files {
    'dist/ui/**/*',

    'data/animations.json',
    'data/timecycle.json',
    'data/sounds.json',
    'data/peds.json',
}

ui_page 'dist/ui/index.html'

client_script 'dist/client.js'

server_script 'dist/server.js'