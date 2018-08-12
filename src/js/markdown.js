import showdown from "showdown";


var ltag_memory = {L : 0, R:0}


showdown.extension('c2c_folies', function () {

    var toc = { //trash
        type: 'lang',
        regex: /(\[\/?(toc2|p|toc)([a-zA-Z_\d ]*)?\/?\])/g,
        replace: function () {
            return '';
        }
    };

    var c2c_title = { //trash
        type: 'lang',
        regex: /\n(#+)([^\n#]+)#*(.*)/g,
        replace: function (match, hashs, title, appendix) {
            if(appendix)
                appendix = "<small>" + appendix + "</small>"

            return '\n' + hashs + title + appendix ;
        }
    };

    function image(imgId, options, legend){
        var size = "MI"
        var css = []

        if(options){
            options = options.split(" ")

            options.forEach(function(option){
                if(option){
                    css.push('image-' + option.replace("_","-"))
                    size = option=="big" ? "BI" : size
                 }
            })
        }

        css = css.length ? " class='" + css.join(" ") + "'" : ""

        // todo : include legend

        return '<figure' + css + '>' +
            '<img src="https://api.camptocamp.org/images/proxy/' + imgId + '?size=' + size + '" ' +
            'href="photoswipe.showGallery(' + imgId + ')"' +
            '/><!--' + legend +  '--></figure>'

    }

    var img = {
        type: 'lang',
        regex: /\[img=([\d]+|[A-Za-z][\dA-Za-z._/]+)([a-zA-Z\-_ ]*)?\/\]/g,
        replace: function (match, imgId, options) {
            return image(imgId, options)
        }
    };

    var imgLegend = {
        type: 'lang',
        regex: /\[img=([\d]+|[A-Za-z][\dA-Za-z._/]+)([a-zA-Z\-_ ]*)?\]([^[]*)\[\/img\]/g,
        replace: function (match, imgId, options, legend) {
            return image(imgId, options, legend)
        }
    };

    var acr = {
        type: 'lang',
        regex: /\[acr(?:onym)?=([^[]*?)\](.*?)\[\/acr(?:onym)?\]/g,
        replace: function (match, title, text) {
            return '<acronym title="' + title + '">' + text + '</acronym>';
        }
    };

    var c2cItem = {
        type: 'lang',
        regex: /\[\[\/?(book|waypoint|route|outing|area|article)s\/([\d]+)([^|]*)\|([^\]]*)\]\]/g,
        replace: function (match, item, id, lang, text) {
            if(item=="book" || item=="article")
                return '<a href="https://www.camptocamp.org/' + item + 's/' + id + '">' + text + '</a>';
            else
                return '<a href="' + item + '/' + id + '">' + text + '</a>';
        }
    };

    var url4 = {
        type: 'lang',
        regex: /\[\[([^|\n ]*)\|([^\]]*)\]\]/g,
        replace: function (match, url, text) {
            return '<a href="' + url + '">' + text + '</a>'; // give it to markdown
        }
    };

    // your new best friends :
    // https://regex101.com/
    // http://localhost:3000/markdown
    // http://localhost:3000/article/305462
    // http://localhost:3000/route/57964 thank you Mister Piola for this never ending multi pitch!

    var LtagResult = function(){
        var _this = this

        this.rows = []
        this.cellCount = 1

        this.compute = function(){
            var items = ['\n<table>']

            this.rows.forEach(function(row){

                items.push("<tr>")

                if(row.cells){
                    while(row.cells.length < _this.cellCount-1)
                        row.cells.push("")

                    var elt_in = "<" + row.elt + ">"
                    var elt_out = "</" + row.elt + ">"

                    items.push(elt_in, row.cell1.trim(), elt_out)

                    row.cells.forEach(function(cell){
                        items.push(elt_in, cell.replace("\n", "<br>"), elt_out)
                    })
                }
                else{
                    items.push("<td colspan='" + _this.cellCount + "'>" + row.cell1 + "</td>")
                }

                items.push("</tr>")

            })

            items.push('</table>')
            return items.join("")
        }

        this.pushLine = function(elt, cell1, cells){

            //remove last empty cells
            if(cells && cells.length){

                while(!cells[cells.length-1] && cells.length>0)
                    cells.splice(-1,1)

                this.cellCount = Math.max(this.cellCount, cells.length + 1)
            }

            _this.rows.push({
                elt:elt,
                cell1:cell1,
                cells:cells
            })
        }
    }

    var ltag = {
        type: 'lang',
        regex: /(?:(?:\n\n?)[LR]#[^]*?(?=\n[LR]#|\n\n))+/gm,
        replace: function () {
            arguments[0] = arguments[0] + "\n\n"

            var row_parser = /(?:\n\n?)([LR])#([^]*?(?=\n[LR]#|\n\n))/gm
            var row_sub_parser = /(=|~|[^|: =]*) *(\|\||\||::|:)?([^]*)/
            var cell_parser = /([^]*?)(?:\|)/g

            var result = new LtagResult()

            do{
                var row_match = row_parser.exec(arguments[0])

                if(row_match){
                    var tag = row_match[1]
                    var row_parts = row_sub_parser.exec(row_match[2])
                    var suffix = row_parts[1]
                    var cells_str = row_parts[3]

                    cells_str = cells_str.trim() + "|"
                    var cells = []

                    do{
                        var cell_match = cell_parser.exec(cells_str)
                        if(cell_match)
                            cells.push(cell_match[1].trim())

                    }while(cell_match)

                    processCells(result, tag, suffix, cells)
                }
            } while(row_match)

            return result.compute()
        }
    }

    var processCells = function(result, tag, suffix, cells){

        if(suffix.startsWith("~"))
            result.pushLine('td', cells[0])
        else if(suffix.startsWith("="))
            result.pushLine('th', "", cells)
        else{

            var suffix_parser = /^([\d]*)([^\d\-+!][^ !]*)?(-[\d]+)?$/
            var suffix_data = suffix_parser.exec(suffix)

            if(suffix_data){
                var fixed_number = suffix_data[1]   // <number> or +<number>
                var label = suffix_data[2] || ''    // whatever without spaces, and not starting with number nor  _-+!
                var group_number = suffix_data[3]   // -<+>?<number>

                var number = ltag_memory[tag]

                /////////////////////////////////////////////////////////////////////////////////////////////
                // <number> or +<number>
                if (!fixed_number) //+1
                    number += 1
                else   //  number : set to it
                    number = parseInt(fixed_number)

                var number2 = number

                if(group_number){    // several pitchs on one row
                    group_number = group_number.substring(1)
                    number2 = parseInt(group_number)
                }

                //build final label
                var cell1 = tag + number + (number2 != number ? "-" + number2 : "") + label

                result.pushLine('td', cell1, cells)

                ltag_memory[tag] = number2
            }
        }
    }

    var video = {
        type: 'lang',
        regex: /\[video\](.*?)\[\/video\]/g,
        replace: function (match, url) {
            console.log(match)
            if(url.includes("vimeo.com")){
                url = url.replace("vimeo.com","player.vimeo.com/video")
                return '<iframe src="' + url + '" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            }

            return match
        }
    };

    return [c2c_title, video, img, imgLegend, acr, c2cItem, url4, toc, ltag];
})


var converter = new showdown.Converter({
    simpleLineBreaks : true,
    headerLevelStart : 2,
    simplifiedAutoLink: true,
    extensions : ['c2c_folies'],
})

export default {
    convert : function (markdown){
        ltag_memory.R = 0;
        ltag_memory.L = 0;
        return converter.makeHtml(markdown);
    }
}