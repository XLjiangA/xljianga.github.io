function getLevel(vm) {
    let level = vm.route.path.substring(1)
    if (level) {
        switch (level) {
            case "easy":
                return 0
            case "easy+":
                return 1
            case "medium":
                return 2
            case "medium+":
                return 3
            case "hard":
                return 4
            case "hard+":
                return 5
            case "god":
                return 6
            case "god+":
                return 7
        }
    }
    return -1
}
/*
## 南极洲39关
- 作者: `艾莉丝#51209`
- 代码: `XJZDV`

?> 后面有一关略难 其他关卡基本都白给
*/
function ow(hook, vm) {
    hook.init(() => {
        AV.init({
            appId: "OaPuGAAbTa6B4zToMP9IJACP-9Nh9j0Va",
            appKey: "ouN3DDJukC9pNtNoPMOa15GQ",
            serverURL: "https://oapugaab.lc-cn-e1-shared.com"
        })
    })
    hook.beforeEach((content, next) => {
        let _Level = getLevel(vm)
        let _author = vm.route.query['author']
        if (_author) {
            _author = _author.replace("?id", "")
        } else _author = ""
        if (_Level != -1) {
            let query = new AV.Query('codes')
            query.equalTo('level', _Level)
            query.find().then((list) => {
                let temp = []
                list.forEach(value => {
                    value = value['attributes']
                    if (!value['author']) value['author'] = "未知"
                    temp.push("<div class='ow-code'>")
                    temp.push("")
                    temp.push("## " + value['mapName'] + value['levelNum'] + "关")
                    temp.push("- 作者: `" + value['author'] + "`")
                    temp.push("- 代码: `" + value['code'] + "`")
                    temp.push("")
                    temp.push("?> " + value['description'])
                    temp.push("</div>")
                })
                content += temp.join("\r\n")
                next(content)
            })
        } else next(content)
    })
    hook.doneEach(() => {

    })
    hook.mounted(() => {})
}
window.$docsify = window.$docsify || {}
window.$docsify.plugins = [ow].concat(window.$docsify.plugins || [])