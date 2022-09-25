import { async } from "../../lib/runtime/runtime";

// pages/login/index.js
Page({
  handleGetUserInfo(){
    let userInfo;
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: async (res)=>{
        userInfo=res.userInfo;
        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
        delta: 1
        });
      }
    });  
  }
})