/**
 * Created by 金龙 on 2017/9/5.
 */
$(function () {
    $.get('./lyric.json').then(function (object) {
        let lyric = object.lyric;
        let lyricArr = lyric.split('\n');
        let regex = /^\[(.+)\](.*)$/;
        lyricArr = lyricArr.map(function (cur, idx) {
            let matches = cur.match(regex);
            if(matches){
                return {
                    time: matches[1],
                    words: matches[2]
                }
            }
        });

        let $words = $('.words');
        lyricArr.map(function (cur) {
            if(!cur){return};
            let $p = $('<p></p>');
            $p.attr('data-time', 'cur.time').text(cur.words);
            $words.append($p);
        })
    });

    let audio = document.createElement('audio');
    audio.src = '//m10.music.126.net/20170911105225/50b510df203c48f3ae56392199221390/ymusic/f239/a9c8/927d/9bffb3da2e579311563dd705af2c0f2d.mp3';
    audio.crossOrigin = "anonymous";
    audio.oncanplay = function () {
        audio.play();  //苹果出于保护用户的目的，禁止加载资源之后自动播放，巨坑。
    };

    $('.icon-pause').on('click',function () {
        audio.pause();
        $(this).removeClass('icon-show');
        $('.icon-play').addClass('icon-show');
        $('.disc-img2').css({
            'animation-play-state': 'paused',
            '-webkit-animation-play-state': 'paused'
        });
        $('.disc-img3').css({
            'animation-play-state': 'paused',
            '-webkit-animation-play-state': 'paused'
        });
        $('.song-pointer').addClass('song-pause');
    });

    $('.icon-play').on('click',function () {
        audio.play();
        $(this).removeClass('icon-show');
        $('.icon-pause').addClass('icon-show');
        $('.disc-img2').css({
            'animation-play-state': 'running',
            '-webkit-animation-play-state': 'running'
        });
        $('.disc-img3').css({
            'animation-play-state': 'running',
            '-webkit-animation-play-state': 'running'
        });
        $('.song-pointer').removeClass('song-pause');
    });
});