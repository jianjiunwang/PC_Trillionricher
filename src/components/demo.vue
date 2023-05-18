<template>
    <div>
        11
        <img src="https://i-tw.org/twpay/api/?Bank=822&Acc=92170798253122&Amount=2116&Redir=200" alt="">
        22
        <img :src="QR" alt="">
    </div>
</template>

<script>

    export default {
        data: function () {
            return {
                QR:''
            }
        },
        components: {
        },
        methods: {
        },
        computed: {},
        watch: {
        },
        created: function () {
            $.ajax({
                type:'get',
                url:'https://i-tw.org/twpay/api/?Bank=822&Acc=92170798253122&Amount=2116',
                dataType:"xml",
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                },
                success: (res) => {
                    this.QR = res.QR
                    console.log(res);
                }
            })
        }

    }
</script>
