import React from 'react';
import { MantineProvider} from '@mantine/core';
import DisplayTable from './components/DisplayTable';
import '@mantine/core/styles.css';
const App = () => {
  return (
    <MantineProvider>
      <DisplayTable/>
    </MantineProvider>
  )
}

export default App;