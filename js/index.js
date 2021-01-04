window.onload = function() {
    $(function() {
            $('.nav .nav-right .number').hover(function() {
                $('.number .number-bottom').css({ 'display': 'block', 'z-index': '5' })
            }, function() {
                $('.nav .number .number-bottom').css('display', 'none')
            });
        }),
        $(function() {
            var classify = $('.content .gather li');
            // console.log(classify);
            $.each(classify, function(i, obj) {
                $(obj).hover(function() {
                    $('.content .gather .abs').css({ 'display': 'block', 'z-index': '6' })
                }, function() {
                    $('.content .gather .abs').css({ 'display': 'none' })
                });
            });
        })
}