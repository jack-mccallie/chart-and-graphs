import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
  x?: number; // Optional properties for D3 simulation
  y?: number;
  fx?: number | null; // Fixed x-position (null means the position is not fixed)
  fy?: number | null; // Fixed y-position (null means the position is not fixed)
}

interface Link {
  source: string;
  target: string;
}

interface NetworkGraphProps {
  nodes: Node[];
  links: Link[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear any existing elements before appending new ones
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', 1.5)
      .attr('stroke', '#999');

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 5)
      .attr('fill', 'blue')
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => {
          const source = d.source as Node;
          return source.x ?? 0;
        })
        .attr('y1', (d: any) => {
          const source = d.source as Node;
          return source.y ?? 0;
        })
        .attr('x2', (d: any) => {
          const target = d.target as Node;
          return target.x ?? 0;
        })
        .attr('y2', (d: any) => {
          const target = d.target as Node;
          return target.y ?? 0;
        });

      node
        .attr('cx', (d: any) => d.x ?? 0)
        .attr('cy', (d: any) => d.y ?? 0);
    });

  }, [nodes, links]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default NetworkGraph;
