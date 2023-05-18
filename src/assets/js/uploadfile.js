import COS  from 'cos-js-sdk-v5'
const cos = new COS({
    getAuthorization: function (options, callback) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://www.trillionricher.com/1.0/getaccout_cos",
            data: {
                merber_id: _this.merber_id,
                token: _this.token,
            },
            success: function (res) {
                var credentials = res.credentials
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    XCosSecurityToken: credentials.sessionToken,
                    // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
                    ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000900
                });
            }
        })
    }
})
export {cos}