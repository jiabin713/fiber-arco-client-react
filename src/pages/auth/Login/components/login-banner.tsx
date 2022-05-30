import { Carousel } from '@arco-design/web-react';
import bannerPng1 from '@/assets/images/banner-1.png';
import bannerPng2 from '@/assets/images/banner-2.png';

const LoginBanner = () => {
  const data = [
    {
      slogan: '开箱即用的高质量模板',
      subSlogan: '丰富的的页面模板，覆盖大多数典型业务场景',
      image: bannerPng1,
    },
    {
      slogan: '内置了常见问题的解决方案',
      subSlogan: '国际化，路由配置，状态管理应有尽有',
      image: bannerPng2,
    },
    {
      slogan: '接入可视化增强工具AUX',
      subSlogan: '实现灵活的区块式开发',
      image: bannerPng1,
    },
  ];
  return (
    <Carousel className='h-full' animation='fade'>
      {data.map((item, index) => (
        <div key={`${index}`}>
          <div className='flex flex-col justify-center items-center h-full'>
            <div className='font-500 text-2xl text-arco-fill-1'>{item.slogan}</div>
            <div className='mt-4 text-base text-arco-text-3'>{item.subSlogan}</div>
            <img alt='banner-image' className='mt-12 w-sm' src={item.image} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default LoginBanner;
