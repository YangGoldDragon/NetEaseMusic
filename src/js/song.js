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
    audio.src = '//dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?fromtag=38&vkey=30B7E62CE7AAE2CBF403F5A432ACD0181DF43BCF64E73373B684400774C1C0BBF2CBD08C203BA703820F5D2E0FED16BF0834194F360B908B&guid=225426600';
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