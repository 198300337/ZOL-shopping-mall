window.onload = function() {
    $(function() {
            $('.nav .nav-right .number').hover(function() {
                $('.number .number-bottom').css({ 'display': 'block', 'z-index': '5' })
            }, function() {
                $('.nav .number .number-bottom').css('display', 'none')
            });
        }),
        $(function() {

            $('.content ul').hover(function() {
                $('.content ul .abs').css({ 'display': 'block' })
            }, function() {
                $('.content ul .abs').css({ 'display': 'none' })
            })
        })
}