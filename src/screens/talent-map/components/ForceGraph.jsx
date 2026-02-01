import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { getTechColor, getPrimaryTechColor, hexToRgba } from '../../../utils/colors';

export default function ForceGraph({ students, onNodeClick, selectedStudentId, freezeLayout = false, savedIds = [] }) {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedCluster, setSelectedCluster] = useState(null);
  const simulationRef = useRef(null);
  const nodeGroupsRef = useRef(null);
  const clusterGroupRef = useRef(null);
  const tooltipRef = useRef(null);

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height || students.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create main group for zoom/pan
    const g = svg.append('g');

    // Prepare nodes data
    const clusterMeta = {
      'AI/ML': { color: '#8FBFB6' },
      'Startup/Builders': { color: '#F0A37A' },
      'Rust/Systems': { color: '#9DB8A0' },
      'Junior': { color: '#E7A39A' },
      'General': { color: '#B5C7C3' }
    };

    const getClusterLabel = (tech) => {
      if (!tech) return 'General';
      if (['ML', 'AI', 'TensorFlow', 'PyTorch'].includes(tech)) return 'AI/ML';
      if (['React', 'Node', 'TypeScript'].includes(tech)) return 'Startup/Builders';
      if (['Rust', 'Go', 'WebAssembly'].includes(tech)) return 'Rust/Systems';
      if (['Python', 'Vue', 'JavaScript'].includes(tech)) return 'Junior';
      return 'General';
    };

    const sanitizeId = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const savedSet = new Set(savedIds);

    const nodes = students.map(student => ({
      ...student,
      id: student.id,
      primaryTech: student.techStack[0] || 'General',
      clusterLabel: getClusterLabel(student.techStack[0]),
      color: getPrimaryTechColor(student.techStack),
      radius: 24 + Math.min((student.projects?.length || 0) * 3, 12),
      isSaved: savedSet.has(student.id)
    }));

    // Group nodes by primary tech for clustering
    const groups = d3.group(nodes, d => d.clusterLabel);

    // Create force simulation
    // Add clustering force
    const clusterCenters = new Map();
    const groupEntries = Array.from(groups.entries());
    const orbitRadius = Math.min(width, height) * 0.32;

    const clusterNodes = groupEntries.map(([clusterLabel, groupNodes], index) => {
      const angle = (index / Math.max(groupEntries.length, 1)) * 2 * Math.PI - Math.PI / 2;
      const baseRadius = 110 + Math.sqrt(groupNodes.length) * 18;
      const anchorX = width / 2 + orbitRadius * Math.cos(angle);
      const anchorY = height / 2 + orbitRadius * Math.sin(angle);
      return {
        id: clusterLabel,
        label: clusterLabel,
        count: groupNodes.length,
        radius: baseRadius,
        anchorX,
        anchorY,
        x: anchorX,
        y: anchorY
      };
    });

    clusterNodes.forEach((node) => {
      clusterCenters.set(node.id, node);
    });

    const clusterLinks = clusterNodes.length > 1
      ? clusterNodes.map((node, index) => ({
          source: node.id,
          target: clusterNodes[(index + 1) % clusterNodes.length].id
        }))
      : [];

    const clusterForceX = d3.forceX(d => clusterCenters.get(d.clusterLabel)?.x ?? width / 2).strength(0.32);
    const clusterForceY = d3.forceY(d => clusterCenters.get(d.clusterLabel)?.y ?? height / 2).strength(0.32);
    const radialForce = d3.forceRadial(orbitRadius, width / 2, height / 2).strength(0.18);

    // Initialize packed positions inside each cluster (circular packing style)
    groups.forEach((groupNodes, clusterLabel) => {
      const center = clusterCenters.get(clusterLabel);
      if (!center) return;
      const packed = groupNodes.map(node => ({ r: node.radius + 6, node }));
      d3.packSiblings(packed);
      const enclosure = d3.packEnclose(packed);
      if (enclosure) {
        const padding = 18;
        const enclosureRadius = enclosure.r + padding;
        center.radius = Math.max(center.radius, enclosureRadius);
      }
      packed.forEach(p => {
        p.node.x = center.x + p.x;
        p.node.y = center.y + p.y;
        p.node.vx = 0;
        p.node.vy = 0;
      });
    });

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-40))
      .force('collision', d3.forceCollide().radius(d => d.radius + 14).strength(1).iterations(2))
      .force('clusterX', clusterForceX)
      .force('clusterY', clusterForceY)
      .force('radial', radialForce)
      .alphaDecay(0.075)
      .velocityDecay(0.42);

    // Cluster link network
    const clusterLinkGroup = g.append('g')
      .attr('class', 'cluster-links')
      .style('pointer-events', 'none');

    const clusterLinksSelection = clusterLinkGroup.selectAll('line')
      .data(clusterLinks)
      .join('line')
      .attr('stroke', 'rgba(143,191,182,0.32)')
      .attr('stroke-width', 1.2)
      .attr('stroke-linecap', 'round')
      .attr('stroke-dasharray', '6 10');

    // Draw cluster backgrounds
    const clusterGroup = g.append('g').attr('class', 'clusters');
    clusterGroupRef.current = clusterGroup;

    const clusterHaloGroup = clusterGroup.append('g').attr('class', 'cluster-halos');
    const haloLayers = [
      { scale: 1.18, opacity: 0.18, offset: [-10, -8] },
      { scale: 1, opacity: 0.32, offset: [0, 0] },
      { scale: 0.9, opacity: 0.2, offset: [10, 12] }
    ];

    const clusterHalos = clusterHaloGroup.selectAll('g.cluster-halo')
      .data(clusterNodes, d => d.id)
      .join('g')
      .attr('class', 'cluster-halo')
      .attr('data-cluster', d => d.id)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedCluster(prev => (prev === d.id ? null : d.id));
      });

    clusterHalos.selectAll('circle')
      .data(d => haloLayers.map(layer => ({
        id: d.id,
        radius: d.radius,
        gradientId: sanitizeId(d.id),
        ...layer
      })))
      .join('circle')
      .attr('class', 'cluster-halo-layer')
      .attr('cx', d => d.offset[0])
      .attr('cy', d => d.offset[1])
      .attr('r', d => d.radius * d.scale)
      .attr('fill', d => `url(#cluster-gradient-${d.gradientId})`)
      .attr('opacity', d => d.opacity);

    const clusterLabels = clusterGroup.selectAll('g.cluster-label')
      .data(clusterNodes, d => d.id)
      .join((enter) => {
        const labelGroup = enter.append('g')
          .attr('class', 'cluster-label')
          .style('pointer-events', 'none');

        labelGroup.append('rect')
          .attr('rx', 12)
          .attr('fill', 'rgba(255,255,255,0.85)')
          .attr('stroke', 'rgba(0,0,0,0.06)');

        labelGroup.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .style('font-size', '15px')
          .style('font-weight', '600')
          .style('fill', '#6B6B6B');

        return labelGroup;
      });

    clusterLabels.select('text').text(d => `${d.label} • ${d.count}`);
    clusterLabels.each(function() {
      const text = d3.select(this).select('text').node();
      if (!text) return;
      const { width: textWidth, height: textHeight } = text.getBBox();
      d3.select(this).select('rect')
        .attr('x', -textWidth / 2 - 12)
        .attr('y', -textHeight / 2 - 6)
        .attr('width', textWidth + 24)
        .attr('height', textHeight + 12);
    });

    // Define gradients for clusters
    const defs = svg.append('defs');
    groups.forEach((groupNodes, clusterLabel) => {
      const color = clusterMeta[clusterLabel]?.color || getTechColor(clusterLabel);
      const gradient = defs.append('radialGradient')
        .attr('id', `cluster-gradient-${sanitizeId(clusterLabel)}`);
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgba(255,255,255,0.65)');
      
      gradient.append('stop')
        .attr('offset', '55%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.3);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgba(0,0,0,0.03)');
    });

    // Create node groups
    const nodeGroups = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick(d);
      });
    nodeGroupsRef.current = nodeGroups;

    // Add node circles (avatars)
    // Saved candidate glow ring
    nodeGroups.append('circle')
      .attr('r', d => d.radius + 6)
      .attr('fill', 'none')
      .attr('stroke', d => (d.isSaved ? 'rgba(240,163,122,0.45)' : 'transparent'))
      .attr('stroke-width', 2)
      .attr('class', 'node-glow')
      .style('filter', d => (d.isSaved ? 'drop-shadow(0 6px 16px rgba(240,163,122,0.35))' : 'none'))
      .style('pointer-events', 'none');

    nodeGroups.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => hexToRgba(d.color, 0.78))
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 3)
      .attr('class', 'node-core')
      .style('filter', 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))')
      .style('transition', 'all 0.2s ease');

    // Add initials
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', '#FFFFFF')
      .style('pointer-events', 'none')
      .text(d => d.name.split(' ').map(n => n[0]).join(''));

    // Add mini tech pills (shown on zoom in)
    const pillGroups = nodeGroups.append('g')
      .attr('class', 'tech-pill')
      .style('opacity', 0);

    pillGroups.append('rect')
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('height', 18)
      .attr('fill', '#EEF2F1')
      .attr('stroke', 'rgba(0,0,0,0.05)');

    pillGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .style('font-size', '10px')
      .style('font-weight', '600')
      .style('fill', '#5F6F6B')
      .style('pointer-events', 'none')
      .text(d => d.techStack[0] || '');

    // Node connection overlays (hover-only)
    const nodeLinkGroup = g.append('g')
      .attr('class', 'node-links')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    const computeSimilarity = (a, b) => {
      const stackA = new Set(a.techStack || []);
      const stackB = new Set(b.techStack || []);
      let overlap = 0;
      stackA.forEach((tech) => {
        if (stackB.has(tech)) overlap += 1;
      });
      const projectsA = a.projects?.length || 0;
      const projectsB = b.projects?.length || 0;
      return overlap * 2 + Math.min(projectsA, projectsB) * 0.5;
    };

    const showNodeLinks = (node) => {
      const connections = nodes
        .filter(candidate => candidate.id !== node.id)
        .map(candidate => ({
          source: node,
          target: candidate,
          strength: computeSimilarity(node, candidate)
        }))
        .filter(link => link.strength > 0)
        .sort((a, b) => b.strength - a.strength)
        .slice(0, 5);

      const selection = nodeLinkGroup.selectAll('line')
        .data(connections, d => `${d.source.id}-${d.target.id}`);

      selection.enter()
        .append('line')
        .attr('stroke', 'rgba(143,191,182,0.45)')
        .attr('stroke-width', d => 0.8 + d.strength * 0.35)
        .attr('stroke-linecap', 'round')
        .merge(selection);

      selection.exit().remove();
      nodeLinkGroup.style('opacity', 1);
    };

    const hideNodeLinks = () => {
      nodeLinkGroup.style('opacity', 0);
      nodeLinkGroup.selectAll('line').remove();
    };

    // Add hover effects
    nodeGroups
      .on('mouseenter', function(event, d) {
        d3.select(this).select('.node-core')
          .transition()
          .duration(200)
          .attr('r', d.radius + 4)
          .attr('stroke-width', 4)
          .style('filter', 'drop-shadow(0 14px 36px rgba(0,0,0,0.14))');

        showTooltip(event, d);
        showNodeLinks(d);
      })
      .on('mousemove', function(event, d) {
        updateTooltipPosition(event);
      })
      .on('mouseleave', function() {
        d3.select(this).select('.node-core')
          .transition()
          .duration(200)
          .attr('r', d.radius)
          .attr('stroke-width', 3)
          .style('filter', 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))');

        hideTooltip();
        hideNodeLinks();
      });

    // Drag behavior
    nodeGroups.call(
      d3.drag()
        .on('start', (event, d) => {
          if (!event.active && simulationRef.current && !freezeLayout) {
            simulationRef.current.alphaTarget(0.18).restart();
          }
          d.isDragging = true;
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active && simulationRef.current && !freezeLayout) {
            simulationRef.current.alphaTarget(0.06);
          }
          d.fx = null;
          d.fy = null;
          d.isDragging = false;
        })
    );

    // Highlight selected node
    if (selectedStudentId) {
      nodeGroups.each(function(d) {
        if (d.id === selectedStudentId) {
          d3.select(this).select('.node-core')
            .attr('stroke', '#8FBFB6')
            .attr('stroke-width', 4);
        }
      });
    }

    // Update positions on simulation tick
    const clampToBounds = (node) => {
      const margin = node.radius + 24;
      node.x = Math.max(margin, Math.min(width - margin, node.x));
      node.y = Math.max(margin, Math.min(height - margin, node.y));
    };

    const applyClusterSpring = (node) => {
      const center = clusterCenters.get(node.clusterLabel);
      if (!center) return;
      const dx = node.x - center.x;
      const dy = node.y - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const spring = 0.008;
      node.vx -= dx * spring;
      node.vy -= dy * spring;

      const maxDistance = (center.radius || 140) * 0.75;
      if (distance > maxDistance) {
        const pull = (distance - maxDistance) * 0.02;
        node.vx -= (dx / distance) * pull;
        node.vy -= (dy / distance) * pull;
      }
    };

    simulation.on('tick', () => {
      nodes.forEach((node) => {
        if (!node.isDragging) {
          applyClusterSpring(node);
          clampToBounds(node);
        }
      });
      nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
      pillGroups.each(function(d) {
        const text = d3.select(this).select('text');
        const label = text.text();
        if (!label) return;
        const width = Math.max(label.length * 6 + 12, 36);
        d3.select(this).select('rect')
          .attr('width', width)
          .attr('x', -width / 2)
          .attr('y', 22);
        text.attr('y', 31);
      });

      nodeLinkGroup.selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      clusterLabels.attr('transform', d => `translate(${d.x}, ${d.y - d.radius - 22})`);
    });

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2.4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        const zoomLevel = event.transform.k;
        const nodeOpacity = Math.max(0.2, Math.min(1, (zoomLevel - 0.55) / 0.4));
        const pillOpacity = Math.max(0, Math.min(1, (zoomLevel - 0.95) / 0.35));
        nodeGroups.transition().duration(120).style('opacity', nodeOpacity);
        pillGroups.transition().duration(120).style('opacity', pillOpacity);
        nodeLinkGroup.transition().duration(120).style('opacity', nodeOpacity > 0.6 ? 1 : 0);
      });

    svg.call(zoom);

    const smoothZoomTo = (targetScale, duration = 350) => {
      const current = d3.zoomTransform(svg.node());
      const center = [width / 2, height / 2];
      const interpolate = d3.interpolateZoom(
        [center[0], center[1], width / current.k],
        [center[0], center[1], width / targetScale]
      );

      svg.transition()
        .duration(duration)
        .attrTween('transform', () => (t) => {
          const [x, y, r] = interpolate(t);
          const k = width / r;
          const transform = d3.zoomIdentity.translate(center[0] - x * k, center[1] - y * k).scale(k);
          zoom.transform(svg, transform);
        });
    };

    const autoFitToClusters = () => {
      const clusterBounds = clusterNodes.reduce(
        (bounds, center) => ({
          minX: Math.min(bounds.minX, center.x - center.radius),
          maxX: Math.max(bounds.maxX, center.x + center.radius),
          minY: Math.min(bounds.minY, center.y - center.radius),
          maxY: Math.max(bounds.maxY, center.y + center.radius)
        }),
        { minX: width, maxX: 0, minY: height, maxY: 0 }
      );

      const boundsWidth = Math.max(clusterBounds.maxX - clusterBounds.minX, 1);
      const boundsHeight = Math.max(clusterBounds.maxY - clusterBounds.minY, 1);
      const padding = 60;
      const scale = Math.min(
        1.6,
        Math.max(
          0.6,
          Math.min((width - padding) / boundsWidth, (height - padding) / boundsHeight)
        )
      );
      const translateX = width / 2 - scale * (clusterBounds.minX + boundsWidth / 2);
      const translateY = height / 2 - scale * (clusterBounds.minY + boundsHeight / 2);

      svg.transition()
        .duration(450)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translateX, translateY).scale(scale)
        );
    };

    const autoFitTimeout = setTimeout(() => {
      autoFitToClusters();
      smoothZoomTo(0.9, 450);
    }, 500);

    const clusterSimulation = d3.forceSimulation(clusterNodes)
      .force('link', d3.forceLink(clusterLinks).id(d => d.id).distance(220).strength(0.25))
      .force('charge', d3.forceManyBody().strength(-320))
      .force('x', d3.forceX(d => d.anchorX).strength(0.12))
      .force('y', d3.forceY(d => d.anchorY).strength(0.12))
      .force('collision', d3.forceCollide().radius(d => d.radius + 90).strength(0.75))
      .alpha(0.9)
      .alphaDecay(0.08)
      .on('tick', () => {
        clusterLinksSelection
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        clusterHalos.attr('transform', d => `translate(${d.x}, ${d.y})`);

        clusterLabels.attr('transform', d => `translate(${d.x}, ${d.y - d.radius - 22})`);

        clusterNodes.forEach((node) => {
          const center = clusterCenters.get(node.id);
          if (center) {
            center.x = node.x;
            center.y = node.y;
          }
        });
      });

    svg.on('click', () => {
      setSelectedCluster(null);
    });
    svg.on('mouseleave', () => {
      hideTooltip();
    });

    simulationRef.current = simulation;

    // Cleanup
    return () => {
      hideTooltip();
      clearTimeout(autoFitTimeout);
      simulation.stop();
      clusterSimulation.stop();
    };
  }, [students, dimensions, onNodeClick, selectedStudentId, savedIds]);

  useEffect(() => {
    const nodeGroups = nodeGroupsRef.current;
    const clusterGroup = clusterGroupRef.current;
    if (!nodeGroups || !clusterGroup) return;

    if (!selectedCluster) {
      nodeGroups.style('opacity', 1);
      clusterGroup.selectAll('.cluster-halo')
        .attr('opacity', 0.4);
      return;
    }

    nodeGroups.style('opacity', d => (d.clusterLabel === selectedCluster ? 1 : 0.15));
    clusterGroup.selectAll('.cluster-halo')
      .attr('opacity', function() {
        const cluster = d3.select(this).attr('data-cluster');
        return cluster === selectedCluster ? 0.5 : 0.12;
      });
  }, [selectedCluster]);

  useEffect(() => {
    if (!simulationRef.current) return;
    if (freezeLayout) {
      simulationRef.current.stop();
    } else {
      simulationRef.current.alpha(0.6).restart();
    }
  }, [freezeLayout]);

  // Tooltip functions
  const showTooltip = (event, student) => {
    hideTooltip();
    const tooltip = d3.select('body').append('div')
      .attr('class', 'map-tooltip')
      .style('position', 'absolute')
      .style('background', '#FFFFFF')
      .style('padding', '12px 16px')
      .style('border-radius', '12px')
      .style('box-shadow', '0 12px 24px rgba(0,0,0,0.18)')
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('font-size', '13px')
      .style('max-width', '250px');

    tooltip.html(`
      <div style="font-weight: 600; color: #3A3A3A; margin-bottom: 4px;">${student.name}</div>
      <div style="color: #7A7A7A; font-size: 12px; margin-bottom: 8px;">${student.location}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
        ${student.techStack.slice(0, 3).map(tech => 
          `<span style="background: #EEF2F1; color: #5F6F6B; padding: 2px 8px; border-radius: 999px; font-size: 11px;">${tech}</span>`
        ).join('')}
      </div>
    `);

    tooltip
      .style('left', (event.pageX + 15) + 'px')
      .style('top', (event.pageY - 15) + 'px')
      .style('opacity', 0)
      .transition()
      .duration(200)
      .style('opacity', 1);

    tooltipRef.current = tooltip;
  };

  const updateTooltipPosition = (event) => {
    if (!tooltipRef.current) return;
    tooltipRef.current
      .style('left', (event.pageX + 15) + 'px')
      .style('top', (event.pageY - 15) + 'px');
  };

  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current
        .transition()
        .duration(150)
        .style('opacity', 0)
        .remove();
      tooltipRef.current = null;
    }
  };

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
