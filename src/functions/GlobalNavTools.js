import React from 'react';
import PropTypes from 'prop-types';
import { listStyle } from '../styles';

const GlobalNavTools = ({ tools, onToolClick }) => {

    const handleToolClick = (event, toolName) => {
        onToolClick(toolName);
    }
  
    if (!tools.length) {
      return null;
    }

    return (
        <ul className={listStyle}>
            { tools.map( (tool) => {
                return <li key={`global-nav-tool-${tool.name}`}>
                    <button type="button" title={tool.label} onClick={ (event) => handleToolClick(event, tool.name) }>
                        { tool.icon }
                    </button>
                </li>
            }) }
        </ul>
    )   
}
  
GlobalNavTools.propTypes = {
    /**
     * Tool icons to display. Accepted as a prop so that tools can be customized per
     * page context via the GlobalNav parent. Each tool should have a name (id),
     * label (for display), and icon component. Each icon will be rendered as a
     * button in a list.
     */
    tools: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.node
    })),
  
    /**
     * Callback function called when any tool is clicked. Gets passed the name of
     * that tool.
     */
    onToolClick: PropTypes.func
};

GlobalNavTools.defaultProps = {
    tools: [],
    onToolClick: function onToolClick(toolName) {}
};

export default GlobalNavTools;