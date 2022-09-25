import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

Page({
  // 获取用户信息
  async handleGetUserInfo() {
    try {
    // 1 获取用户信息
    let  rawData, signature;
    let userInfo;
    //用户信息存入缓存
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success:async (res) => {
          userInfo=res.userInfo;
          rawData=res.rawData;
          signature=res.signature;
        // 2 获取小程序登录成功后的code
          const { code } = await login();
          console.log(code);
          const loginParams={ rawData, signature ,code,userInfo};
           //  3 发送请求 获取用户的token
          const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"get"});
           // 4 把token存入缓存中 同时跳转回上一个页面
          wx.setStorageSync("token", token);
          wx.navigateBack({
          delta: 1
         });
      }
    })
    
    
    } catch (error) {
      console.log(error);
    }
  }
})