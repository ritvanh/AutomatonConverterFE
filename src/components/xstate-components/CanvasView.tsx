import { Box } from '@chakra-ui/react';
import { useSelector } from '@xstate/react';
import React, { useMemo } from 'react';
import { CanvasContainer } from './CanvasContainer';
import { toDirectedGraph } from './directedGraph';
import { Graph } from './Graph';
import { useSimulation} from './SimulationContext';

export const CanvasView: React.FC = () => {

  const simService = useSimulation();

  const machine = useSelector(simService, (state) => {
    return state.context.currentSessionId
      ? state.context.serviceDataMap[state.context.currentSessionId!]?.machine
      : undefined;
  });

  const digraph = useMemo(
    () => (machine ? toDirectedGraph(machine) : undefined),
    [machine],
  );

  return (
    <Box display="grid" height="100%">
      <CanvasContainer panModeEnabled={false}>
        {digraph && <Graph digraph={digraph} />}
      </CanvasContainer>
    </Box>
  );
};
