/**
 * Loading Screen - SDK Initialization
 */

import React from 'react';
import { Screen, Spinner, Text, Column } from '../StyledComponents';

export const LoadingScreen: React.FC = () => {
  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Column gap={20} style={{ alignItems: 'center' }}>
        <Spinner />
        <Text size={16} weight={500}>
          Initializing Widget...
        </Text>
        <Text size={14} color="#7C98B6">
          Connecting to HubSpot
        </Text>
      </Column>
    </Screen>
  );
};
