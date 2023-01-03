import React from 'react';
import {MachineVisualizer} from "../components/xstate-components/MachineVisualizer";
import {createMachine} from "xstate";
import {Box, Button} from '@chakra-ui/react';

const { Octokit } = require('@octokit/core');
const fetchMachine = createMachine({
    id: 'fetch',
    initial: '0',
    states: {
        0: {
            on: {
                FETCH: 'loading'
            }
        },
        loading: {
            on: {
                RESOLVE: 'success',
                REJECT: 'failure'
            }
        },
        success: {
            type: 'final'
        },
        failure: {
            on: {
                RETRY: '0'
            }
        }
    }
});

export const Index = () => {

  return (
          <div>
              <Button>Konverto</Button>
              <MachineVisualizer machine={fetchMachine}></MachineVisualizer>
          </div>
  );
};

export default Index;
