// 从item对象中获取所有img元素
export const getImgElements = (itemElements) => {
  const imgElements = [];
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'));
  });
  return imgElements;
};

// 生成所有图片链接
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src;
  });
};

// 监听图片数组加载完成
export const onComplateImgs = (imgs) => {
  const promiseAll = [];
  // 循环imgs，构建promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 处理img加载情况
      const imgObj = new Image();
      imgObj.src = img;
      // 浏览器事件 当图片数据真正下载完成，并且可以被渲染时
      imgObj.onload = () => {
        resolve({
          img,
          index
        });
      };
      imgObj.onerror = () => resolve({ img, index, error: true });
    });
  });
  // 等 p1、p2、p3 全部完成之后，Promise.all再一次性告诉你：全部好了
  return Promise.all(promiseAll);
};
