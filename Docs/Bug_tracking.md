# Bug Tracking & Known Issues

## Purpose
This document tracks bugs, errors, and their solutions during development. Always check here before fixing an issue to avoid duplicate work.

---

## Active Issues

### Issue Template
```
### [ISSUE-XXX] Issue Title
**Status:** Open | In Progress | Resolved
**Priority:** High | Medium | Low
**Component:** Component/Page name
**Reported:** YYYY-MM-DD

**Description:**
Brief description of the issue.

**Steps to Reproduce:**
1. Step one
2. Step two
3. Expected vs actual behavior

**Root Cause:**
Technical explanation of why this happens.

**Solution:**
How it was fixed (if resolved).

**Related Files:**
- `src/path/to/file.jsx`
```

---

## Resolved Issues

_No issues yet. This section will be populated as bugs are discovered and fixed._

---

## Common Pitfalls & Solutions

### D3.js Integration with React

**Problem:** D3 manipulates DOM directly, conflicts with React's virtual DOM.

**Solution:** Use `useRef` for D3 container, let D3 manage SVG elements inside ref.

```jsx
const svgRef = useRef();

useEffect(() => {
  const svg = d3.select(svgRef.current);
  // D3 code here
}, [data]);

return <svg ref={svgRef}></svg>;
```

---

### Force Simulation Performance

**Problem:** Map becomes laggy with 50+ nodes.

**Solution:**
1. Limit visible nodes to 50
2. Use `alphaDecay(0.02)` to speed up simulation settling
3. Stop simulation after 300 ticks: `simulation.stop()`

---

### Tech Stack Color Consistency

**Problem:** Colors look different across components.

**Solution:** Centralize color mapping in `src/utils/colors.js`, import everywhere.

```javascript
// utils/colors.js
export const getTechColor = (tech) => techStackColors[tech] || '#6B7280';
```

---

### localStorage Data Persistence

**Problem:** Data lost on page refresh during development.

**Solution:** Wrap localStorage calls in try-catch, provide fallback to mock data.

```javascript
const loadStudents = () => {
  try {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : mockStudents;
  } catch (error) {
    console.error('Failed to load students:', error);
    return mockStudents;
  }
};
```

---

### Mobile Map Interactions

**Problem:** Touch events don't work well with D3 zoom/pan.

**Solution:** Use `d3.zoom()` with touch event handlers:

```javascript
const zoom = d3.zoom()
  .scaleExtent([0.5, 3])
  .on('zoom', (event) => {
    svg.attr('transform', event.transform);
  });

svg.call(zoom);
```

---

### Filter State Synchronization

**Problem:** Filters don't update map immediately.

**Solution:** Use `useEffect` to watch filter state, trigger map re-render:

```javascript
useEffect(() => {
  const filtered = students.filter(s => 
    filters.techStack.length === 0 || 
    s.techStack.some(t => filters.techStack.includes(t))
  );
  setVisibleStudents(filtered);
}, [filters, students]);
```

---

## Testing Checklist

Before marking a feature complete, verify:

- [ ] Works on Chrome, Firefox, Safari
- [ ] Responsive on mobile (375px width)
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Data persists correctly
- [ ] Loading states display properly
- [ ] Error states handled gracefully

---

## Debugging Tips

### React DevTools
- Install React DevTools extension
- Inspect component props and state
- Use Profiler to find performance bottlenecks

### D3 Debugging
- Use `console.log(d3.select(element).data())` to inspect bound data
- Check SVG element positions: `element.attr('cx')`, `element.attr('cy')`
- Visualize force simulation: `simulation.on('tick', () => console.log(nodes))`

### Network Issues
- Check browser Network tab for failed requests
- Verify API endpoints (if using Supabase)
- Test with mock data first, then integrate real API

---

## Performance Monitoring

### Key Metrics
- **Map render time:** < 500ms for 50 nodes
- **Filter response time:** < 200ms
- **Detail panel open time:** < 300ms
- **Page load time:** < 2s

### Tools
- Chrome DevTools Performance tab
- Lighthouse audit
- React Profiler

---

## Future Improvements

### Potential Enhancements
1. **Virtual scrolling** for large student lists
2. **WebGL rendering** for 100+ nodes
3. **Service worker** for offline support
4. **Optimistic UI updates** for better perceived performance

---

**Keep this document updated as you encounter and solve issues. It's a living reference for the team.**
