// 模板编译靠正则
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 匹配命名空间 abc-Aa
const qnameCature = `((?:${ncname}\\:)?${ncname})`  // <aaa:asdsdj> 注 ?: 匹配不捕获
const startTagOpen = new RegExp(`^<${qnameCature}`) // 标签开头的正则，捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCature}[^>]*>`) // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const startTagClose = /^\s*(\/?)>/ // 匹配标签结束的 > 
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配双符号

// var str = `{{ sdfasdf }}`
// console.log(str.match(defaultTagRE))

// var string = '<sdf-span></sdf-span>'
// console.log(string.match(startTagOpen))

function parseHTML(html) {
  // 不停的解析 html 字符串
  while(html) {
    let textEnd = html.indexOf('<')
    console.log(textEnd)
    if (textEnd == 0) {
      // 是开始标签或者结束标签
      let startTagMatch = parseStartTag()
      break;
    }
  }

  function advance(n) {
    html = html.substring(n)
  }

  function parseStartTag() {
    let start = html.match(startTagOpen)
    if (start) {
      console.log(start)
      advance(start[0].length)
    }
  }
}

// ast 语法树 用对象来描述原生语法的
export function compileToFunction (template) {
  let root = parseHTML(template)
  console.log(root)
  return function render() {

  }
}

{/* <div id="app">
  <p>hello</p>
</div> */}


// let root = {
//   tag: 'div',
//   attrs: [{name: 'id', value: 'app'}],
//   parent: null,
//   children: {
//     tag: 'p',
//     attrs: [],
//     parent: root,
//     type: 1, 
//     children: [{
//       text: 'hello',
//       type: 3
//     }]
//   }
// }
