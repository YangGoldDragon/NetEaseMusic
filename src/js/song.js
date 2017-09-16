/**
 * Created by 金龙 on 2017/9/5.
 */
$(function () {
    function playInit(url) {
        let audio = document.createElement('audio');
        audio.src = url;
        /*audio.oncanplay = function () {
            audio.play();  //出于保护用户的目的，在移动端禁止加载资源之后自动播放，巨坑。该属性只能在PC端有效，移动端无效。
        };
        */
        $('.icon-pause').on('click',function () {
            audio.pause();
            $(this).removeClass('icon-show');
            $('.icon-play').addClass('icon-show');
            $('.disc-img2').css({
                'animation-play-state': 'paused'
            });
            $('.disc-img3').css({
                'animation-play-state': 'paused'
            });
            $('.song-pointer').addClass('song-pause');
        });

        $('.icon-play').on('click',function () {
            audio.play();
            $(this).removeClass('icon-show');
            $('.icon-pause').addClass('icon-show');
            $('.disc-img2').css({
                'animation-play-state': 'running'
            });
            $('.disc-img3').css({
                'animation-play-state': 'running'
            });
            $('.song-pointer').removeClass('song-pause');
        });

        /*滚动歌词*/
            setInterval(()=>{
            let seconds = audio.currentTime;
            let minutes = ~~(seconds / 60);
            let leftSeconds = seconds - minutes * 60;
            let time = pad(minutes) + ':' + pad(leftSeconds);
            let $curP;
            let $p = $('.words > p');
            for(let i = 0; i < $p.length; i++){
                if(time > $p.eq(i).attr('data-time') && time < $p.eq(i+1).attr('data-time') && $p[i+1] !== undefined){
                    $curP = $p.eq(i);
                    break;
                }
            }
            if($curP){
                $curP.addClass('active').prev().removeClass('active');
                let curPTop = $curP.offset().top;
                let wordsTop = $('.words').offset().top;
                let pMove = curPTop - wordsTop - $('.lines').height()/3;
                $('.words').css({
                    'transform': 'translateY(-'+pMove+'px)'
                });
            }
        },300);
    }



    function pad(number) {
        return number >= 10 ? number + '' : '0' + number;
    }

    function textInit(name, singer, lyric) {
        $('#name').text(name);
        $('#singer').text(singer);
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
            $p.attr('data-time', ''+cur.time+'').text(cur.words);
            $words.append($p);
        })
    }

    function imagesInit(bg, disc) {
        $('.page').css({
            'background': 'transparent url("'+bg+'") no-repeat'
        });
        document.querySelector('.disc-img3').src = disc;
    }

    let id = location.search.match(/\bid=([^&]*)/)[1];
    $.get('./songs.json').then(function (response) {
        let songs = response;
        if(typeof songs === 'string'){
            songs = songs.split('/^},/');
        }
        let song = songs.filter((s)=>{return s.id === id})[0];
        let {name, singer, bg, disc, url, lyric} = song;

        playInit.call(undefined, url);
        textInit.apply(undefined,[name, singer, lyric]);
        imagesInit.call(undefined, bg, disc);
    });
});