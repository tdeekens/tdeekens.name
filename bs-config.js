module.exports = {

    files: ["app/styles/**.scss", "app/coffeescript/**.coffee", "app/javascripts/**.js"],

    exclude: false,

    server: false,

    proxy: "tdeekens.local",

    ports: {
        min: 4000,
        max: 4003
    },

    startPath: "tdeekens.name",

    debugInfo: true,

    logConnections: true,

    ghostMode: {
        clicks: true,
        links: true,
        forms: true,
        scroll: true
    },

    open: true,

    xip: false,

    timestamps: true,

    fileTimeout: 1000,

    injectChanges: true,

    scrollProportionally: true,

    scrollThrottle: 0,

    notify: true,

    host: null,

    excludedFileTypes: [],

    reloadDelay: 0

};
