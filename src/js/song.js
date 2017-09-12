/**
 * Created by 金龙 on 2017/9/5.
 */
$(function () {
    let id = location.search.match(/\bid=([^&]*)/)[1];
    $.get('./songs.json').then(function (response) {
        let songs = response;
        if(typeof songs === 'string'){
            songs = songs.split('/^},/');
        }
        let song = songs.filter((s)=>{return s.id === id})[0];
        let {url} = song;
        let audio = document.createElement('audio');
        audio.src = url;
        audio.oncanplay = function () {
            audio.play();  //出于保护用户的目的，在移动端禁止加载资源之后自动播放，巨坑。该属性只能在PC端有效，移动端无效。
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
    $.get('./lyric.json').then(function (object) {
        let {lyric} = object;
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
});