import { Tag } from '@arco-design/web-react';
import useDictOptions from '@/hooks/useDictOptions';
import { useMemo } from 'react';

const FiberTag = (props: { code: string; value: string; bordered?: boolean }) => {
  const [options] = useDictOptions(props.code);
  const status = useMemo(() => options?.find((item) => props.value === item.value), [options, props.value]);
  return (
    <Tag key={status?.value} color={status?.color} bordered={props.bordered}>
      {status?.label}
    </Tag>
  );
};

export default FiberTag;
