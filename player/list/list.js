var page = {
    player: 0,
    data_source : 0,
    play_mode : 0,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function (event) {
        this.player = require("player");
  
    },

    /* 此方法展示窗体前发生 */
    onShow: function (event) {

    },

    /* 此方法展示窗体后发生 */
    onResume: function (event) {
        this.data_source = this.player.getsource();

        if(this.data_source == 0){
            this.setData({source : false }); 
        }
        else{
            this.setData({source : true });
        }

        this.play_mode = this.player.getplaymode();

        if(this.play_mode == 0){
            this.setData({mode : false }); 
        }
        else{
            this.setData({mode : true });
        }

        var vol = this.player.getvolume();
        console.log(vol);
        this.player.setvolume(vol);
    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {

    },

    volume : function(event){
        var vol = event.detail.value;
        this.player.setvolume(event.detail.value);
    },

    onBntsour : function(event){
        if(this.data_source == 0)
        {
            this.data_source = 1;
            this.setData({source : true});
        }
        else
        {
            this.data_source = 0;
            this.setData({source : false}); 
        }
        this.player.setsource();  
    },

    btn_mode : function(event){
        if(this.play_mode == 0)
        {
            this.play_mode = 1;
            this.setData({mode : true});
        }
        else
        {
            this.mode = 0;
            this.setData({mode : false}); 
        }
        this.player.setplaymode();
    },

    btn_back : function(event){
        pm.navigateBack();
    },
};

Page(page);

page = 0;
