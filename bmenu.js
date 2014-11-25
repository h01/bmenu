//	@name		B-menu::bootstrap右键菜单扩展
//	@author		Holger
//	@github		https://github.com/h01/bmenu
//	@myblog		http://ursb.org/
//	@modify		2014/11/17

// 注入CSS样式
document.write('<style type="text/css">.bmenu,.dropdown-menu {background: rgba(255, 255, 255, 0.9);z-index: 99999}.bmenu a{outline:none;}.bmenu .glyphicon{width:15px;height:15px;margin-right:5px;margin-top:2px}.bmenu li a{padding:3px 10px}.bmenu li a:hover{color:#ffffff;text-shadow:rgba(0,0,0,0.4) .5px .5px .5px;background:-moz-linear-gradient(top,rgba(22,145,208,0.66),rgba(14,110,169,0.8));background:-o-linear-gradient(top,rgba(22,145,208,0.66),rgba(14,110,169,0.8));background:-ms-linear-gradient(top,rgba(22,145,208,0.66),rgba(14,110,169,0.8));background:-webkit-gradient(linear,left top,left bottom,color-stop(0,rgba(22,145,208,0.66)),color-stop(1,rgba(14,110,169,0.8)))}.bmenu .dropdown-submenu{position:relative}.bmenu .dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px;border-radius:0 6px 6px 6px}.bmenu .dropdown-submenu:hover>.dropdown-menu{display:block}.bmenu .dropdown-submenu.pull-left{float:none}.bmenu .dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}</style>');
var bmenu = {
	init: function(menus){
		// 1.创建最外层UL
		var _menu = this.createObj('ul', {
			class: 'dropdown-menu multi-level bmenu',
			role: 'menu',
			'aria-labelledby': "dropdownMenu"
		});
		// 2.创建菜单列表li
		var _menu_li = this.makeMenus(menus);
		for (var i = 0; i < _menu_li.length; i++) {
			_menu.appendChild(_menu_li[i]);
		};
		document.body.appendChild(_menu);
		return _menu;
	},
	show: function(menu){
		// 显示菜单
		menu.style.display = 'block';
	},
	hide: function(){
		// 隐藏所有菜单
		var _mns = document.getElementsByClassName("dropdown-menu multi-level bmenu");
		for (var i = 0; i < _mns.length; i++) {
			_mns[i].style.display = 'none';
		};
	},
	bind: function(menu, obj){
		// 绑定在obj对象
		var obj = obj || document;
		obj.onclick = function(e){
			if (e.button == 0) {
				bmenu.hide();
			};
		};
		obj.oncontextmenu = function(e){
			var e = e || window.event;
			var i = 0;
			var _mns = document.getElementsByClassName("dropdown-menu multi-level bmenu");
			for (var ii = 0; ii < _mns.length; ii++) {
				if (_mns[ii].style.display == "block") {
					i ++;
				};
			};
			menu.style.top = e.pageY + "px";
			menu.style.left = e.pageX + "px";
			if (i == 0) {
				bmenu.show(menu);
			}
			return false;
		};
	},
	createObj: function(objName, options){
		// 创建对象，使用方法例如：
		// this.make("a", {href:"http://ursb.org", id:"ok"})
		// 如果key中有特殊字符，如-，则要引号引起来
		var options = options || {};
		var obj = document.createElement(objName);
		for (var o in options){
			obj.setAttribute(o, options[o]);
		};
		return obj;
	},
	makeMenus: function(menus){
		// 把menus转换为html
		var arr = [];
		for (var i = 0; i < menus.length; i++) {
			// menus[i] = {text:'',callback:'',disabled:'',menu:''}
			// 1.创建li对象
			var lis = this.createObj('li');
			// 2.判断是否有子菜单
			if (menus[i].menu) {
				lis.setAttribute("class", "dropdown-submenu");
				var __a = this.createObj('a', {
					tabindex: '-1',
					href: 'javascript:;'
				});
				var __i_l = this.createObj('i', {
					class: 'pull-left glyphicon ' + (menus[i].icon || '')
				});
				var __i_r = this.createObj('i', {
					class: 'glyphicon glyphicon-chevron-right pull-right'
				});
				__a.appendChild(__i_l);
				__a.appendChild(__i_r);
				__a.innerHTML += menus[i].text;
				lis.appendChild(__a);

				var __ul = this.createObj('ul', {
					class: 'dropdown-menu'
				});
				var __lis = this.makeMenus(menus[i].menu);
				for (var ii = 0; ii < __lis.length; ii++) {
					__ul.appendChild(__lis[ii]);
				};
				lis.appendChild(__ul);
			}else{
				// 3. 是否禁用
				if (menus[i].disabled) {
					lis.setAttribute('class', 'disabled');
				};
				// 4. 是否有回调
				if (menus[i].callback && !menus[i].disabled) {
					lis.onclick = menus[i].callback;
				};
				// 5. 是否是分隔符
				if (menus[i].text == "---") {
					lis.appendChild(this.createObj('li', {
						class: 'divider',
						style: 'margin: 4px 0px;'
					}));
				}else{
					var _icon = this.createObj('i', {
						class: 'pull-left glyphicon ' + (menus[i].icon || '')
					});
					// 1.2 创建链接文本
					var _link = this.createObj('a', {
						tabindex: '-1',
						href: 'javascript:;'
					});
					// 1.3 添加整合
					_link.appendChild(_icon);
					_link.innerHTML += menus[i].text;
					lis.appendChild(_link);
				}
			};
			arr.push(lis);
		};
		return arr;
	}
};
console.log('[*]%c Loading the b-menu success !', 'color:#09F');
console.log('[+] Join me: https://github.com/h01/bmenu');