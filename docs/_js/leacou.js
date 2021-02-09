AV.init({
  appId: "OaPuGAAbTa6B4zToMP9IJACP-9Nh9j0Va",
  appKey: "ouN3DDJukC9pNtNoPMOa15GQ",
  serverURL: "https://oapugaab.lc-cn-e1-shared.com"
});

window.$docsify = {
  auto2top: true,
  maxLevel: 4,
  subMaxLevel: 2,
  loadSidebar: true,
  coverpage: true,
  search: {
    placeholder: '搜索',
    noData: '找不到结果',
    paths: 'auto'
  },
  plugins: [function (hook, v) {
    hook.beforeEach(getWorldcodes);
  }]
}



function getLevel() {
  let url = window.location.href;
  let levelstr = url.substring(url.indexOf("/#/") + 3)
  if (levelstr) {
    switch (levelstr) {
      case "easy":
        return 0;
      case "easy+":
        return 1;
      case "medium":
        return 2;
      case "medium+":
        return 3;
      case "hard":
        return 4;
      case "hard+":
        return 5;
      case "god":
        return 6;
      case "god+":
        return 7;
    }
  }
  return -1;
}
/*
## 南极洲39关
- 作者: `艾莉丝#51209`
- 代码: `XJZDV`

?> 后面有一关略难 其他关卡基本都白给
*/
function getWorldcodes(content, next) {
  let _Level = getLevel();
  if (_Level != -1) {
    let query = new AV.Query('codes');
    query.equalTo('level', _Level);
    query.find().then((list) => {
      let temp = new Array();
      list.forEach(value => {
        value = value['attributes'];
        temp.push("");
        temp.push("## " + value['mapName'] + value['levelNum'] + "关");
        temp.push("- 作者: `" + value['author'] + "`");
        temp.push("- 代码: `" + value['code'] + "`");
        temp.push("");
        temp.push("?> " + value['description']);
      });
      content += temp.join("\r\n");
      next(content);
    });
  }
  next(content);
}