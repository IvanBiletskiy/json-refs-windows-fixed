!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.JsonRefs=e()}}(function(){return function e(r,t,n){function o(a,u){if(!t[a]){if(!r[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(i)return i(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var c=t[a]={exports:{}};r[a][0].call(c.exports,function(e){var t=r[a][1][e];return o(t?t:e)},c,c.exports,e,r,t,n)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,r,t){"use strict";function n(e,r){return"Undefined"===r?"undefined"==typeof e:Object.prototype.toString.call(e)==="[object "+r+"]"}var o=e("uri-js");r.exports.isJsonReference=function(e){return n(e,"Object")&&n(e.$ref,"String")&&n(o.parse(e.$ref).error,"Undefined")}},{"uri-js":7}],2:[function(e,r,t){var n=function(){function e(e){throw new RangeError(D[e])}function r(e,r){for(var t=e.length,n=[];t--;)n[t]=r(e[t]);return n}function t(e,t){var n=e.split("@"),o="";n.length>1&&(o=n[0]+"@",e=n[1]),e=e.replace(A,".");var i=e.split("."),a=r(i,t).join(".");return o+a}function n(e){for(var r,t,n=[],o=0,i=e.length;i>o;)r=e.charCodeAt(o++),r>=55296&&56319>=r&&i>o?(t=e.charCodeAt(o++),56320==(64512&t)?n.push(((1023&r)<<10)+(1023&t)+65536):(n.push(r),o--)):n.push(r);return n}function o(e){return r(e,function(e){var r="";return e>65535&&(e-=65536,r+=T(e>>>10&1023|55296),e=56320|1023&e),r+=T(e)}).join("")}function i(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:l}function a(e,r){return e+22+75*(26>e)-((0!=r)<<5)}function u(e,r,t){var n=0;for(e=t?w(e/m):e>>1,e+=w(e/r);e>R*v>>1;n+=l)e=w(e/R);return w(n+(R+1)*e/(e+C))}function s(r){var t,n,a,s,p,c,f,h,C,m,O=[],x=r.length,A=0,D=y,R=g;for(n=r.lastIndexOf(S),0>n&&(n=0),a=0;n>a;++a)r.charCodeAt(a)>=128&&e("not-basic"),O.push(r.charCodeAt(a));for(s=n>0?n+1:0;x>s;){for(p=A,c=1,f=l;s>=x&&e("invalid-input"),h=i(r.charCodeAt(s++)),(h>=l||h>w((d-A)/c))&&e("overflow"),A+=h*c,C=R>=f?E:f>=R+v?v:f-R,!(C>h);f+=l)m=l-C,c>w(d/m)&&e("overflow"),c*=m;t=O.length+1,R=u(A-p,t,0==p),w(A/t)>d-D&&e("overflow"),D+=w(A/t),A%=t,O.splice(A++,0,D)}return o(O)}function p(r){var t,o,i,s,p,c,f,h,C,m,O,x,A,D,R,I=[];for(r=n(r),x=r.length,t=y,o=0,p=g,c=0;x>c;++c)O=r[c],128>O&&I.push(T(O));for(i=s=I.length,s&&I.push(S);x>i;){for(f=d,c=0;x>c;++c)O=r[c],O>=t&&f>O&&(f=O);for(A=i+1,f-t>w((d-o)/A)&&e("overflow"),o+=(f-t)*A,t=f,c=0;x>c;++c)if(O=r[c],t>O&&++o>d&&e("overflow"),O==t){for(h=o,C=l;m=p>=C?E:C>=p+v?v:C-p,!(m>h);C+=l)R=h-m,D=l-m,I.push(T(a(m+R%D,0))),h=w(R/D);I.push(T(a(h,0))),p=u(o,A,i==s),o=0,++i}++o,++t}return I.join("")}function c(e){return t(e,function(e){return O.test(e)?s(e.slice(4).toLowerCase()):e})}function f(e){return t(e,function(e){return x.test(e)?"xn--"+p(e):e})}var h,d=2147483647,l=36,E=1,v=26,C=38,m=700,g=72,y=128,S="-",O=/^xn--/,x=/[^\x20-\x7E]/,A=/[\x2E\u3002\uFF0E\uFF61]/g,D={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},R=l-E,w=Math.floor,T=String.fromCharCode;return h={version:"1.3.2",ucs2:{decode:n,encode:o},decode:s,encode:p,toASCII:f,toUnicode:c}}();"undefined"==typeof COMPILED&&"undefined"!=typeof r&&(r.exports=n)},{}],3:[function(e,r,t){e("./schemes/http"),e("./schemes/urn"),e("./schemes/mailto")},{"./schemes/http":4,"./schemes/mailto":5,"./schemes/urn":6}],4:[function(e,r,t){if("undefined"==typeof COMPILED&&"undefined"==typeof n&&"function"==typeof e)var n=e("../uri");n.SCHEMES.http=n.SCHEMES.https={domainHost:!0,parse:function(e,r){return e.host||(e.error=e.error||"HTTP URIs must have a host."),e},serialize:function(e,r){return(e.port===("https"!==String(e.scheme).toLowerCase()?80:443)||""===e.port)&&(e.port=void 0),e.path||(e.path="/"),e}}},{"../uri":7}],5:[function(e,r,t){if("undefined"==typeof COMPILED&&"undefined"==typeof n&&"function"==typeof e)var n=e("../uri"),o=e("../punycode");!function(){function e(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];if(e.length>1){e[0]=e[0].slice(0,-1);for(var t=e.length-1,n=1;t>n;++n)e[n]=e[n].slice(1,-1);return e[t]=e[t].slice(1),e.join("")}return e[0]}function r(e){return"(?:"+e+")"}function t(e){return e.toUpperCase()}function i(e){var r=n.pctDecChars(e);return r.match(_)?r:e}function a(e){return void 0!==e&&null!==e?e instanceof Array&&!e.callee?e:"number"!=typeof e.length||e.split||e.setInterval||e.call?[e]:Array.prototype.slice.call(e):[]}var u={},s=n.IRI_SUPPORT,p="[A-Za-z0-9\\-\\.\\_\\~"+(s?"\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF":"")+"]",c="[0-9A-Fa-f]",f=r(r("%[EFef]"+c+"%"+c+c+"%"+c+c)+"|"+r("%[89A-Fa-f]"+c+"%"+c+c)+"|"+r("%"+c+c)),h="[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",d="[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",l=e(d,'[\\"\\\\]'),E=r(h+"+"+r("\\."+h+"+")+"*"),v=r("\\\\"+l),C=r(d+"|"+v),m=r('\\"'+C+'*\\"'),g="[\\x21-\\x5A\\x5E-\\x7E]",y="[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]",S=r(p+"|"+f+"|"+y),O=r(E+"|\\["+g+"*\\]"),x=r(E+"|"+m),A=r(x+"\\@"+O),D=r(A+r("\\,"+A)+"*"),R=r(S+"*"),w=R,T=r(R+"\\="+w),I=r(T+r("\\&"+T)+"*"),F=r("\\?"+I),_=(n.VALIDATE_SUPPORT&&new RegExp("^mailto\\:"+D+"?"+F+"?$"),new RegExp(p,"g")),N=new RegExp(f,"g"),b=new RegExp(e("[^]",h,"[\\.]",'[\\"]',l),"g"),P=new RegExp(e("[^]",h,"[\\.]","[\\[]",g,"[\\]]"),"g"),U=new RegExp(e("[^]",p,y),"g"),H=U,q=n.VALIDATE_SUPPORT&&new RegExp("^"+D+"$"),j=n.VALIDATE_SUPPORT&&new RegExp("^"+I+"$");n.SCHEMES.mailto={parse:function(e,r){n.VALIDATE_SUPPORT&&!e.error&&(e.path&&!q.test(e.path)?e.error="Email address is not valid":e.query&&!j.test(e.query)&&(e.error="Header fields are invalid"));var t=e.to=e.path?e.path.split(","):[];if(e.path=void 0,e.query){for(var i=!1,a={},u=e.query.split("&"),s=0,p=u.length;p>s;++s){var c=u[s].split("=");switch(c[0]){case"to":for(var f=c[1].split(","),h=0,d=f.length;d>h;++h)t.push(f[h]);break;case"subject":e.subject=n.unescapeComponent(c[1],r);break;case"body":e.body=n.unescapeComponent(c[1],r);break;default:i=!0,a[n.unescapeComponent(c[0],r)]=n.unescapeComponent(c[1],r)}}i&&(e.headers=a)}e.query=void 0;for(var s=0,p=t.length;p>s;++s){var l=t[s].split("@");if(l[0]=n.unescapeComponent(l[0]),"undefined"==typeof o||r.unicodeSupport)l[1]=n.unescapeComponent(l[1],r).toLowerCase();else try{l[1]=o.toASCII(n.unescapeComponent(l[1],r).toLowerCase())}catch(E){e.error=e.error||"Email address's domain name can not be converted to ASCII via punycode: "+E}t[s]=l.join("@")}return e},serialize:function(e,r){var s=a(e.to);if(s){for(var p=0,c=s.length;c>p;++p){var f=String(s[p]),h=f.lastIndexOf("@"),d=f.slice(0,h),l=f.slice(h+1);if(d=d.replace(N,i).replace(N,t).replace(b,n.pctEncChar),"undefined"!=typeof o)try{l=r.iri?o.toUnicode(l):o.toASCII(n.unescapeComponent(l,r).toLowerCase())}catch(E){e.error=e.error||"Email address's domain name can not be converted to "+(r.iri?"Unicode":"ASCII")+" via punycode: "+E}else l=l.replace(N,i).toLowerCase().replace(N,t).replace(P,n.pctEncChar);s[p]=d+"@"+l}e.path=s.join(",")}var v=e.headers=e.headers||{};e.subject&&(v.subject=e.subject),e.body&&(v.body=e.body);var C=[];for(var m in v)v[m]!==u[m]&&C.push(m.replace(N,i).replace(N,t).replace(U,n.pctEncChar)+"="+v[m].replace(N,i).replace(N,t).replace(H,n.pctEncChar));return C.length&&(e.query=C.join("&")),e}}}()},{"../punycode":2,"../uri":7}],6:[function(e,r,t){if("undefined"==typeof COMPILED&&"undefined"==typeof n&&"function"==typeof e)var n=e("../uri");!function(){var e=n.pctEncChar,r="(?:[0-9A-Za-z][0-9A-Za-z\\-]{1,31})",t="(?:\\%[0-9A-Fa-f]{2})",o="[0-9A-Za-z\\(\\)\\+\\,\\-\\.\\:\\=\\@\\;\\$\\_\\!\\*\\'\\/\\?\\#]",i="(?:(?:"+t+"|"+o+")+)",a=new RegExp("^urn\\:("+r+")$"),u=new RegExp("^("+r+")\\:("+i+")$"),s=/^([^\:]+)\:(.*)/,p=/[\x00-\x20\\\"\&\<\>\[\]\^\`\{\|\}\~\x7F-\xFF]/g,c=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;n.SCHEMES.urn={parse:function(e,r){var t,o,i=e.path.match(u);return i||(r.tolerant||(e.error=e.error||"URN is not strictly valid."),i=e.path.match(s)),i?(t="urn:"+i[1].toLowerCase(),o=n.SCHEMES[t],o||(o=n.SCHEMES[t]={parse:function(e,r){return e},serialize:n.SCHEMES.urn.serialize}),e.scheme=t,e.path=i[2],e=o.parse(e,r)):e.error=e.error||"URN can not be parsed.",e},serialize:function(r,t){var n,o=r.scheme||t.scheme;if(o&&"urn"!==o){var n=o.match(a);n||(n=["urn:"+o,o]),r.scheme="urn",r.path=n[1]+":"+(r.path?r.path.replace(p,e):"")}return r}},n.SCHEMES["urn:uuid"]={parse:function(e,r){return r.tolerant||e.path&&e.path.match(c)||(e.error=e.error||"UUID is not valid."),e},serialize:function(e,r){return r.tolerant||e.path&&e.path.match(c)?e.path=(e.path||"").toLowerCase():e.scheme=void 0,n.SCHEMES.urn.serialize(e,r)}}}()},{"../uri":7}],7:[function(e,r,t){var n=!1,o=!0,i=!0,a=function(){function e(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];if(e.length>1){e[0]=e[0].slice(0,-1);for(var t=e.length-1,n=1;t>n;++n)e[n]=e[n].slice(1,-1);return e[t]=e[t].slice(1),e.join("")}return e[0]}function r(e){return"(?:"+e+")"}function t(t){var n="[A-Za-z]",o="[0-9]",a=e(o,"[A-Fa-f]"),u=r(r("%[EFef]"+a+"%"+a+a+"%"+a+a)+"|"+r("%[89A-Fa-f]"+a+"%"+a+a)+"|"+r("%"+a+a)),s="[\\:\\/\\?\\#\\[\\]\\@]",p="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",c=e(s,p),f=t?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]",h=t?"[\\uE000-\\uF8FF]":"[]",d=e(n,o,"[\\-\\.\\_\\~]",f),l=r(n+e(n,o,"[\\+\\-\\.]")+"*"),E=r(r(u+"|"+e(d,p,"[\\:]"))+"*"),v=r(r("25[0-5]")+"|"+r("2[0-4]"+o)+"|"+r("1"+o+o)+"|"+r("[1-9]"+o)+"|"+o),C=r(v+"\\."+v+"\\."+v+"\\."+v),m=r(a+"{1,4}"),g=(r(r(m+"\\:"+m)+"|"+C),r(e(d,p,"[\\:]")+"+")),y=r("v"+a+"+\\."+e(d,p,"[\\:]")+"+"),S=r("\\["+r(g+"|"+y)+"\\]"),O=r(r(u+"|"+e(d,p))+"*"),x=r(S+"|"+C+"(?!"+O+")|"+O),A=r(o+"*"),D=r(r(E+"@")+"?"+x+r("\\:"+A)+"?"),R=r(u+"|"+e(d,p,"[\\:\\@]")),w=r(R+"*"),T=r(R+"+"),I=r(r(u+"|"+e(d,p,"[\\@]"))+"+"),F=r(r("\\/"+w)+"*"),_=r("\\/"+r(T+F)+"?"),N=r(I+F),b=r(T+F),P="(?!"+R+")",U=(r(F+"|"+_+"|"+N+"|"+b+"|"+P),r(r(R+"|"+e("[\\/\\?]",h))+"*")),H=r(r(R+"|[\\/\\?]")+"*"),q=r(r("\\/\\/"+D+F)+"|"+_+"|"+b+"|"+P),j=r(l+"\\:"+q+r("\\?"+U)+"?"+r("\\#"+H)+"?"),L=r(r("\\/\\/"+D+F)+"|"+_+"|"+N+"|"+P),M=r(L+r("\\?"+U)+"?"+r("\\#"+H)+"?"),$=(r(j+"|"+M),r(l+"\\:"+q+r("\\?"+U)+"?"),"^("+l+")\\:"+r(r("\\/\\/("+r("("+E+")@")+"?("+x+")"+r("\\:("+A+")")+"?)")+"?("+F+"|"+_+"|"+b+"|"+P+")")+r("\\?("+U+")")+"?"+r("\\#("+H+")")+"?$"),z="^(){0}"+r(r("\\/\\/("+r("("+E+")@")+"?("+x+")"+r("\\:("+A+")")+"?)")+"?("+F+"|"+_+"|"+N+"|"+P+")")+r("\\?("+U+")")+"?"+r("\\#("+H+")")+"?$";"^("+l+")\\:"+r(r("\\/\\/("+r("("+E+")@")+"?("+x+")"+r("\\:("+A+")")+"?)")+"?("+F+"|"+_+"|"+b+"|"+P+")")+r("\\?("+U+")")+"?$","^"+r("\\#("+H+")")+"?$","^"+r("("+E+")@")+"?("+x+")"+r("\\:("+A+")")+"?$";return{URI_REF:i&&new RegExp("("+$+")|("+z+")"),NOT_SCHEME:new RegExp(e("[^]",n,o,"[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(e("[^\\%\\:]",d,p),"g"),NOT_HOST:new RegExp(e("[^\\%]",d,p),"g"),NOT_PATH:new RegExp(e("[^\\%\\/\\:\\@]",d,p),"g"),NOT_PATH_NOSCHEME:new RegExp(e("[^\\%\\/\\@]",d,p),"g"),NOT_QUERY:new RegExp(e("[^\\%]",d,p,"[\\:\\@\\/\\?]",h),"g"),NOT_FRAGMENT:new RegExp(e("[^\\%]",d,p,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(e("[^]",d,p),"g"),UNRESERVED:new RegExp(d,"g"),OTHER_CHARS:new RegExp(e("[^\\%]",d,c),"g"),PCT_ENCODED:new RegExp(u,"g")}}function n(e){var r,t=e.charCodeAt(0);return r=16>t?"%0"+t.toString(16).toUpperCase():128>t?"%"+t.toString(16).toUpperCase():2048>t?"%"+(t>>6|192).toString(16).toUpperCase()+"%"+(63&t|128).toString(16).toUpperCase():"%"+(t>>12|224).toString(16).toUpperCase()+"%"+(t>>6&63|128).toString(16).toUpperCase()+"%"+(63&t|128).toString(16).toUpperCase()}function a(e){for(var r,t,n,o="",i=0,a=e.length;a>i;)r=parseInt(e.substr(i+1,2),16),128>r?(o+=String.fromCharCode(r),i+=3):r>=194&&224>r?(a-i>=6?(t=parseInt(e.substr(i+4,2),16),o+=String.fromCharCode((31&r)<<6|63&t)):o+=e.substr(i,6),i+=6):r>=224?(a-i>=9?(t=parseInt(e.substr(i+4,2),16),n=parseInt(e.substr(i+7,2),16),o+=String.fromCharCode((15&r)<<12|(63&t)<<6|63&n)):o+=e.substr(i,9),i+=9):(o+=e.substr(i,3),i+=3);return o}function s(e){return void 0===e?"undefined":null===e?"null":Object.prototype.toString.call(e).split(" ").pop().split("]").shift().toLowerCase()}function p(e){return e.toUpperCase()}function c(e,r){function t(e){var t=a(e);return t.match(r.UNRESERVED)?t:e}return e.scheme&&(e.scheme=String(e.scheme).replace(r.PCT_ENCODED,t).toLowerCase().replace(r.NOT_SCHEME,"")),void 0!==e.userinfo&&(e.userinfo=String(e.userinfo).replace(r.PCT_ENCODED,t).replace(r.NOT_USERINFO,n).replace(r.PCT_ENCODED,p)),void 0!==e.host&&(e.host=String(e.host).replace(r.PCT_ENCODED,t).toLowerCase().replace(r.NOT_HOST,n).replace(r.PCT_ENCODED,p)),void 0!==e.path&&(e.path=String(e.path).replace(r.PCT_ENCODED,t).replace(e.scheme?r.NOT_PATH:r.NOT_PATH_NOSCHEME,n).replace(r.PCT_ENCODED,p)),void 0!==e.query&&(e.query=String(e.query).replace(r.PCT_ENCODED,t).replace(r.NOT_QUERY,n).replace(r.PCT_ENCODED,p)),void 0!==e.fragment&&(e.fragment=String(e.fragment).replace(r.PCT_ENCODED,t).replace(r.NOT_FRAGMENT,n).replace(r.PCT_ENCODED,p)),e}function f(e,r){void 0===r&&(r={});var t,n,s=o&&r.iri!==!1?O:S,p=!1,f={};if("suffix"===r.reference&&(e=(r.scheme?r.scheme+":":"")+"//"+e),i?(t=e.match(s.URI_REF),t&&(t=t[1]?t.slice(1,10):t.slice(10,19)),t||(p=!0,r.tolerant||(f.error=f.error||"URI is not strictly valid."),t=e.match(x))):t=e.match(x),t){if(T?(f.scheme=t[1],f.userinfo=t[3],f.host=t[4],f.port=parseInt(t[5],10),f.path=t[6]||"",f.query=t[7],f.fragment=t[8],isNaN(f.port)&&(f.port=t[5])):(f.scheme=t[1]||void 0,f.userinfo=-1!==e.indexOf("@")?t[3]:void 0,f.host=-1!==e.indexOf("//")?t[4]:void 0,f.port=parseInt(t[5],10),f.path=t[6]||"",f.query=-1!==e.indexOf("?")?t[7]:void 0,f.fragment=-1!==e.indexOf("#")?t[8]:void 0,isNaN(f.port)&&(f.port=e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?t[4]:void 0)),void 0!==f.scheme||void 0!==f.userinfo||void 0!==f.host||void 0!==f.port||f.path||void 0!==f.query?void 0===f.scheme?f.reference="relative":void 0===f.fragment?f.reference="absolute":f.reference="uri":f.reference="same-document",r.reference&&"suffix"!==r.reference&&r.reference!==f.reference&&(f.error=f.error||"URI is not a "+r.reference+" reference."),n=I[(r.scheme||f.scheme||"").toLowerCase()],!o||"undefined"==typeof u||r.unicodeSupport||n&&n.unicodeSupport)c(f,s);else{if(f.host&&(r.domainHost||n&&n.domainHost))try{f.host=u.toASCII(f.host.replace(s.PCT_ENCODED,a).toLowerCase())}catch(h){f.error=f.error||"Host's domain name can not be converted to ASCII via punycode: "+h}c(f,S)}n&&n.parse&&n.parse(f,r)}else p=!0,f.error=f.error||"URI can not be parsed.";return f}function h(e,r){var t=[];return void 0!==e.userinfo&&(t.push(e.userinfo),t.push("@")),void 0!==e.host&&t.push(e.host),"number"==typeof e.port&&(t.push(":"),t.push(e.port.toString(10))),t.length?t.join(""):void 0}function d(e){for(var r,t=[];e.length;)e.match(A)?e=e.replace(A,""):e.match(D)?e=e.replace(D,"/"):e.match(R)?(e=e.replace(R,"/"),t.pop()):"."===e||".."===e?e="":(r=e.match(w)[0],e=e.slice(r.length),t.push(r));return t.join("")}function l(e,r){void 0===r&&(r={});var t,n,i,s=o&&r.iri?O:S,p=[];if(t=I[(r.scheme||e.scheme||"").toLowerCase()],t&&t.serialize&&t.serialize(e,r),o&&"undefined"!=typeof u&&e.host&&(r.domainHost||t&&t.domainHost))try{e.host=r.iri?u.toUnicode(e.host):u.toASCII(e.host.replace(s.PCT_ENCODED,a).toLowerCase())}catch(f){e.error=e.error||"Host's domain name can not be converted to "+(r.iri?"Unicode":"ASCII")+" via punycode: "+f}return c(e,s),"suffix"!==r.reference&&e.scheme&&(p.push(e.scheme),p.push(":")),n=h(e,r),void 0!==n&&("suffix"!==r.reference&&p.push("//"),p.push(n),e.path&&"/"!==e.path.charAt(0)&&p.push("/")),void 0!==e.path&&(i=e.path,r.absolutePath||t&&t.absolutePath||(i=d(i)),void 0===n&&(i=i.replace(/^\/\//,"/%2F")),p.push(i)),void 0!==e.query&&(p.push("?"),p.push(e.query)),void 0!==e.fragment&&(p.push("#"),p.push(e.fragment)),p.join("")}function E(e,r,t,n){void 0===t&&(t={});var o={};return n||(e=f(l(e,t),t),r=f(l(r,t),t)),t=t||{},!t.tolerant&&r.scheme?(o.scheme=r.scheme,o.userinfo=r.userinfo,o.host=r.host,o.port=r.port,o.path=d(r.path),o.query=r.query):(void 0!==r.userinfo||void 0!==r.host||void 0!==r.port?(o.userinfo=r.userinfo,o.host=r.host,o.port=r.port,o.path=d(r.path),o.query=r.query):(r.path?("/"===r.path.charAt(0)?o.path=d(r.path):(void 0===e.userinfo&&void 0===e.host&&void 0===e.port||e.path?e.path?o.path=e.path.slice(0,e.path.lastIndexOf("/")+1)+r.path:o.path=r.path:o.path="/"+r.path,o.path=d(o.path)),o.query=r.query):(o.path=e.path,void 0!==r.query?o.query=r.query:o.query=e.query),o.userinfo=e.userinfo,o.host=e.host,o.port=e.port),o.scheme=e.scheme),o.fragment=r.fragment,o}function v(e,r,t){return l(E(f(e,t),f(r,t),t,!0),t)}function C(e,r){return"string"==typeof e?e=l(f(e,r),r):"object"===s(e)&&(e=f(l(e,r),r)),e}function m(e,r,t){return"string"==typeof e?e=l(f(e,t),t):"object"===s(e)&&(e=l(e,t)),"string"==typeof r?r=l(f(r,t),t):"object"===s(r)&&(r=l(r,t)),e===r}function g(e,r){return e&&e.toString().replace(o&&r&&r.iri?O.ESCAPE:S.ESCAPE,n)}function y(e,r){return e&&e.toString().replace(o&&r&&r.iri?O.PCT_ENCODED:S.PCT_ENCODED,a)}var S=t(!1),O=o?t(!0):void 0,x=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i,A=/^\.\.?\//,D=/^\/\.(\/|$)/,R=/^\/\.\.(\/|$)/,w=/^\/?(?:.|\n)*?(?=\/|$)/,T=void 0==="".match(/(){0}/)[1],I={};return{IRI_SUPPORT:o,VALIDATE_SUPPORT:i,pctEncChar:n,pctDecChars:a,SCHEMES:I,parse:f,_recomposeAuthority:h,removeDotSegments:d,serialize:l,resolveComponents:E,resolve:v,normalize:C,equal:m,escapeComponent:g,unescapeComponent:y}}();if(!n&&"undefined"!=typeof r&&"function"==typeof e){var u=e("./punycode");r.exports=a,e("./schemes")}},{"./punycode":2,"./schemes":3}]},{},[1])(1)});