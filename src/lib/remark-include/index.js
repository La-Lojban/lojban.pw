var VFile = require('vfile')
var path = require('path')
var fs = require('fs')

var parseInclude = /^@include (.*)(\n|$)/

module.exports = function(options) {
    var proc = this;
    options = options || {}
    var cwd = options.cwd || process.cwd()

    return function transformer(ast, file) {
        var children = ast.children

        for (var i = 0; i < children.length; i++) {
            var child = children[i]

            if (child.type === 'paragraph' && child.children) {
                let found = false;
                let includeFileName = "";
                child.children.forEach(subCh => {
                    if (subCh.type === 'text' && parseInclude.test(subCh.value)) {
                        found = true;
                        includeFileName = subCh.value.match(parseInclude)[1];
                    }
                });
                if (!found) {
                    continue;
                }

                var root = proc.runSync(proc.parse(
                    toFile(path.join(file.dirname || cwd, includeFileName))
                ))

                // Split and merge the head and tail around the new children
                var head = children.slice(0, i)
                var tail = children.slice(i + 1)
                children = head.concat(root.children).concat(tail)

                // Remember to update the offset!
                i += root.children.length - 1
            }


        }

        ast.children = children
    }
}

function toFile(full) {
    return new VFile({ path: full, contents: loadContent(full).toString('utf8') })
}

function loadContent(file) {
    // console.log('loading', file)
    try { return fs.readFileSync(file) } catch (e) {}

    try { return fs.readFileSync(file + '.md') } catch (e) {}

    try { return fs.readFileSync(file + '.markdown') } catch (e) {}

    throw new Error('Unable to include ' + file)
}