import { Node, Edge, Position } from '@xyflow/react';
import { RoadmapData } from '../types/roadmap';

export function generateFlowData(data: RoadmapData): { nodes: Node[], edges: Edge[] } {
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  
  const groups = new Set(data.nodes.map(node => node.group).filter(Boolean));
  let yOffset = 0;
  
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
  
  const connectionMap: Record<string, {hasIncoming: boolean, hasOutgoing: boolean}> = {};
  
  data.nodes.forEach(node => {
    connectionMap[node.id] = {
      hasIncoming: false,
      hasOutgoing: false
    };
  });
  
  initialEdges.forEach(edge => {
    if (connectionMap[edge.source]) {
      connectionMap[edge.source].hasOutgoing = true;
    }
    
    if (connectionMap[edge.target]) {
      connectionMap[edge.target].hasIncoming = true;
    }
  });
  
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
        
        const connections = connectionMap[node.id] || { hasIncoming: false, hasOutgoing: false };
        
        initialNodes.push({
          id: node.id,
          type: 'custom',
          position: { x: xOffset, y: yOffset + rowOffset + 70 },
          data: {
            name: node.name,
            description: node.description,
            type: node.type,
            group: node.group,
            hasIncoming: connections.hasIncoming === true,
            hasOutgoing: connections.hasOutgoing === true
          },
          ...(connections.hasOutgoing === true ? { sourcePosition: Position.Right } : {}),
          ...(connections.hasIncoming === true ? { targetPosition: Position.Left } : {}),
        });
      });
      
      yOffset += (Math.ceil(groupNodes.length / 3) * 200) + 100;
    }
  });

  return { nodes: initialNodes, edges: initialEdges };
} 