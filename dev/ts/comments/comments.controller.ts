(function() {

    angular
        .module('MajesticWine')
        .controller('CommentsController', CommentsController);

    function CommentsController() {

        let vm = this;

        vm.addReply = addReply;
        vm.addComment = addComment;

        vm.comments = [
            {
                name: 'Jimbo',
                content: 'Bought this for first time and wouldn\'t buy again. Was not expecting the blush colour that came out and, for me, a little sweet. It is, nevertheless, a palatable drink for all that.'
                date: '3 Days Ago'
                replies: [
                    {
                        name: 'John Thomas',
                        content: 'I\'m sorry to hear you didn\'t enjoy it Jimbo. It does need to be opened about an hour before drinking to git it some time to warm up to room temperature.',
                        date: 'Yesterday'
                    }
                ]
            },
        ]

        ////////////

        function addReply(index) {
            vm.comments[index].replies.push({
                name: 'This User',
                content: vm.reply[index],
                date: 'Just now'
            });

            vm.reply[index] = undefined;
        }

        function addComment() {
            vm.comments.push({
                name: 'This User',
                content: vm.comment,
                date: 'Just now',
                replies: [];
            });

            vm.comment = undefined;
        }

    }

})();
