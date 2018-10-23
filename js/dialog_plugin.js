
var DialogModalPlugin = function (scene) {
    //the scene that owns the plugin
    this.scene = scene;
    this.systems = scene.sys;

    if(!scene.sys.settings.isBooted) {
        scene.sys.events.once('boot', this.boot, this);
    }
};
var dialog;
var graphics;
var closeBtn;

//register this plugin with the plugin manager
DialogModalPlugin.register = function (PluginManager) {
    PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
};

DialogModalPlugin.prototype = {

    //called when plugin is loaded by plugin manager
    boot: function () {
        var eventEmitter = this.systems.events;
        eventEmitter.on('destroy', this.destroy, this);
    },

    //called when scene shuts down, it may then come back again later
    //(which will invoke the 'start' event) but should  be considered dormant
    shutdown: function () {
        if(this.timedEvent) this.timedEvent.remove();
        if(this.text) this.text.destroy();
    },

    //called when a scene is destroyed by the scene manager
    destroy: function () {
        this.shutdown();
        this.scene = undefined;
    },
    
    //Initialize the dialog modal
    init: function (opts) {
        //check to see if any optional parameters were passed
        if(!opts) opts = {};
        //set properties from opts object or use defaults
        this.borderThickness = opts.borderThickness || 3;
        this.borderColor = opts.borderColor || 0x907748;
        this.borderAlpha = opts.borderAlpha || 1;
        this.windowAlpha = opts.windowAlpha || 0.8;
        this.windowColor = opts.windowColor || 0x303030;
        this.windowHeight = opts.windowHeight || 150;
        this.padding = opts.padding || 32;
        this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
        this.dialogSpeed = opts.dialogSpeed || 3;

        //used for animating the text
        this.eventCounter = 0;
        //if the dialog window is shown
        this.visible = true;
        //the current text in the window
        this.text;     
        
        //the text that will be displayed in the window
        this.dialog;

        this.graphics;
        
        this.closeBtn;

        //create the dialog window
        this._createWindow();
    },

    
    //checks if window is visable and returns boolean
    isVisible: function(){
        return this.visible;
    },

    //hide/show the dialog window
    toggleWindow: function() {
        this.visible = !this.visible;
        if(this.text) this.text.visible = this.visible;
        if(this.graphics) this.graphics.visible = this.visible;
        if(this.closeBtn) this.closeBtn.visible = this.visible;
    },

    // Slowly displays the text in the window to make it appear annimated
    _animateText: function () {
        this.eventCounter++;

        // changes text
        this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
        if(this.eventCounter === this.dialog.length) {
            this.timedEvent.remove();
        }
    },

    // Sets the text for the dialog window
    setDialogText: function (text, animate) {
        //reset the dialog
        this.eventCounter = 0;
        this.dialog = text.split('');
        if(this.timedEvent) this.timedEvent.remove();

        var tempText = animate ? '' : text;
        this._setDialogText(tempText);

        if(animate) {
            this.timedEvent = this.scene.time.addEvent({
                delay: 150 - (this.dialogSpeed * 30),
                callback: this._animateText,
                callbackScope: this,
                loop: true
            });
        }
    },

    // Calcuate the position of the text in the dialog window
    _setDialogText: function (text) {
        //reset the dialog
        if(this.text) this.text.destroy();

        var x = this.padding + 10;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 10;

        this.text = this.scene.make.text({
            x,
            y,
            text,
            style: {
                wordWrap: {width: this._getGameWidth() - (this.padding * 2) - 25}
            }
        });
        
        this.text.depth = 41;
    },

    //creates the dialog window
    _createWindow: function () {
        var gameHeight = this._getGameHeight();
        var gameWidth = this._getGameWidth();
        var windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
        this.graphics = this.scene.add.graphics();
        this.graphics.depth = 40;

        this._createsOuterWindow(windowDimensions);
        this._createInnerWindow(windowDimensions);
        this._createCloseModalButtonBorder();
        this._createCloseModalButton();
        this._createHeldItemWindow();
        this._createNPCItemWindow();
    },

    //gets the width of the game(based on the scene)
    _getGameWidth: function () {
        return this.scene.sys.game.config.width;
    },

    //gets the height of the game(based on the scene)
    _getGameHeight: function () {
        return this.scene.sys.game.config.height;
    },

    //calculates where to place the dialog window based on the game size
    _calculateWindowDimensions: function (width, height) {
        var x = this.padding;
        var y = height - this.windowHeight - this.padding;
        var rectWidth = width - (this.padding * 2);
        var rectHeight = this.windowHeight;
        return{
            x,
            y,
            rectWidth,
            rectHeight
        };
    },

    //creates the inner dialog window(where the text is displayed)
    _createInnerWindow: function ({x, y, rectWidth, rectHeight}) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
    },

    //creates the border rectangle of the dialog window
    _createsOuterWindow: function ({x, y, rectWidth, rectHeight}) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    },

    _createHeldItemWindow: function () {
        var x = this._getGameWidth() - this.padding - 100;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 100;
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, 40, 40);
        this.graphics.fillStyle(0x006400, this.windowAlpha);
        this.graphics.fillRect(x, y, 39, 39);
    },

    _createNPCItemWindow: function () {
        var x = this._getGameWidth() - this.padding - 150;
        var y = this._getGameHeight() - this.windowHeight - this.padding + 100; 
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, 40, 40);
        this.graphics.fillStyle(0xFF4500, this.windowAlpha);
        this.graphics.fillRect(x, y, 39, 39);
    },

    _createCloseModalButtonBorder: function () {
        var x = this._getGameWidth() - this.padding - 20;
        var y = this._getGameHeight() - this.windowHeight - this.padding;
        this.graphics.strokeRect(x, y, 20, 20);
    },

    _createCloseModalButton: function () {
        var self = this;
        this.closeBtn = this.scene.make.text({
            x: this._getGameWidth() - this.padding - 14,
            y: this._getGameHeight() - this.windowHeight -  this.padding + 3,
            text: 'X',
            style: {
                font: 'bold 12px Arial',
                fill: this.closeBtnColor
            }
        });
        this.closeBtn.depth = 41;
        this.closeBtn.setInteractive();

        this.closeBtn.on('pointerover', function () {
            this.setTint(0xff0000);
        });
        this.closeBtn.on('pointerout', function () {
            this.clearTint();
        });
        this.closeBtn.on('pointerdown', function (){
            self.toggleWindow();
            if(self.timedEvent) self.timedEvent.remove();
            if(self.text) self.text.destroy();
        });
    }
};