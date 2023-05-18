/**
 * Created by zhubing on 2019/5/8 0008.
 */

let Bucket = 'egopay-1258561482';
let Region = 'ap-hongkong';
let protocol = location.protocol === 'https:' ? 'https:' : 'http:';
let prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
let tokenApi = '1.0/costoken/';
let app = new Vue({
    el: '#app',
    data: {
        video: {
            isvideo: true,
            src: 'https://egopay-1258561482.cos.ap-hongkong.myqcloud.com/demo/6bf47e1cf82469d328ced6d6cb76bcdc.mp4',
        },
        img: {
            isimg: false,
            src: 'https://egopay-1258561482.cos.ap-hongkong.myqcloud.com/demo/1552793674(5).png'
        },
        config: {
            Bucket: Bucket,
            Region: Region,
            protocol: protocol,
            prefix: prefix,
            key: '',
        },
        message: '',
        file: {}
    },
    methods:{
        // 对更多字符编码的 url encode 格式
        camSafeUrlEncode(str) {
            return encodeURIComponent(str)
                .replace(/!/g, '%21')
                .replace(/'/g, '%27')
                .replace(/\(/g, '%28')
                .replace(/\)/g, '%29')
                .replace(/\*/g, '%2A');
        },
        // 计算签名
        getAuthorization(options, callback) {
            $.get(tokenApi, function(res){
                if(res.code == 200){
                    let credentials;
                    credentials = res.data.cos_token.credentials;
                    if (credentials) {
                        callback(null, {
                            XCosSecurityToken: credentials.sessionToken,
                            Authorization: CosAuth({
                                SecretId: credentials.tmpSecretId,
                                SecretKey: credentials.tmpSecretKey,
                                Method: options.Method,
                                Pathname: options.Pathname,
                            })
                        });
                    } else {
                        console.error(res);
                        callback('获取签名出错');
                    }
                }else{
                    console.log(res);
                    callback('获取签名出错.');
                }
            });
        },
        uploadFile(file, callback) {
            let self = this;
            let filename = file.name;

            let suffix = filename.substring(filename.lastIndexOf("."), filename.length).toLowerCase();
            console.log(suffix);
            if(suffix == '.jpg' || suffix == '.jpeg' || suffix == '.png' || suffix == '.gif'){
                self.img.isimg = true;
            }else if(suffix == '.mp4' || suffix == '.mov'){
                self.video.isvideo = true;
            }else{
                self.message = '不支持的文件格式';return false;
            }

            //限制文件大小 todo

            let Key = 'demo/' + filename; // 这里指定上传目录和文件名
            self.config.key = Key;
            self.getAuthorization({Method: 'POST', Pathname: '/'}, function (err, info) {
                let fd = new FormData();
                fd.append('key', Key);
                fd.append('Signature', info.Authorization);
                fd.append('Content-Type', '');
                info.XCosSecurityToken && fd.append('x-cos-security-token', info.XCosSecurityToken);
                fd.append('file', file);
                let url = prefix;
                let xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.upload.onprogress = function (e) {
                    console.log('上传进度 ' + (Math.round(e.loaded / e.total * 10000) / 100) + '%');
                };
                xhr.onload = function () {
                    if (Math.floor(xhr.status / 100) === 2) {
                        let ETag = xhr.getResponseHeader('etag');
                        callback(null, {ETag: ETag});
                        // callback(null, {url: prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/'), ETag: ETag});
                    } else {
                        callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
                    }
                };
                xhr.onerror = function () {
                    callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
                };
                xhr.send(fd);
            });
        },
        upload(){
            let self = this;
            let file = $('#fileSelect')[0].files[0];
            // let file = document.getElementById('fileSelect').files[0];
            if (!file) {
                self.message = '未选择上传文件';
                return false;
            }
            file && self.uploadFile(file, function (err, data) {
                console.log(err || data);
                if(err){
                    self.message = err;
                }else{
                    self.message = ('上传成功，ETag=' + data.ETag);
                    if(self.video.isvideo){
                        self.video.src = self.config.prefix + self.config.key;
                    }else if(self.video.isimg){
                        self.img.src = self.config.prefix + self.config.key;
                    }else{
                        console.log('不支持的格式');
                    }
                }
            });
        }
    },
    mounted(){}
});
