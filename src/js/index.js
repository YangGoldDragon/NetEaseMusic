$(function () {
    $.get('./songs.json').then(function (response) {
        let items = response;
        items.forEach((cur)=>{
            let $li = $(
                '<li>'+
                    '<a href="./song.html?id='+cur.id+'">'+
                        '<h4>'+cur.name+'</h4>'+
                        '<p>'+
                            '<svg class="icon">'+
                                '<use xlink:href="#icon-SQ"></use>'+
                            '</svg>'+
                            '<span>&nbsp;&nbsp;'+cur.singer+'</span>'+
                        '</p>'+
                        '<svg class="btn">'+
                                '<use xlink:href="#icon-play1"></use>'+
                        '</svg>'+
                    '</a>'+
                '</li>'
            );
            $('#lastestMusic').append($li);
        });

        items.forEach((cur)=>{
            let $li = $(
                '<li>'+
                    '<a href="./song.html?id='+cur.id+'">'+
                        '<h3>'+cur.id+'</h3>'+
                        '<h4>'+cur.name+'</h4>'+
                        '<p>'+
                            '<svg class="icon">'+
                                '<use xlink:href="#icon-SQ"></use>'+
                            '</svg>'+
                        '<span>&nbsp;&nbsp;'+cur.singer+'</span>'+
                        '</p>'+
                        '<svg class="btn">'+
                            '<use xlink:href="#icon-play1"></use>'+
                        '</svg>'+
                    '</a>'+
                '</li>'
            );
            $('#hotSongs').append($li);
        });

        items.forEach((cur)=>{
            let $li = $(
                '<li>'+
                    '<a href="./song.html?id='+cur.id+'">'+cur.name+''+
                    '</a>'+
                '</li>'

            );
            $('#hotSongsIcon').prepend($li);
        });

        items.forEach((cur)=>{
            let $li = $(
                '<li>'+
                    '<a href="./song.html?id='+cur.id+'">'+
                        '<h3>'+cur.id+'</h3>'+
                        '<h4>'+cur.name+'</h4>'+
                        '<p>'+
                            '<svg class="icon">'+
                                '<use xlink:href="#icon-SQ"></use>'+
                            '</svg>'+
                            '<span>&nbsp;&nbsp;'+cur.singer+'</span>'+
                        '</p>'+
                            '<svg class="btn">'+
                                '<use xlink:href="#icon-play1"></use>'+
                            '</svg>'+
                    '</a>'+
                '</li>'
            );
            $('#recomendSongList').append($li);
        });

        $('.loading').remove();

        $('#hotSongs').find('h3').each(function () {
            let h3Text = parseInt($(this).text(),10);
            if(h3Text > 9){return}
            h3Text = '0' + h3Text;
            $(this).text(h3Text);
        })
    });

    $('#navTab').on('click','li',function (e) {
        let $curLi = $(e.currentTarget);
        let index = $curLi.index();
        console.log(index);
        $('.tab-content > li').eq(index).addClass('tab-active').siblings().removeClass('tab-active');
        $curLi.find('span').addClass('red-bottom').parent().siblings().find('span').removeClass('red-bottom');
    });

    function search(keyword) {
        return new Promise((resolve, reject)=>{
            var database = [
                {
                    "id": "1",
                    "name": "Try"
                },
                {
                    "id": "2",
                    "name": "追梦赤子心"
                },
                {
                    "id": "3",
                    "name": "告白气球"
                },
                {
                    "id": "4",
                    "name": "Papillon"
                },
                {
                    "id": "5",
                    "name": "逃"
                },
                {
                    "id": "6",
                    "name": "Look What You Made Me Do"
                },
                {
                    "id": "7",
                    "name": "雨蝶"
                },
                {
                    "id": "8",
                    "name": "童话镇"
                },
                {
                    "id": "9",
                    "name": "IF YOU"
                },
                {
                    "id": "10",
                    "name": "丑八怪"
                }
            ];
            let result = database.filter(function (perVal) {
                return perVal.name.indexOf(keyword) >= 0
            });
            resolve(result);
        });
    }
    window.search = search;

    let timer = undefined;
    $('#searchSong').on('input', function (e) {
        let $input = $(e.currentTarget);
        let $value = $input.val().trim();
        if($value === ''){return;}
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            search($value).then((result)=>{
                if(result.length !== 0){
                    $('#outputSpan').text(result.map((perVal)=>{return perVal.name}).join(','));
                    let outputLink = document.querySelector('#outputLink');
                    outputLink.href = './song.html?id='+result.map((perVal)=>{return perVal.id})[0]+'';
                }else{
                    $('#outputSpan').text('搜索 "'+$value+'" 没有结果');
                }
            });
        },300);
    });

    $('#output').hide();
    $('#searchSong').on('input porpertychange', function (e) {
        let $input = $(e.currentTarget);
        let $value = $input.val().trim();
        if($value === ''){
            $('#output').hide();
            $('#hotSearch').show();
        }else{
            $('#output').show();
            $('#hotSearch').hide();
        }
    });

});
