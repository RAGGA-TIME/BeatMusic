//  接口管理
const MusicApi = {

  //  用户模块
  MusiciansLogin: {
    // method: 'post',
    method: 'get',
    url: '/User/MusiciansLogin.json'
  },
  FindSelect: {
    method: 'get',
    url: '/User/FindSelect.json'
  },

  //  album 模块
  GetMyAlbum: {
    method: 'get',
    url: '/Album/GetMyAlbum.json'
  },

  //    Extra   Album
  GetFirstAlbum: {
    method: 'get',
    url: '/Album/GetFirstAlbum.json'
  },
  GetSecondAlbum: {
    method: 'get',
    url: '/Album/GetSecondAlbum.json'
  },
  GetThirdAlbum: {
    method: 'get',
    url: '/Album/GetThirdAlbum.json'
  },
  GetFourthAlbum: {
    method: 'get',
    url: '/Album/GetFourthAlbum.json'
  },
  GetFifthAlbum: {
    method: 'get',
    url: '/Album/GetFifthAlbum.json'
  },
  SearchAlbum: {
    method: 'get',
    url: '/Album/SearchAlbum.json'
  },

  //  music 模块
  GetMyMusic: {
    method: 'get',
    url: '/Music/GetMyMusic.json'
  },

  //    Extra   Music
  GetFirstMusic: {
    method: 'get',
    url: '/Music/GetFirstMusic.json'
  },
  GetSecondMusic: {
    method: 'get',
    url: '/Music/GetSecondMusic.json'
  },
  GetThirdMusic: {
    method: 'get',
    url: '/Music/GetThirdMusic.json'
  },
  GetFourthMusic: {
    method: 'get',
    url: '/Music/GetFourthMusic.json'
  },
  GetFifthMusic: {
    method: 'get',
    url: '/Music/GetFifthMusic.json'
  },
  SearchMusic: {
    method: 'get',
    url: '/Music/SearchMusic.json'
  },

  //  radio模块
  GetMyRadio: {
    method: 'get',
    url: '/Radio/GetMyRadio.json'
  },
  GetMyRadioAndAudio: {
    method: 'get',
    url: '/Radio/GetMyRadioAndAudio.json'
  },
  SearchRadioAndAudio: {
    method: 'get',
    url: '/Radio/SearchRadioAndAudio.json'
  },

  //    Extra   Radio
  GetFirstRadioAndAudio: {
    method: 'get',
    url: '/Radio/GetFirstRadioAndAudio.json'
  },
  GetSecondRadioAndAudio: {
    method: 'get',
    url: '/Radio/GetSecondRadioAndAudio.json'
  },
  GetThirdRadioAndAudio: {
    method: 'get',
    url: '/Radio/GetThirdRadioAndAudio.json'
  },
  GetFourthRadioAndAudio: {
    method: 'get',
    url: '/Radio/GetFourthRadioAndAudio.json'
  },
  GetFifthRadioAndAudio: {
    method: 'get',
    url: '/Radio/GetFifthRadioAndAudio.json'
  },

  //  radio子模块 - audio
  GetRadioShow: {
    method: 'get',
    url: '/Audio/GetRadioShow.json'
  }
}

// const MusicApi = {
//   //  短信接口
//   SendMessage: {                                    待定
//     method: 'post',
//     url: '/User/SendMessage.json'
//   },
//   //  qiniu 接口
//   GetToken: {                                    待定
//     method: 'get',
//     url: '/Music/GetToken.json'
//   },
//   //  用户模块
//   MusiciansLogin: {                                    OK
//     method: 'post',
//     url: '/User/MusiciansLogin.json'
//   },
//   MusiciansRegister: {                                    待定
//     method: 'post',
//     url: '/User/MusiciansRegister.json'
//   },
//   EditMusicianInfo: {                                    待定
//     method: 'post',
//     url: '/User/EditMusicianInfo.json'
//   },
//   FindOneMusicianInfo: {                                    待定
//     method: 'get',
//     url: '/User/FindOneMusicianInfo.json'
//   },
//   FindUserByPhone: {                                    待定
//     method: 'post',
//     url: '/User/FindUserByPhone.json'
//   },
//   ForGotPassword: {                                    待定
//     method: 'post',
//     url: '/User/ForGotPassword.json'
//   },
//   FindSelect: {                                    OK
//     method: 'get',
//     url: '/User/FindSelect.json'
//   },
//   CheckUserName: {                                    待定
//     method: 'get',
//     url: '/User/CheckUserName.json'
//   },
//   //  album 模块
//   GetMyAlbum: {                                    OK
//     method: 'get',
//     url: '/Album/GetMyAlbum.json'
//   },
//   NewAlbum: {                                    待定
//     method: 'post',
//     url: '/Album/NewAlbum.json'
//   },
//   AddSongs: {                                    待定
//     method: 'post',
//     url: '/Album/AddSongs.json'
//   },
//   RemoveSong: {                                    待定
//     method: 'post',
//     url: '/Album/RemoveSong.json'
//   },
//   SearchAlbum: {                                    OK
//     method: 'get',
//     url: '/Album/SearchAlbum.json'
//   },

//   //  music 模块
//   GetMyMusic: {                                    OK
//     method: 'get',
//     url: '/Music/GetMyMusic.json'
//   },
//   UploadMusic: {                                    待定
//     method: 'post',
//     url: '/Music/UploadMusic.json'
//   },
//   DeleteMusic: {                                    待定
//     method: 'delete',
//     url: '/Music/DeleteMusic.json'
//   },
//   EditMusic: {                                    待定
//     method: 'post',
//     url: '/Music/EditMusic.json'
//   },
//   SearchMusic: {                                    OK
//     method: 'get',
//     url: '/Music/SearchMusic.json'
//   },

//   //  radio模块
//   GetMyRadio: {                                    OK
//     method: 'get',
//     url: '/Radio/GetMyRadio.json'
//   },
//   GetMyRadioAndAudio: {                                    OK
//     method: 'get',
//     url: '/Radio/GetMyRadioAndAudio.json'
//   },
//   SearchRadioAndAudio: {                                    OK
//     method: 'get',
//     url: '/Radio/SearchRadioAndAudio.json'
//   },
//   UploadRadio: {                                    待定
//     method: 'post',
//     url: '/Radio/UploadRadio.json'
//   },
//   EditRadio: {                                    待定
//     method: 'post',
//     url: '/Radio/EditRadio.json'
//   },
//   RemoveRadio: {                                    待定
//     method: 'post',
//     url: '/Radio/RemoveRadio.json'
//   },
//   //  radio子模块 - audio
//   GetRadioShow: {                                    OK
//     method: 'get',
//     url: '/Audio/GetRadioShow.json'
//   },
//   UploadRadioShow: {                                    待定
//     method: 'post',
//     url: '/Audio/UploadRadioShow.json'
//   },
//   EditRadioShow: {                                    待定
//     method: 'post',
//     url: '/Audio/EditRadioShow.json'
//   }
// }

export default MusicApi
