import { memo } from 'react';

interface GroupHeaderNodeProps {
  data: {
    label: string;
  };
}

const GroupHeaderNode = memo(({ data }: GroupHeaderNodeProps) => {
  return (
    <div
      style={{
        background: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        width: 'auto',
        border: '1px solid #333',
      }}
    >
      {data.label}
    </div>
  );
});

GroupHeaderNode.displayName = 'GroupHeaderNode';
export default GroupHeaderNode; 