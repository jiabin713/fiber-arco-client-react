export const calCurrent = (current: number = 1, pageSize: number = 10, total: number = 10) => {
  const totalPage = Math.ceil((total - 1) / pageSize); // 总页数
  current = current > totalPage ? totalPage : current;
  current = current < 1 ? 1 : current;

  return current;
};
