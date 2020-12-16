import { post } from '../server/api.js';

export function checkUpdater(nowId) {
    const data = post('App.Tools.versionApi', {});
    data.then(res => {
        console.log(res);
        if (res) {
            const updateId = res.data.updateId
            const iosLink = res.data.iosLink
            const androidLink = res.data.androidLink
            if (!updateId) {
                console.log('当前没有发行版本')
            } else if (nowId != updateId) {
                console.log(nowId);
                console.log(updateId);
                console.log('确认强制更新，正在取得地址')
                //  如果需要背地（静默）热更新，获取下载地址
                let downloadLink = ''
                let ready = false
                // 判断系统类型
                if (plus.os.name.toLowerCase() === 'android') {
                    console.log('安卓系统')
                    if (androidLink && androidLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
                        console.log('发现下载地址')
                        // 安卓：创建下载任务
                        if (androidLink.match(RegExp(/.wgt/))) {
                            console.log('确认wgt热更新包')
                            downloadLink = androidLink
                            ready = true
                        } else {
                            console.log('安卓推荐.wgt强制更新，.apk的强制更新请您自行修改程序')
                        }
                    } else {
                        console.log('下载地址是空的，无法继续')
                    }
                } else {
                    console.log('苹果系统')
                    if (iosLink && iosLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
                        console.log('发现下载地址')
                        // 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
                        if (iosLink.match(RegExp(/.wgt/))) {
                            console.log('确认wgt热更新包')
                            downloadLink = iosLink
                            ready = true
                        } else {
                            console.log('苹果只支持.wgt强制更新')
                        }
                    } else {
                        console.log('下载地址是空的，无法继续')
                    }
                }
                if (ready) {
                    console.log('任务开始')
                    let downloadTask = uni.downloadFile({
                        url: downloadLink,
                        success: (res) => {
                            if (res.statusCode === 200) {
                                // 保存下载的安装包
                                console.log('保存安装包')
                                uni.saveFile({
                                    tempFilePath: res.tempFilePath,
                                    success: (res) => {
                                        const packgePath = res.savedFilePath
                                        // 任务完成，关闭下载任务
                                        console.log('任务完成，关闭下载任务，下一次启动应用时将安装更新')
                                        downloadTask.abort()
                                        downloadTask = null
                                        // const updated = uni.getStorageSync("updated"); // 尝试读取storage
                                        uni.removeStorageSync("updated");
                                        plus.runtime.install(packgePath, { force: true });
                                        uni.setStorage({
                                            key: "updated",
                                            data: {
                                                completed: true,
                                                packgePath: packgePath
                                            },
                                            success: res => {
                                                console.log("成功安装上次的更新，应用需要重启才能继续完成");
                                            }
                                        });
                                        uni.showModal({
                                            title: "提示",
                                            content: "应用将重启以完成更新",
                                            showCancel: false,
                                            complete: () => {
                                                plus.runtime.restart();
                                            }
                                        });

                                    }
                                })
                            }
                        }
                    })
                } else {
                    console.log('下载地址未准备，无法开启下载任务')
                }
            } else {
                console.log('现在是最新版本')
            }
        }
    }
    );


}