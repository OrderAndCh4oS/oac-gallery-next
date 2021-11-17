import {useContext} from 'react';
import {ToolsContext} from '../contexts/tools-context';

const useTools = () => useContext(ToolsContext);

export default useTools;
