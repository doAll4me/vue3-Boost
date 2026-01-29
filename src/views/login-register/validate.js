/**
 *用户名表单校验
 * @param {*} val input中输入的内容
 * @returns true 表示表单校验通过 ，string表示表单校验未通过，string为提示消息
 */
export const validateUsername = (val) => {
  // console.log(val);
  if (!val) {
    return '用户名为必填';
  }
  if (val.length < 3 || val.length > 12) {
    return '用户名应该在3-12位之间';
  }
  return true;
};

/**
 *密码表单校验
 * @param {*} val
 * @returns
 */
export const validatePassword = (val) => {
  if (!val) {
    return '密码为必填';
  }
  if (val.length < 6 || val.length > 12) {
    return '密码应该在6-12位之间';
  }
  return true;
};
