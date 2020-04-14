module.exports = {
    line: '---',
    br: '\n',
    h1: (txt) => {
        return '\n' + '# ' + txt + '\n\n';
    },
    h2: (txt) => {
        return '\n' + '## ' + txt + '\n\n';
    },
    h3: (txt) => {
        return '\n' + '### ' + txt + '\n\n';
    },
    h4: (txt) => {
        return '\n' + '#### ' + txt + '\n\n';
    },
    h5: (txt) => {
        return '\n' + '##### ' + txt + '\n\n';
    },
    h6: (txt) => {
        return '\n' + '###### ' + txt + '\n\n';
    },
    blockquot: (txt) => {
        return '\n' + '> ' + txt + '\n\n';
    },
    key_value: (key, value) => {
        return key + ': ' + value;
    },
    link: (text, href) => {
        return `[${text}](${href})`;
    },
    clean_html_whitespace: (html) => {
        return html.replace(/>[\s|\n|\t]+</g, '><').replace(/\s/g, ' ').trim();
    },
    clean_text_whitespace: (text) => {
        return text.replace(/\s/g, ' ').replace(/\t/g, '  ').replace(/\n+/g, '\n\n').trim();
    },
    clean_url: (url) => {
        return url.replace(/http[s]?\:\/\/(www)?[\.]?/, '');
    },
    create_output_header: function (url, title) {
        let header = '\n\n';
        header += url + '\n\n';
        header += '# ' + title + '\n\n';
        header += '---------------------------\n';
        return header;
    },
    obj_to_list: (obj) => {
        if (typeof obj === 'object') {
            let result_arr = [];
            for (var item of Object.entries(obj)) {
                console.log(typeof item[0]);
                result_arr.push(`-  ${item[0]}: ` + JSON.stringify(item[1]));
            }
            return result_arr.join('\n');
        } else if (typeof obj === 'string') {
            return obj;
        } else {
            return JSON.stringify(obj);
        }
    },
    arr_to_list: (arr) => {
        let result_arr = [];
        arr.forEach(function (item) {
            result_arr.push('- ' + item);
        });
        return result_arr.join('\n');
    },
    render_form_data: (forms) => {
        var form_result = [];
        var result = [];
        result.push('\n---\n');
        var header = '### SITE FORMS \n\n';
        return (header + result.join('\n').trim());
    },
    doc_headers: (data) => {
        var header = '\n\n';
        header += href + '\n\n';
        header += '# ' + document.title + '\n\n';
        header += '---------------------------\n';
        return header;
    },
    get_site_meta_tags: (() => {
        var result = [];
        var meta = document.querySelectorAll('head meta');
        meta.forEach(function (node) {
            var row = [];
            var attrs = node.attributes;
            for (var attr of attrs) {
                row.push('' + attr.name + '__' + attr.value + '');
            }
            result.push('-  ' + row.join(' || ') + '\n');
        });
        var header = '### SITE META TAGS';
        return '\n\n' + header + '\n\n ' + result.join('\n') + '\n\n';
    })
}