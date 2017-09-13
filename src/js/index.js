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

});
