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
        $('.loading').remove();
    });
});
