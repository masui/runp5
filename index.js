function loadScript (url) {
    return new Promise((resolve) => {
	const script = document.createElement('script')
	script.src = url
	script.onload = resolve
	document.body.appendChild(script)
    })
}

function loadStyle (url) {
    return new Promise((resolve) => {
	const script = document.createElement('link')
	script.rel = "stylesheet"
	script.type = "text/css"
	script.href = url
	script.onload = resolve
	document.body.appendChild(script)
    })
}

async function loadAllScripts (urls) {
    for (let url of urls) {
	await loadScript(url)
    }
}

async function loadAllStyles (urls) {
    for (let url of urls) {
	await loadStyle(url)
    }
}

async function loadAllScripts2 (codes) {
    for (let code of codes) {
	console.log(`https://Scrapbox.io/api/code/${project}/${code}`)
	await loadScript(`https://Scrapbox.io/api/code/${project}/${code}`)
    }
}

async function loadAllStyles2 (styles) {
    for (let style of styles) {
	await loadStyle(`https://Scrapbox.io/api/code/${project}/${style}`)
    }
}
$(function(){
    let args = {}
    document.location.search.substring(1).split('&').forEach((s) => {
	let [name, value] = s.split('=')
	if(name != ''){
	    args[name] = decodeURIComponent(value)
	}
    })
    xxx = args;
    alert(Object.keys(args).length);
    if(Object.keys(args).length != 0){
	$('body').children().remove();

    const codelist = args['code']
    const csslist = args['css']
    const p = args['p']
    const clist = args['c']
    const slist = args['s']
    
    console.log('codelist', codelist)
    
    if (codelist) {
	let urls = codelist.split(/,/)
	loadAllScripts(urls)
    }
    if (csslist) {
	let urls = csslist.split(/,/)
	loadAllStyles(urls)
    }
    if (p) {
	project = p
    }
    if (p && clist) {
	let codes = clist.split(/,/)
	loadAllScripts2(codes)
    }
    if (p && slist) {
	let styles = slist.split(/,/)
	loadAllStyles2(styles)
    }
    }
})
