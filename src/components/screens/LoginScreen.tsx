/**
 * Login Screen - User Authentication
 */

import React from 'react';
import { Screen, Card, Button, Text, Column, Spacer } from '../StyledComponents';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <Column gap={20}>
          <Column gap={8} style={{ alignItems: 'center' }}>
            <Text size={24} weight={600}>
              WhatsApp Calling
            </Text>
            <Text size={14} color="#7C98B6">
              Connect with your contacts via WhatsApp
            </Text>
          </Column>

          <Spacer size={20} />

          <Column gap={12}>
            <Text size={14} weight={500}>
              Features:
            </Text>
            <Text size={13} color="#33475B">
              ✓ Make calls through WhatsApp Business
            </Text>
            <Text size={13} color="#33475B">
              ✓ Receive incoming call notifications
            </Text>
            <Text size={13} color="#33475B">
              ✓ Auto-save call logs to HubSpot
            </Text>
            <Text size={13} color="#33475B">
              ✓ Permission-based calling system
            </Text>
          </Column>

          <Spacer size={20} />

          <Button variant="primary" fullWidth onClick={onLogin}>
            Get Started
          </Button>
        </Column>
      </Card>
    </Screen>
  );
};
