<!DOCTYPE html>
<html>
<body class="stackedit">
  <div class="stackedit__html"><p align="center">
  <a href="http://www.ragga-time.com" target="blank"><img src="http://img.ragga-time.com/NewLogox.png" alt="BeatMusic Logo"></a>
</p>
<h2><a id="BeatMusic_WebAppWebApp_5"></a>BeatMusic: WebApp一款可供音乐人自主上传资源分享音乐的WebApp(包含后台管理系统)</h2>
<p style="color:blue">
<span id="Chinese" style="">简体中文</span><span id="English" style="">English</span>
</p>
<p>Github：<a href="https://github.com/RAGGA-TIME/BeatMusic/">https://github.com/RAGGA-TIME/BeatMusic/</a><br>
An independent upload resources for musicians to share music WebApp (Contains background management system)</p>
<h2><a id="Getting_Started_10"></a>Getting Started</h2>
<pre><code class="prism language-bash"><span class="token function">git</span> clone https://github.com/RAGGA-TIME/BeatMusic.git

<span class="token function">npm</span> <span class="token function">install</span>

development:

<span class="token function">npm</span> run serve

running at http://localhost:8080

product:

<span class="token function">npm</span> run build
</code></pre>
<h2><a id="Online_address_29"></a>Online address</h2>
<blockquote>
<p><a href="http://www.ragga-time.com">http://www.ragga-time.com</a></p>
</blockquote>
<h2><a id="Description_34"></a>Description</h2>
<p>Behance is a very good design website.<br>
This project is restored with reference to the following Ui version. Website users learn to communicate; no business<br>
If there is offense. Contact email 965061947@qq.com I am offline. Thanks to these designers~</p>
<blockquote>
<p>https://www.behance.net/gallery/59973977/Universal-Music-Group</p>
</blockquote>
<p>Other belongs to my personal design</p>
<h2><a id="Features_43"></a>Features</h2>
<p>CP terminal<br>
<img src="http://img.ragga-time.com/First.gif" alt="BeatMusic FirstStep"><br>
log in And Register<br>
<img src="http://img.ragga-time.com/Sencod.gif" alt="BeatMusic SecondStep"></p>
<p>Mobile terminal<br>
<img src="http://img.ragga-time.com/MobileFirst.gif" alt="BeatMusic MobileStep"></p>
<h2><a id="Backstage_management_52"></a>Backstage management</h2>
<img src="http://img.ragga-time.com/Backstage.gif" alt="BeatMusic Backstage">
<h2><a id="Directory_Structure_56"></a>Directory Structure</h2>
<pre><code class="prism language-bash">│  .editorconfig
│  .env.development
│  .gitignore
│  babel.config.js
│  package-lock.json
│  package.json
│  Readme.md
│  vue.config.js
│  
├─public
│  │  4Beat.ico
│  │  index.html
│  │  
│  └─static			// 模拟接口
│      ├─Album				// 专辑模块
│      │      GetFifthAlbum.json
│      │      GetFirstAlbum.json
│      │      GetFourthAlbum.json
│      │      GetMyAlbum.json
│      │      GetSecondAlbum.json
│      │      GetThirdAlbum.json
│      │      SearchAlbum.json
│      │      
│      ├─Audio				// 电台节目模块
│      │      GetRadioShow.json
│      │      
│      ├─Music				// 歌曲模块
│      │      GetFifthMusic.json
│      │      GetFirstMusic.json
│      │      GetFourthMusic.json
│      │      GetMyMusic.json
│      │      GetSecondMusic.json
│      │      GetThirdMusic.json
│      │      SearchMusic.json
│      │      
│      ├─Radio				// 电台模块
│      │      GetFifthRadioAndAudio.json
│      │      GetFirstRadioAndAudio.json
│      │      GetFourthRadioAndAudio.json
│      │      GetMyRadio.json
│      │      GetMyRadioAndAudio.json
│      │      GetSecondRadioAndAudio.json
│      │      GetThirdRadioAndAudio.json
│      │      SearchRadioAndAudio.json
│      │      
│      └─User				// 用户模块
│              FindSelect.json
│              MusiciansLogin.json
│              
└─src
    │  App.vue
    │  main.js
    │  router.js
    │  store.js
    │  
    ├─api
    │      MusicApiManeger.js		//  api管理
    │      MusicHttp.js			//	api封装
    │      
    ├─assets
    │  │  Bus.js		//	事件Bus
    │  │  
    │  ├─font
    │  │      Century Gothic Bold.TTF
    │  │      
    │  ├─icons
    │  │      Album_Background2.png
    │  │      back.png
    │  │      Backstage_About.png
    │  │      Backstage_About2.png
    │  │      Backstage_Album.png
    │  │      Backstage_Album2.png
    │  │      Backstage_AlbumCover.png
    │  │      Backstage_AlbumCover2.png
    │  │      Backstage_Audio.png
    │  │      Backstage_Audio2.png
    │  │      Backstage_Communicate.png
    │  │      Backstage_Communicate2.png
    │  │      Backstage_HeadUrlCover.png
    │  │      Backstage_HeadUrlCover2.png
    │  │      Backstage_Home.png
    │  │      Backstage_Home2.png
    │  │      Backstage_Message.png
    │  │      Backstage_Music.png
    │  │      Backstage_Music2.png
    │  │      Backstage_MusicCover.png
    │  │      Backstage_MusicCover2.png
    │  │      Backstage_next.png
    │  │      Backstage_next2.png
    │  │      Backstage_OnlyPlay.png
    │  │      Backstage_OrderPlay.png
    │  │      Backstage_pause.png
    │  │      Backstage_pause2.png
    │  │      Backstage_play.png
    │  │      Backstage_play2.png
    │  │      Backstage_Radio.png
    │  │      Backstage_Radio2.png
    │  │      Backstage_RadioCover.png
    │  │      Backstage_RadioCover2.png
    │  │      Backstage_RandomPlay.png
    │  │      Backstage_up.png
    │  │      Backstage_up2.png
    │  │      empty.png
    │  │      Home_playlist.png
    │  │      Home_return.png
    │  │      Home_return2.png
    │  │      left.png
    │  │      logo.gif
    │  │      logo.png
    │  │      menu.png
    │  │      menu2.png
    │  │      more.png
    │  │      play.png
    │  │      radio.png
    │  │      right.png
    │  │      search.png
    │  │      Step1.png
    │  │      Step2.png
    │  │      xxx.png
    │  │      
    │  ├─model
    │  │      promiseModel.js
    │  │      
    │  └─scss					//	样式
    │          backStage.scss
    │          gotoBack.scss
    │          mainchanges_animation.scss
    │          mainchanges_main.scss
    │          MainContext.scss
    │          play.scss
    │          playPc.scss
    │          togerher.scss
    │          together_animation.scss
    │          
    ├─components
    │  ├─Backstage		// 后台管理系统结构
    │  │  │  asideBar.vue
    │  │  │  headerBar.vue
    │  │  │  mainBar.vue
    │  │  │  recursiveRouter.vue
    │  │  │  
    │  │  ├─Button			// 按钮组件
    │  │  │      myButton.vue
    │  │  │      myImgUpload.vue
    │  │  │      
    │  │  ├─Input			// 输入框组件
    │  │  │      myInput.vue
    │  │  │      
    │  │  ├─Play			// mini播放器组件
    │  │  │      miniplayer.vue
    │  │  │      
    │  │  └─TextArea			// 文本框组件
    │  │          myTextArea.vue
    │  │          
    │  ├─common				//	公共组件
    │  │  │  index.js
    │  │  │  message.vue				//	消息框组件
    │  │  │  
    │  │  ├─Loading				//	加载条组件
    │  │  │      index.js
    │  │  │      loading.vue
    │  │  │      
    │  │  └─Toast				//	Toast组件
    │  │          index.js
    │  │          Toast.vue
    │  │          
    │  └─Home
    │      │  MainContext.vue				//	主页
    │      │  
    │      ├─begin
    │      │      begin.vue				//	开场页
    │      │      
    │      ├─moremusicers
    │      │      moremusicers.vue				//	更多音乐人组件
    │      │      
    │      ├─musicer							//	面板组件（手机端 / PC）
    │      │      music.vue
    │      │      musicWeb.vue
    │      │      overview.vue
    │      │      overviewWeb.vue
    │      │      radio.vue
    │      │      radioWeb.vue
    │      │      videos.vue
    │      │      videosWeb.vue
    │      │      
    │      ├─play				//	播放器组件
    │      │      play.vue		//	手机端
    │      │      playPc.vue    //	电脑端
    │      │      
    │      ├─public_use         //	其他组件
    │      │      forgotPwd.vue
    │      │      gotoBack.vue
    │      │      lotsbutton.vue
    │      │      mainchanges.vue
    │      │      register.vue
    │      │      
    │      └─search				//	搜索组件
    │              search.vue
    │              
    ├─extends_js				//	七牛云配置信息
    │      qiniu.js
    │      
    └─views
        │  404.vue                      //	404页面
        │  Backstage.vue				//	后台入口页
        │  Home.vue				        //	主页入口页
        │  
        └─Backstage
            │  Album.vue
            │  EditMusic.vue
            │  EditRadio.vue
            │  HomePage.vue
            │  Music.vue
            │  MusicianInfo.vue
            │  NewAlbum.vue
            │  NewRadio.vue
            │  Radio.vue
            │  UploadMusic.vue
            │  UploadRadioShow.vue
            │  
            └─About
                │  Communicate.vue
                │  
                └─More
                        Connection.vue
