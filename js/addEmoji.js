{
    'use-strict';
    /** Add Emoji Function */
    $(function () {
        function addEmoji(){
            var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
                0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
                0x1F431, 0x1F42A, 0x1F439, 0x1F424];
                const resEmoji = emojis.map(item =>
                    `<a class="emoji">${String.fromCodePoint(item)}</a>`)
                $('.emoji-list').html(resEmoji.join(' '))
            $('.emoji').on('click', function (e) {
                $('#textChat').val($('#textChat').val() + $(this).html());
            })
        }
    addEmoji()
    })
}