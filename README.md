### B-menu:Bootstrap contextMenu
>    一款bootstrap(v3.2.0)的小"插件"    
>    用于网页各种dom右键菜单

### 使用
在使用前首先需要加载bootstrap(v3.2.0)的css文件，然后再引入本JS脚本

#### 使用方法：
1.初始化
```
var menu1 = bmenu.init([
{
	text: '这个是菜单的文字，如果需要分隔符，则输入"---"',
	icon: '菜单的图标，如：glyphicon-flash（参考：http://v3.bootcss.com/components/#glyphicons）',
	disabled: '禁用菜单，为true|false',
	callback: function(){
		console.log('这里是菜单点击的回调事件');
	},
	menu: ['子菜单列表，格式如同']
}
]);
```
2.绑定右键菜单
```
bmenu.bind(menu1, document);
```

#### 或者更直接
```
bmenu.bind(bmenu.init([
{
	text: 'Hello!',
	disabled: true
},{
	text: '---'
},{
	text: 'B-Menu!',
	callback: function(){
		alert('BootStrap contextMenu!');
	}
}
]), document.getElementById('bb'));
```

### DEMO

	别问我为何起了这么一个不入耳的名字，因为我实在不知道起啥好了～

[点击查看Demo](http://ursb.org/bootstrap/2014/11/09/contextmenu.html)