</code></pre>
<h2><a id="Instructions_for_use_285"></a>Instructions for use</h2>
<pre><code class="prism language-bash"><span class="token operator">&lt;</span>myTextArea /<span class="token operator">&gt;</span>
props:
textAreaData: String	// init Data初始参数
id: String				// 独立唯一
name: String			// 文本框名称
textAreaWidth: String   // 文本框宽度<span class="token punctuation">(</span>接收任何单位<span class="token punctuation">)</span>
textAreaHeight: String  // 文本框高度<span class="token punctuation">(</span>接收任何单位<span class="token punctuation">)</span>
realWidth: String       // 内联宽度
realHeight: String      // 内联高度
Events:
v-on:getTextArea		// @click绑定返回值

<span class="token operator">&lt;</span>miniplayer /<span class="token operator">&gt;</span>
props:
src: String             // 歌曲路径
id: String			    // 独立唯一
width: String           // 按钮大小

<span class="token operator">&lt;</span>myInput /<span class="token operator">&gt;</span>
props:
inputData: String       // init Data初始参数
type: String            // input类型
id: String				// 独立唯一
name: String			// 输入框名称
inputWidth: String   // 输入框宽度<span class="token punctuation">(</span>接收任何单位<span class="token punctuation">)</span>
realWidth: String       // 内联宽度
Events:
v-on:getInput			// @click绑定返回值

