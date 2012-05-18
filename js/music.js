/**
 * Created with JetBrains WebStorm.
 * User: hyl
 * Date: 12-5-18
 * Time: 上午10:14
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var _lrc = "[ti:十年],[ar:陈奕迅],[al:黑.白.灰],[by:HIM],[00:02.00]歌名：十年,[00:06.00]歌手：陈奕迅,[00:10.00]编辑：HIM," +
        "[00:15.17]如果那两个字没有颤抖,[00:18.76]我不会发现 我难受,[00:22.05]怎么说出口 也不过是分手,[00:30.44]如果对于明天没有要求,[00:34.33]牵牵手就像旅游,[00:37.52]成千上万个门口," +
        "[00:41.11]总有一个人要先走,[01:56.94][00:47.40]怀抱既然不能逗留,[02:00.13][00:50.39]何不在离开的时候,[02:03.32][00:53.68]一边享受 一边泪流,[02:10.31][01:00.77]十年之前,[02:12.20][01:02.66]我不认识你 你不属于我," +
        "[02:16.11][01:06.45]我们还是一样,[02:18.39][01:08.86]陪在一个陌生人左右,[02:22.38][01:12.85]走过渐渐熟悉的街头,[02:25.77][01:16.23]十年之后,[02:27.57][01:18.13]我们是朋友 还可以问候,[02:31.36][01:21.82]只是那种温柔," +
        "[02:33.66][01:24.21]再也找不到拥抱的理由,[02:37.55][01:28.20]情人最后难免沦为朋友,[02:48.12]直到和你做了多年朋友,[02:51.81]才明白我的眼泪,[02:55.11]不是为你而流 也为别人而流";
    var _arrLrc = _lrc.split(','), _audio_obj = {}, _keyArr = [];
    _arrLrc.forEach(function (_it) {
        var _reg = /(\d{2})\:(\d{2})\.(\d{2})/ig;
        if (_it.indexOf("]") === _it.lastIndexOf("]") && _it.indexOf("]") !== _it.length - 1) {
            var _strArr = _it.split(']'), _tmp_arr = _reg.exec(_strArr[0]), _total_s = parseInt(_tmp_arr[1], 10) * 60 * 100 + parseInt(_tmp_arr[2], 10) * 100 + parseInt(_tmp_arr[3], 10);
            _audio_obj["time" + _total_s] = _strArr[1];
            _keyArr.push(_total_s);
        } else if (_it.indexOf("]") !== _it.lastIndexOf("]") && _it.indexOf("]") !== _it.length - 1) {
            var _strArr = _it.split(']'), _tmp_arr = _reg.exec(_strArr[0]), _total_s = parseInt(_tmp_arr[1], 10) * 60 * 100 + parseInt(_tmp_arr[2], 10) * 100 + parseInt(_tmp_arr[3], 10);
            _reg.lastIndex = 0;//重新设置正则表达式上一次开始的位置
            var _tmp_arr2 = _reg.exec(_strArr[1]), _total_s2 = parseInt(_tmp_arr2[1], 10) * 60 * 100 + parseInt(_tmp_arr2[2], 10) * 100 + parseInt(_tmp_arr2[3], 10);
            _audio_obj["time" + _total_s] = _strArr[2];
            _audio_obj["time" + _total_s2] = _strArr[2];
            _keyArr.push(_total_s);
            _keyArr.push(_total_s2);
        }
    });
    _keyArr.sort(function (i, j) {
        return i - j;
    });
    var len = _keyArr.length;
    window.onload = function () {
        var _audio = document.getElementById('audio'), _show = document.getElementById('lrc_show');
        _audio.addEventListener('timeupdate', function (e) {
            var _currTime = Math.floor(e.srcElement.currentTime * 100), _v = null;
            if (_currTime > _keyArr[len - 1])_v = _audio_obj["time" + _keyArr[len - 1]];
            else
                for (var i = 0; i < len - 1; i++) {
                    if (_currTime > _keyArr[i] && _currTime < _keyArr[i + 1]) {
                        _v = _audio_obj["time" + _keyArr[i]];
                        break;
                    }
                }
            _show.innerHTML = _v;
        });
    }
})();