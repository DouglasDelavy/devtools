fx_version "cerulean"
game { "gta5" }

client_script 'dist/client.js'

server_script 'dist/server.js'

files {
    'data/animations.json',
    'data/timecycle.json',
    'data/sounds.json',
    'dist/ui/**/*',
}

ui_page 'dist/ui/index.html'