(function(){var g=Function,l=document,m=Array,n=location,p=Error,q=parseInt,t=String;function u(a,b){return a.display=b}
var v="shift",w="keyCode",x="bind",z="toString",A="propertyIsEnumerable",B="split",C="style",D="apply",E="slice",F="getElementById",G="removed",H="indexOf",I="type",J="length",L="prototype",M="call",N=this,aa=function(a,b){var c=a[B]("."),d=N;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c[J]&&(e=c[v]());)c[J]||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b},O=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof m)return"array";if(a instanceof Object)return b;var c=Object[L][z][M](a);
if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a[J]&&"undefined"!=typeof a.splice&&"undefined"!=typeof a[A]&&!a[A]("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a[M]&&"undefined"!=typeof a[A]&&!a[A]("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a[M])return"object";return b},ba=function(a,b,c){return a[M][D](a[x],arguments)},ca=function(a,b,c){if(!a)throw p();if(2<arguments[J]){var d=m[L][E][M](arguments,
2);return function(){var c=m[L][E][M](arguments);m[L].unshift[D](c,d);return a[D](b,c)}}return function(){return a[D](b,arguments)}},P=function(a,b,c){P=g[L][x]&&-1!=g[L][x][z]()[H]("native code")?ba:ca;return P[D](null,arguments)},Q=function(a,b){function c(){}c.prototype=b[L];a.h=b[L];a.prototype=new c;a.m=function(a,c,f){return b[L][c][D](a,m[L][E][M](arguments,2))}};
g[L].bind=g[L][x]||function(a,b){if(1<arguments[J]){var c=m[L][E][M](arguments,1);c.unshift(this,a);return P[D](null,c)}return P(this,a)};var R=function(a){if(p.captureStackTrace)p.captureStackTrace(this,R);else{var b=p().stack;b&&(this.stack=b)}a&&(this.message=t(a))};Q(R,p);var da=function(a,b){for(var c=a[B]("%s"),d="",e=m[L][E][M](arguments,1);e[J]&&1<c[J];)d+=c[v]()+e[v]();return d+c.join("%s")},S=function(a,b){return a<b?-1:a>b?1:0};var ea=function(a,b){b.unshift(a);R[M](this,da[D](null,b));b[v]()};Q(ea,R);var T=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=m[L][E][M](arguments,2);throw new ea(""+d,e||[]);}};var fa=function(a){fa[" "](a);return a};fa[" "]=function(){};var ga=m[L],ha=ga[H]?function(a,b,c){T(null!=a[J]);return ga[H][M](a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a[J]+c):c;if("string"==typeof a)return"string"==typeof b&&1==b[J]?a[H](b,c):-1;for(;c<a[J];c++)if(c in a&&a[c]===b)return c;return-1};var U;t:{var ia=N.navigator;if(ia){var ja=ia.userAgent;if(ja){U=ja;break t}}U=""};var ka=-1!=U[H]("Opera")||-1!=U[H]("OPR"),V=-1!=U[H]("Trident")||-1!=U[H]("MSIE"),W=-1!=U[H]("Gecko")&&-1==U.toLowerCase()[H]("webkit")&&!(-1!=U[H]("Trident")||-1!=U[H]("MSIE")),la=-1!=U.toLowerCase()[H]("webkit"),ma=function(){var a=N.document;return a?a.documentMode:void 0},na=function(){var a="",b;if(ka&&N.opera)return a=N.opera.version,"function"==O(a)?a():a;W?b=/rv\:([^\);]+)(\)|;)/:V?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:la&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(U))?a[1]:"");return V&&(b=ma(),
b>parseFloat(a))?t(b):a}(),oa={},X=function(a){var b;if(!(b=oa[a])){b=0;for(var c=t(na).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")[B]("."),d=t(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")[B]("."),e=Math.max(c[J],d[J]),f=0;0==b&&f<e;f++){var k=c[f]||"",h=d[f]||"",y=RegExp("(\\d*)(\\D*)","g"),r=RegExp("(\\d*)(\\D*)","g");do{var s=y.exec(k)||["","",""],K=r.exec(h)||["","",""];if(0==s[0][J]&&0==K[0][J])break;b=S(0==s[1][J]?0:q(s[1],10),0==K[1][J]?0:q(K[1],10))||S(0==s[2][J],0==K[2][J])||S(s[2],K[2])}while(0==b)}b=
oa[a]=0<=b}return b},pa=N.document,qa=pa&&V?ma()||("CSS1Compat"==pa.compatMode?q(na,10):5):void 0;var ra;(ra=!V)||(ra=V&&9<=qa);var sa=ra,ta=V&&!X("9");!la||X("528");W&&X("1.9b")||V&&X("8")||ka&&X("9.5")||la&&X("528");W&&!X("8")||V&&X("9");var ua=function(a,b){this.type=a;this.a=this.b=b};ua[L].f=function(){};var Y=function(a,b){ua[M](this,a?a[I]:"");this.g=this.a=this.b=null;if(a){this.type=a[I];this.b=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&W)try{fa(c.nodeName)}catch(d){}this.g=a;a.defaultPrevented&&this.f()}};Q(Y,ua);Y[L].f=function(){Y.h.f[M](this);var a=this.g;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,ta)try{if(a.ctrlKey||112<=a[w]&&123>=a[w])a.keyCode=-1}catch(b){}};var va="closure_listenable_"+(1E6*Math.random()|0),wa=0;var xa=function(a,b,c,d,e){this.c=a;this.proxy=null;this.src=b;this.type=c;this.d=!!d;this.a=e;++wa;this.removed=this.e=!1},ya=function(a){a.removed=!0;a.c=null;a.proxy=null;a.src=null;a.a=null};var za=function(a){this.src=a;this.a={};this.b=0};var Aa="closure_lm_"+(1E6*Math.random()|0),Ba={},Ca=0,Z=function(a,b,c,d,e){if("array"==O(b))for(var f=0;f<b[J];f++)Z(a,b[f],c,d,e);else if(c=Da(c),a&&a[va])a.listen(b,c,d,e);else{f=c;if(!b)throw p("Invalid event type");c=!!d;var k=Ea(a);k||(a[Aa]=k=new za(a));var h=k,y=b[z](),k=h.a[y];k||(k=h.a[y]=[],h.b++);var r;n:{for(r=0;r<k[J];++r){var s=k[r];if(!s[G]&&s.c==f&&s.d==!!d&&s.a==e)break n}r=-1}-1<r?(d=k[r],d.e=!1):(d=new xa(f,h.src,y,!!d,e),d.e=!1,k.push(d));d.proxy||(e=Fa(),d.proxy=e,e.src=a,e.c=
d,a.addEventListener?a.addEventListener(b[z](),e,c):a.attachEvent(Ga(b[z]()),e),Ca++)}},Fa=function(){var a=Ha,b=sa?function(c){return a[M](b.src,b.c,c)}:function(c){c=a[M](b.src,b.c,c);if(!c)return c};return b},Ga=function(a){return a in Ba?Ba[a]:Ba[a]="on"+a},Ja=function(a,b,c,d){var e=1;if(a=Ea(a))if(b=a.a[b[z]()])for(b=b.concat(),a=0;a<b[J];a++){var f=b[a];f&&f.d==c&&!f[G]&&(e&=!1!==Ia(f,d))}return Boolean(e)},Ia=function(a,b){var c=a.c,d=a.a||a.src;if(a.e&&"number"!=typeof a&&a&&!a[G]){var e=
a.src;if(e&&e[va])e.l(a);else{var f=a[I],k=a.proxy;e.removeEventListener?e.removeEventListener(f,k,a.d):e.detachEvent&&e.detachEvent(Ga(f),k);Ca--;if(f=Ea(e)){var k=a[I],h;if(h=k in f.a){h=f.a[k];var y=ha(h,a),r;if(r=0<=y)T(null!=h[J]),ga.splice[M](h,y,1);h=r}h&&(ya(a),0==f.a[k][J]&&(delete f.a[k],f.b--));0==f.b&&(f.src=null,e[Aa]=null)}else ya(a)}}return c[M](d,b)},Ha=function(a,b){if(a[G])return!0;if(!sa){var c;if(!(c=b))t:{c=["window","event"];for(var d=N,e;e=c[v]();)if(null!=d[e])d=d[e];else{c=
null;break t}c=d}e=c;c=new Y(e,this);d=!0;if(!(0>e[w]||void 0!=e.returnValue)){t:{var f=!1;if(0==e[w])try{e.keyCode=-1;break t}catch(k){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a[I],h=e[J]-1;0<=h;h--)c.a=e[h],d&=Ja(e[h],f,!0,c);for(h=0;h<e[J];h++)c.a=e[h],d&=Ja(e[h],f,!1,c)}return d}return Ia(a,new Y(b,this))},Ea=function(a){a=a[Aa];return a instanceof za?a:null},Ka="__closure_events_fn_"+(1E9*Math.random()>>>0),Da=function(a){T(a,"Listener can not be null.");
if("function"==O(a))return a;T(a.handleEvent,"An object listener must have handleEvent method.");a[Ka]||(a[Ka]=function(b){return a.handleEvent(b)});return a[Ka]};var La=function(){var a=l.createElement("table");a.id="mode_bar";a.innerHTML='<tr><td><a id="show_metadata_mode" href="javascript:void(0);">Show Metadata Cache</a> - </td><td><a id="cache_struct_mode" href="javascript:void(0);">Show Cache Structure</a> - </td><td><a id="purge_cache_mode" href="javascript:void(0);">Purge Cache</a></td></tr>';l.body.insertBefore(a,l[F]("show_metadata"))};
aa("pagespeed.Caches.toggleDetail",function(a){var b=l[F](a+"_summary"),c=l[F](a+"_detail");l[F](a+"_toggle").checked?(u(b[C],"none"),u(c[C],"block")):(u(b[C],"block"),u(c[C],"none"))});var Ma={j:"show_metadata_mode",i:"cache_struct_mode",k:"purge_cache_mode"},$={j:"show_metadata",i:"cache_struct",k:"purge_cache"};La[L].a=function(){var a=n.hash.substr(1);if(""==a)this.show("show_metadata");else{var b;t:{for(b in $)if($[b]==a){b=!0;break t}b=!1}b&&this.show(a)}};
La[L].show=function(a){for(var b in $){var c=$[b];u(l[F](c)[C],c==a?"":"none")}c=l[F](a+"_mode");for(b in Ma){var d=l[F](Ma[b]);d==c?(d[C].textDecoration="underline",d[C].color="darkblue"):(d[C].textDecoration="",d[C].color="")}n.href=n.href[B]("#")[0]+"#"+a};
aa("pagespeed.Caches.Start",function(){Z(window,"load",function(){var a=new La,b=l.createElement("form");b.method="get";b.innerHTML='URL: <input type="text" name="purge" size="110" /><br><input type="submit" value="Purge Individual URL">';var c=l[F]("purge_cache");c.insertBefore(b,c.firstChild);a.a();for(var d in $)Z(l[F](Ma[d]),"click",P(a.show,a,$[d]));Z(window,"hashchange",P(a.a,a))})});})();
