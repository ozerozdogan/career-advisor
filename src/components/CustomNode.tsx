import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface CustomNodeProps {
  data: {
    name: string;
    description: string;
    type?: 'primary' | 'secondary' | 'tertiary';
    group?: string;
    hasIncoming?: boolean;
    hasOutgoing?: boolean;
  };
}

const CustomNode = memo(({ data }: CustomNodeProps) => {
  const getNodeColor = () => {
    switch (data.type) {
      case 'primary':
        return {
          background: 'rgb(219 234 254)',
          border: 'rgb(147 197 253)',
          text: 'rgb(29 78 216)',
          description: 'rgb(59 130 246)'
        };
      case 'secondary':
        return {
          background: 'rgb(254 240 138)',
          border: 'rgb(253 224 71)',
          text: 'rgb(161 98 7)',
          description: 'rgb(202 138 4)'
        };
      case 'tertiary':
        return {
          background: 'rgb(255 237 213)',
          border: 'rgb(254 215 170)',
          text: 'rgb(194 65 12)',
          description: 'rgb(234 88 12)'
        };
      default:
        return {
          background: 'rgb(243 244 246)',
          border: 'rgb(229 231 235)',
          text: 'rgb(55 65 81)',
          description: 'rgb(107 114 128)'
        };
    }
  };

  const colors = getNodeColor();

  const showLeftHandle = data.hasIncoming === true;
  const showRightHandle = data.hasOutgoing === true;

  return (
    <div className="group relative">
      {showLeftHandle && (
        <Handle 
          type="target" 
          position={Position.Left} 
        />
      )}
      
      <div 
        className="px-3 py-2 rounded-lg shadow-sm transition-all hover:shadow-md min-w-[180px] max-w-[220px]"
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: '1px',
          transform: 'scale(0.95)',
        }}
      >
        <h3 
          className="font-medium mb-1 text-sm"
          style={{ color: colors.text }}
        >
          {data.name}
        </h3>
        <p 
          className="text-[11px] leading-relaxed"
          style={{ color: colors.description }}
        >
          {data.description}
        </p>
      </div>

      {showRightHandle && (
        <Handle 
          type="source" 
          position={Position.Right}
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
export default CustomNode; 