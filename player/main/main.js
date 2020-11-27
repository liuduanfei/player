var page = {
    player: 0,
    progress: 0,
    time: 0,
    total_time:0,
    run:1,

    /* 此方法在第一次显示窗体前发生 */
    onLoad: function (event) {
        /* 获取播放器 */
        this.player = require("player");

        var that = this;
        this.player.on("new", function (data) {
                var time = that.player.gettime();
                console.log("JS song time:"+time);

                that.total_time = time;

                if (parseInt(time % 60) < 10)
                    var string = parseInt(time / 60) + ":0" + parseInt(time % 60);
                else
                    var string = parseInt(time / 60) + ":" + parseInt(time % 60);
                that.setData({ total_time: { value: string}});

                var name;
                name = that.player.getname();

                console.log("JS song name"+name);
                that.setData({ label1: { value: name } });

                that.play_new(data);
            });
    },

    /* 此方法展示窗体前发生 */
    onShow: function (event) {
        
    },

    /* 此方法展示窗体后发生 */
    onResume: function (event) {

    },

    /* 此方法关闭窗体前发生 */
    onExit: function (event) {

    },

    start: function() {
        var thiz = this;
        thiz.timer = setInterval(function() {
            thiz.time++;
            var time = thiz.time;
            if (parseInt(time % 60) < 10)
                var string = parseInt(time / 60) + ":0" + parseInt(time % 60);
            else
                var string = parseInt(time / 60) + ":" + parseInt(time % 60);
            thiz.setData({ time: { value: string} });

            thiz.progress = thiz.time / thiz.total_time * 100;
            thiz.setData({ progressbar1: { value: Math.ceil(thiz.progress) } });
        }, 1000 * 1)
    },
    
    /* 对按钮进行处理，调用对应的c语言函数 */
    onbtn: function(event) {
        switch (event.target.id) {
            case "btnnext":
                this.player.next(),
                console.log("next");
                break;
            case "btnprev":
                console.log("prev");
                this.player.prev();
                break;
            default:
                break;
        }

        if (typeof(this.timer) != "undefined")
        {
            clearInterval(this.timer);
        }
        this.run = 0;
        this.setData({Switch1 : true})
        this.start();
    },

    onPlay:function(event){
        if (this.run)
        {
            this.player.start(),
            this.run = 0;
            console.log("start");
        }
        else
        {
            this.player.pause(),
            console.log("pause");
            this.run = 1;
        }

        if (typeof(this.timer) != "undefined")
        {
            clearInterval(this.timer);
        }
        if (!this.run) {
            this.start();
        }
    },

    play_new:function(data){
        this.time = 0;
        var time = this.time;
        if (parseInt(time % 60) < 10)
            var string = parseInt(time / 60) + ":0" + parseInt(time % 60);
        else
            var string = parseInt(time / 60) + ":" + parseInt(time % 60);
        this.setData({ time: { value: string , refresh : true } });

        this.progress = 1;
        this.setData({ progressbar1: { value: this.progress} });
    },

    onList:function(event){
        console.log("list");
        pm.navigateTo({url: "list/list"});
    }
};

Page(page);

page = 0;
