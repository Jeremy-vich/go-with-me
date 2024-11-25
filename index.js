(() => {
})();

Hooks.on('getUserContextOptions', (html, contextMenu) => {
    console.log(contextMenu);
    contextMenu.push({
        name: "Go to Player",
        icon: '<i class="fas fa-walking"></i>',
        callback: li => {
            var destination = game.users.get(li.data("userId"))?.viewedScene;
            game.socket.emit("pullToScene", destination, game.user.id);
        },
        condition: li => game.user.isGM
    });
});

Hooks.on('getSceneNavigationContext', (html, contextMenu) => {
    contextMenu.push({
        name: "Go With Me",
        icon: '<i class="fas fa-walking"></i>',
        callback: li => {
            var destination = game.scenes.get(li.data("sceneId"));
            var actual = game.user.viewedScene;
            GoWithMe(actual, destination);
        },
        condition: li => game.user.isGM
    });
});

Hooks.on('getSceneDirectoryEntryContext', (html, contextMenu) => {
    contextMenu.push({
        name: "Go With Me",
        icon: '<i class="fas fa-walking"></i>',
        callback: li => {
            var destination = game.scenes.get(li.data("documentId"));
            var actual = game.user.viewedScene;
            GoWithMe(actual, destination);
        },
        condition: li => game.user.isGM
    });
});

function GoWithMe(actual, destination){
    game.users.forEach(user => { 
        if (user.active && user.viewedScene === actual) {
            console.log("Moving " + user.name + " to " + destination.name);
            game.socket.emit("pullToScene", destination.id, user.id);
        }
    });
}