<span class="token operator">&lt;</span>myButton /<span class="token operator">&gt;</span>
props:
typex: String
// 按钮类型 接收参数: <span class="token string">'Upload'</span><span class="token punctuation">(</span>上传图片<span class="token punctuation">)</span> / <span class="token string">'confirm'</span><span class="token punctuation">(</span>直接提交<span class="token punctuation">)</span>  / <span class="token string">'Delete'</span><span class="token punctuation">(</span>删除<span class="token punctuation">)</span> / <span class="token string">'Edit'</span><span class="token punctuation">(</span>编辑<span class="token punctuation">)</span>
id: String				// 独立唯一
name: String			// 按钮名称
width: String           // 按钮宽度
height: String          // 按钮高度
fileTypex: String       // 文件inputId
inputSelectx: String    // 文件默认提示
clickData： 
forward: String         // 跳转页面名称

</code></pre>
<p>Thanks for the help from the above tutorial.</p>
<blockquote>
<p>axios封装使用： https://www.imooc.com/learn/1152</p>
</blockquote>
<blockquote>
<p>嵌套组件使用： https://www.cnblogs.com/beevesnoodles/p/9966352.html</p>
</blockquote>
<blockquote>
<p>实现登录验证： https://www.cnblogs.com/beevesnoodles/p/9966352.html</p>
</blockquote>
<blockquote>
<p>组件挂载： https://www.cnblogs.com/conglvse/p/9667132.html</p>
</blockquote>
<p><strong>I am a rookie. There are still many bugs in the project that are not resolved. The future will be gradually updated and improved. Welcome everyone to mention issue and pr  Thanks You ! 😄😄😄</strong></p>
</div>
</body>

<script>
let b = document.getElementById('Chinese');
b.onclick = function () {
    console.log('hhah')
}

</script>

</html>
