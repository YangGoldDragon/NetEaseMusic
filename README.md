# NetEaseMusic
## 项目：网易云音乐（移动端）
## 技术栈：html5 + css3 + jQuery
## 预览地址：https://yanggolddragon.github.io/NetEaseMusic/src/index.html
## 二维码扫描：
![](./src/images/二维码.png)
## 说明:
#### 1.项目技术栈使用了jQuery框架。
#### 2.该项目只针对移动端，未做PC端。
#### 3.由于网易云音乐的数据接口被禁用了，即使没被禁用也不稳定，大概API的有效时间只有24小时，所以项目里面的数据都是通过chrome调试台查找，然后install在项目里面，使用JSON文件来模拟数据库从而获取歌曲信息、封面图片等。
#### 4.autoplay不支持移动端，所以进入页面时，歌曲无法自动播放，必须添加事件。
#### 5.animtaion-play-state不支持移动端，无法做到暂停动画和继续动画的效果。
#### 6.滚动歌词功能的实现方法是通过判断audio的curretTime在整首歌词的时间范围，来决定translateY的移动距离。
