import * as ArcoIcon from '@arco-design/web-react/icon';

const DynamicIcon = (props: { icon: string }) => {
  const IconComponent = ArcoIcon[props.icon];

  if (!IconComponent) {
    return <div className='w-3 inline-block text-xl align-text-bottom'></div>;
  }

  return <IconComponent className='text-xl align-text-bottom' />;
};

export default DynamicIcon;
