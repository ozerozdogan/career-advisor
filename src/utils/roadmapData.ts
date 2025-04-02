import { Node, Edge, Position } from '@xyflow/react';
import { RoadmapData } from '../types/roadmap';

export function generateFlowData(data: RoadmapData): { nodes: Node[], edges: Edge[] } {
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  
  const groups = new Set(data.nodes.map(node => node.group).filter(Boolean));
  let yOffset = 0;
  
  groups.forEach((group) => {
    if (group) {
      initialNodes.push({
        id: `group-${group}`,
        data: { 
          label: group,
        },
        position: { x: 0, y: yOffset },
        style: {
          background: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          width: 'auto',
          border: '1px solid #333',
        },
      });
      
      const groupNodes = data.nodes.filter(n => n.group === group);
      groupNodes.forEach((node, index) => {
        const xOffset = (index % 3) * 350;
        const rowOffset = Math.floor(index / 3) * 200;
        
        initialNodes.push({
          id: node.id,
          type: 'custom',
          position: { x: xOffset, y: yOffset + rowOffset + 70 },
          data: {
            name: node.name,
            description: node.description,
            type: node.type,
            group: node.group
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });
      });
      
      yOffset += (Math.ceil(groupNodes.length / 3) * 200) + 100;
    }
  });

  data.links.forEach((link) => {
    initialEdges.push({
      id: `${link.source}-${link.target}`,
      source: link.source,
      target: link.target,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#333' },
    });
  });

  return { nodes: initialNodes, edges: initialEdges };
} 